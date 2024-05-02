import { Elysia } from "elysia"
import { getIP } from "./getip"
import { defaultOptions } from "../constants"
import type { Options } from "../types"

export const plugin = (userOptions?: Partial<Options>) => (app: Elysia) => {
  const options: Options = {
    ...defaultOptions,
    ...userOptions,
  }

  return new Elysia({
    name: "elysia-ip",
  }).derive({ as: "global" }, ({ request }): { ip: string } => {
    if (!options.headersOnly && globalThis.Bun) {
      const socketAddress = options.injectServer(app)?.requestIP(request)
      if (socketAddress) return { ip: socketAddress.address }
      else {
        console.log(
          `Elysia server is not initialized. Make sure to call Elyisa.listen()`,
        )
        console.log(`use injectServer to inject Server instance`)
      }
    }
    return {
      ip:
        getIP(request.headers, options.checkHeaders) ||
        (function () {
          console.log("Failed to get ip from header!")
          return ""
        })(),
    }
  })
}
