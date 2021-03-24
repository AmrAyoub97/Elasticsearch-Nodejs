# CrowdAnalyzer Backend Challenge

## The Problem

When capturing online conversations for our clients (ex: tweets, posts, comments ...etc), Crowd Analyzer processes and analyzes a large stream of data and saves it in Elasticsearch (search engine). We have recently been asked to view these data based on a selected feed.

### Tech Used

- [TypeScript](https://www.typescriptlang.org) - TypeScript extends JavaScript by adding types.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [MongoDB](https://www.mongodb.com/) - MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.
- [Elasticsearh](https://www.elastic.co/) - Elasticsearch is a search engine, provides a distributed, multitenant-capable full-text search engine.

### System Features

Create Feeds and Filter Conversations, through the endpoints.

### Requirments

- [Docker](https://www.docker.com/)
- API Test Tool, ex:([Postman](https://www.postman.com/))

### Installation

1. make sure that `docker` and `docker-compose` are installed on your machine.
2. Clone repository `git clone https://github.com/AmrAyoub97/crowdanalyzer-conversations-feed.git`
3. Open repo root folder ` cd crowdanalyzer-conversations-feed`
4. From CMD run `docker-compose build`, This will build an image for our app.
5. From CMD run `docker-compose up -d`, This will pull the required images and run them in docker containers.

### Docker Containers Used

- MongoDB
- Elasticsearch
- Kibana
- NodeJS (Express) App

### API Description
- Conversation
```
{
  id
  text
  user_gender
  lang
  dialect
  user: {
    id
    followers_count
  }
}
```
- Feed
```
{
  name
  filters: {
  gender
  language
  dialect
  followers_count_range?: {
    gte
    lte
  }
 }
}
```

| Action                       | Endpoint URL      | Verb | Request Body | Response |
| ---------------------------- | ----------------- | ---- | ------------ | -------- |
| Create New Feed              | /feeds            | POST |      `Feed`        | `{"feed_name":****}`       |
| List All Feeds              | /feeds            | GET |      -       |  `Array[Feed]`       |
| Filter Conversations By Feed | /feeds/:feed_name | GET  |-| `Array[Conversation]`       |
