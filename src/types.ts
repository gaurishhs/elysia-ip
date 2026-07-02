import type { Server } from "elysia/universal"
import type Elysia from "elysia"

export type IPHeaders =
  | "x-real-ip"
  | "x-client-ip"
  | "cf-connecting-ip"
  | "fastly-client-ip"
  | "x-cluster-client-ip"
  | "x-forwarded"
  | "forwarded-for"
  | "forwarded"
  | "x-forwarded"
  | "appengine-user-ip"
  | "true-client-ip"
  | "cf-pseudo-ipv4"
  | (string & {})

export type InjectServer = (app: Elysia) => Server | undefined

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
   * Prioritize the IP address from the headers over the one obtained from the bun server
   * @default false
   */
  headersFirst?: boolean
  /**
   */
  injectServer: InjectServer
}
