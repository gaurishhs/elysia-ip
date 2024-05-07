import { Elysia } from "elysia"
import { defaultOptions, ip } from "../src/index"

import type { Server } from "bun"

let server: Server | null

const getServer =
  (mess: string = "default") =>
  () => {
    console.log(`[${mess}] get Server!`)
    return server
  }

defaultOptions.injectServer = getServer()

const setup = new Elysia().use(ip())

const aInstance = new Elysia().use(setup).get("/a", () => {
  console.log("A")
  return "a"
})

const bInstance = new Elysia()
  .use(
    ip({
      injectServer: getServer("B"),
    }),
  )
  .get("/b", () => {
    console.log("B")
    return "b"
  })

const app = new Elysia()
  .use(aInstance)
  .use(bInstance)
  .get("/", () => {
    console.log("Hello")
    return "hello"
  })
  .listen({}, ({ development, hostname, port }) => {
    console.log(
      `🦊 Elysia is running at ${hostname}:${port} ${
        development ? "🚧 in development mode!🚧" : ""
      }`,
    )
  })

server = app.server
