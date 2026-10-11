# TEHTÄVÄ 5 (Node.js ja MariaDB)

Node.js and Express REST API for managing posts in a MariaDB database.

## Setup

1. Install Node.js and MariaDB.
2. Import `luonti.sql` into MariaDB to create the `blog-app` database and sample posts.
3. Create a database user with access to this database. Adapt the example in `kayttaja.sql` with your own credentials.
4. Copy `.env.example` to `.env` and enter your database credentials.
5. Run `npm ci` in this folder.
6. Run `npm start`, or `npm run dev` for development.

The default server address is `http://localhost:3000`.

## API

| Method | Path | Action |
| --- | --- | --- |
| GET | `/posts` | List posts |
| GET | `/posts/:id` | Get a post |
| POST | `/posts` | Create a post |
| PUT | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

POST and PUT accept JSON, for example:

```json
{"title": "Example post", "body": "Example content"}
```

Local credentials (`.env`) and installed dependencies (`node_modules`) are excluded from Git.
