import express from "express"
import { search } from "../clients/es-client"
const router = express.Router()

router.get(
  "/:query",
  async (request: express.Request, response: express.Response) => {
    try {
      const query = request.params.query
      const result = await search(query)
      return response.status(200).send(result)
    } catch (error) {
      return response.sendStatus(500)
    }
  }
)

module.exports = router
