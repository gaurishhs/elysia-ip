import { headersToCheck } from "../constants";
import { IPHeaders } from "../types";
import { debug } from "./debug";

export const getIP = (
  headers: Headers,
  checkHeaders: IPHeaders[] = headersToCheck,
) => {
  // User provided single header
  if (typeof checkHeaders === "string" && headers.get(checkHeaders)) {
    debug(`getIP: Found ip from header ${checkHeaders}`);
    return headers.get(checkHeaders)
  }

    // check for x-forwaded-for only when user did not provide headers 
    if (checkHeaders && checkHeaders === headersToCheck && headers.get("x-forwarded-for")) {
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
    return clientIP
  }

  if (!checkHeaders) {
    debug("getIP: No checkHeaders");
    return null;
  }
};
