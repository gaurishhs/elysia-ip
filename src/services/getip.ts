import { headersToCheck } from "../constants";
import { IPHeaders } from "../types";
import { debug } from "./debug";

export const getIP = (
  headers: Headers,
  checkHeaders: IPHeaders[] = headersToCheck,
) => {
  if (typeof checkHeaders === "string" && headers.get(checkHeaders)) {
    debug(`getIP: Found ip from header ${checkHeaders}`);
    return headers.get(checkHeaders);
  }

  // X-Forwarded-For is the de-facto standard header
  if (!checkHeaders && headers.get("x-forwarded-for")) {
    debug("getIP: IP From Header x-forwarded-for");
    return headers.get("x-forwarded-for")?.split(",")[0];
  }

  if (!checkHeaders) {
    debug("getIP: No checkHeaders");
    return null;
  }

  let clientIP: string | undefined | null = null;
  for (const header of checkHeaders) {
    clientIP = headers.get(header);
    if (clientIP) {
      debug(`getIP: Found ip from header ${header}`);
      break;
    }
  }

  if (!clientIP) {
    debug("getIP: Failed to get ip from header!");
    return;
  }
  return clientIP;
};
