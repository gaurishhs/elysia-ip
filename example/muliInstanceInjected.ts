import { Elysia } from "elysia"
import { defaultOptions, ip } from "elysia-ip"
import bearer from "@elysiajs/bearer"

import type { Server } from "bun"

let server: Server | null

defaultOptions.injectServer = () => server // use defaultOptions as global setting
const setup = new Elysia({
  /**
   * declare name for every instance
   * readmore :
   * https://elysiajs.com/essential/plugin.html#plugin-deduplication
   * https://elysiajs.com/essential/context.html#affix
   */
  name: "setup", //
})
  .use(ip())
  .use(bearer())

const aInstance = new Elysia({
  name: "routeA",
})
  .use(setup)
  .get("/a", ({ bearer, ip }) => "a")

const bInstance = new Elysia({
  name: "routeB",
})
  .use(setup)
  .get("/b", ({ bearer, ip }) => "b")

const app = new Elysia({
  name: "mainApp",
})
  .use(aInstance)
  .use(bInstance)
  .get("/", () => "hello")
  .listen(3000, () => {
    console.log("🦊 Swagger is active at: http://localhost:3000/swagger")
  })

server = app.server
