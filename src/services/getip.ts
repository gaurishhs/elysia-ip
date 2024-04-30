import { headersToCheck } from "../constants/headerlist"
import { IPHeaders } from "../types/header"

export const getIP = (
  headers: Headers,
  checkHeaders: IPHeaders[] = headersToCheck,
) => {
  if (typeof checkHeaders === "string" && headers.get(checkHeaders))
    return headers.get(checkHeaders)
  // X-Forwarded-For is the de-facto standard header
  if (headers.get("x-forwarded-for"))
    return headers.get("x-forwarded-for")?.split(",")[0]
  let clientIP: string | undefined | null = null
  if (!checkHeaders) return null
  for (const header of checkHeaders) {
    clientIP = headers.get(header)
    if (clientIP) break
  }
  return clientIP
}
