import { Elysia } from "elysia"
import { swagger } from "@elysiajs/swagger"

import { ip } from "../src"
import { Server } from "bun"

let server: Server | null

const app = new Elysia()
  .use(swagger())
  .use(ip())
  .get("/", ({ ip }) => ({ hello: ip }))
  .listen(3000, () => {
    console.log("🦊 Swagger is active at: http://localhost:3000/swagger")
  })

server = app.server
