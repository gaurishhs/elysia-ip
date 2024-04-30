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
