import { headersToCheck } from "../constants"
import { IPHeaders } from "../types"
import { logger } from "./logger"

export const getIP = (
  headers: Headers,
  checkHeaders: IPHeaders[] | IPHeaders = headersToCheck,
) => {
  if (typeof checkHeaders === "string") {
    const clientIP = headers.get(checkHeaders)
    if (!checkHeaders || !clientIP) {
      logger("getIP", "Can't get ip from header `", checkHeaders)
      return null
    }

    logger("getIP", `Found ip from header ${checkHeaders}, IP :${clientIP}`)
    return clientIP
  }

  let clientIP: string | null = null
  for (const header of checkHeaders) {
    clientIP = headers.get(header)
    if (clientIP) {
      logger("getIP", `Found ip from header ${header}, IP : ${clientIP}`)
      break
    }
  }

  if (!clientIP) {
    logger("getIP", "Failed to get ip from header!")
  }
  return clientIP
}
