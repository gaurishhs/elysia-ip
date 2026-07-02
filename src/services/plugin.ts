import { Elysia } from "elysia";
import { getIPFromContext, getIPFromHeaders } from "./getip";
import { defaultOptions } from "../constants";

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
      }).derive(function ip({ server: ctxServer, request }): {
        ip: string;
      } {
        let serverIP: string | null = null;
      
        if (!options.headersOnly && globalThis.Bun) {
          const server = options.injectServer(app) ?? ctxServer;
          serverIP = getIPFromContext(server, request);
        }
        const headersIP =
          getIPFromHeaders(request.headers, options.checkHeaders) || null;
        return {
          ip: options.headersFirst
            ? headersIP || serverIP || ""
            : serverIP || headersIP || "",
        };
      }).as('global')
    );
  };
};
