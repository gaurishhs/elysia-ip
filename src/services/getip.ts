import { headersToCheck } from "../constants";
import { IPHeaders } from "../types";
import { debug } from "./debug";

export const getIPFromContext = (server: any, request: Request) => {
  let ip: string | null = null;

  if (!server) {
    debug(
      "plugin: Elysia server is not initialized. Make sure to call Elysia.listen()"
    );
    debug("plugin: use injectServer to inject Server instance");
  } else if (!server.requestIP) {
    debug("plugin: server.requestIP is null");
    debug("plugin: Please check server instance");
  } else {
    const socketAddress = server.requestIP(request);
    debug(`plugin: socketAddress ${JSON.stringify(socketAddress)}`);
    if (!socketAddress) {
      debug("plugin: ip from server.requestIP return `null`");
    } else {
      ip = socketAddress.address;
    }
  }

  return ip;
};

export const getIPFromHeaders = (
  headers: Headers,
  checkHeaders: IPHeaders[] = headersToCheck
) => {
  // User provided single header
  if (typeof checkHeaders === "string" && headers.get(checkHeaders)) {
    debug(`getIP: Found ip from header ${checkHeaders}`);
    return headers.get(checkHeaders);
  }

  // check for x-forwarded-for only when user did not provide headers
  if (
    checkHeaders &&
    checkHeaders === headersToCheck &&
    headers.get("x-forwarded-for")
  ) {
    debug("getIP: IP From Header x-forwarded-for");
    return headers.get("x-forwarded-for")?.split(",")[0];
  }

  // User provided / default headers array
  if (Array.isArray(checkHeaders)) {
    let clientIP: string | undefined | null = null;
    for (const header of checkHeaders) {
      clientIP = headers.get(header);
      if (clientIP) {
        debug(`getIP: Found ip from header ${header}`);
        break;
      }
    }
    return clientIP;
  }

  if (!checkHeaders) {
    debug("getIP: No checkHeaders");
    return null;
  }
};
