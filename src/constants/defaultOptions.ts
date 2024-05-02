import { Options } from "../types/options"
import { headersToCheck } from "./headerlist"

export const defaultOptions: Options = {
  headersOnly: false,
  checkHeaders: headersToCheck,
  injectServer: (app) => app.server,
}
