import { Elysia } from "elysia";
import { getIP } from "./getip";
import { defaultOptions } from "../constants";
import { debug } from "./debug";
import type { Options } from "../types";

export const plugin = function ipPlugin(userOptions?: Partial<Options>) {
  return function registerIpPlugin(app: Elysia) {
    const options: Options = {
      ...defaultOptions,
      ...userOptions,
    };
  
    return app.use(
      new Elysia({
        name: "elysia-ip",
      }).derive({ as: "global" }, function ip({ request }): { ip: string } {
        serverIP: {
          if (!options.headersOnly && globalThis.Bun) {
            const server = options.injectServer(app);
            if (!server) {
              debug(
                "plugin: Elysia server is not initialized. Make sure to call Elyisa.listen()",
              );
              debug("plugin: use injectServer to inject Server instance");
              break serverIP;
            }
  
            if (!server.requestIP) {
              debug("plugin: server.requestIP is null");
              debug("plugin: Please check server instace");
              break serverIP;
            }
  
            const socketAddress = server.requestIP(request);
            debug(`plugin: socketAddress ${JSON.stringify(socketAddress)}`);
            if (!socketAddress) {
              debug("plugin: ip from server.requestIP return `null`");
              break serverIP;
            }
            return { ip: socketAddress.address };
          }
        }
        return {
          ip: getIP(request.headers, options.checkHeaders) || "",
        };
      }),
    );
  };
};
