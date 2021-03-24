import express from "express"
import { init_es_index } from "./clients/es-client"
require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
init_services()

async function init_services() {
  await init_es_index()
  app.use("/feeds", require("./routes/feeds"))
  // start the express server
  return app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`)
  })
}
