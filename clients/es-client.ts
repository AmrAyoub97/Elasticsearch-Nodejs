import elasticsearch from "elasticsearch"
import fs from "fs"
import { conversation, filters } from "../interfaces/feed"
require("dotenv").config()

const esClient = new elasticsearch.Client({
  host: `http://${process.env.ES_HOSTNAME}:${process.env.ES_PORT}`,
})

export async function init_es_index() {
  let bulkBody: any[] = []

  const conversations: conversation[] = JSON.parse(
    fs.readFileSync("converstions.json", "utf8")
  )

  conversations.forEach((item: conversation) => {
    bulkBody.push({
      index: {
        _index: process.env.ES_INDEX_NAME,
        _type: process.env.ES_TYPE_NAME,
        _id: item.id,
      },
    })
    bulkBody.push(item)
  })

  esClient
    .bulk({ refresh: true, body: bulkBody })
    .then(response => {
      let errorCount = 0
      response.items.forEach((item: any) => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error)
        }
      })
      console.log(
        `Successfully indexed ${conversations.length - errorCount}
           out of ${conversations.length} items`
      )
    })
    .catch(err => console.log("error", err))
}

export async function search(query: string) {
  const results = await esClient.search({
    index: "conversations",
    body: {
      query: {
        match: {
          query: query,
        },
      },
    },
  })
  const filteredConversations = results.hits.hits.map(
    (item: { _source: any }) => {
      return item._source
    }
  )

  return filteredConversations
}
