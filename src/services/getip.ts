import { headersToCheck } from "../constants"
import { IPHeaders } from "../types"
import { logger } from "./logger"

export const getIP = (
  headers: Headers,
  checkHeaders: IPHeaders[] = headersToCheck,
) => {
  // X-Forwarded-For is the de-facto standard header
  if (!checkHeaders && headers.get("x-forwarded-for")) {
    logger("getIP", "IP From Header x-forwarded-for")
    return headers.get("x-forwarded-for")?.split(",")[0]
  }

  if (!checkHeaders) {
    logger("getIP", "checkHeaders `false` return `null`")
    return null
  }

  let clientIP: string | undefined | null = null
  for (const header of checkHeaders) {
    clientIP = headers.get(header)
    if (clientIP) {
      logger("getIP", `Found ip from header ${header}`)
      break
    }
  }

  if (!clientIP) {
    logger("getIP", "Failed to get ip from header!")
    return
  }
  return clientIP
}
