import { Elysia } from "elysia"
import { getIP } from "./getip"
import { defaultOptions } from "../constants"
import { logger } from "./logger"

import type { Options } from "../types"

export const plugin = (userOptions?: Partial<Options>) => (app: Elysia) => {
  const options: Options = {
    ...defaultOptions,
    ...userOptions,
  }

  return app.use(
    new Elysia({
      name: "elysia-ip",
    }).derive({ as: "global" }, ({ request }): { ip: string } => {
      serverIP: {
        if (!options.headersOnly && globalThis.Bun) {
          const server = options.injectServer(app)
          if (!server) {
            logger(
              "plugin",
              "Elysia server is not initialized. Make sure to call Elyisa.listen()",
            )
            logger("plugin", "use injectServer to inject Server instance")
            break serverIP
          }

          if (!server.requestIP) {
            logger("plugin", "server.requestIP is null")
            logger("plugin", "Please check server instace")
            break serverIP
          }

          const socketAddress = server.requestIP(request)
          logger("plugin", "socketAddress", socketAddress)
          if (!socketAddress) {
            logger("plugin", "ip from server.requestIP return `null`")
            break serverIP
          }
          return { ip: socketAddress.address }
        }
      }
      return {
        ip: getIP(request.headers, options.checkHeaders) || "",
      }
    }),
  )
}
