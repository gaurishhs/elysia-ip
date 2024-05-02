import type { IPHeaders } from "./header"
import type { injectServer } from "./injectserver"

export interface Options {
  /**
   * Customize headers to check for IP address
   * @default ['x-real-ip', 'x-client-ip', 'cf-connecting-ip', 'fastly-client-ip', 'x-cluster-client-ip', 'x-forwarded', 'forwarded-for', 'forwarded', 'x-forwarded', 'appengine-user-ip', 'true-client-ip', 'cf-pseudo-ipv4']
   */
  checkHeaders?: IPHeaders[]
  /**
   * Only check headers regardless of the runtime environment
   * @default false
   */
  headersOnly?: boolean
  /**
   *
   */
  injectServer: injectServer
}
