import debug from "debug"

export const logger = (unit: string, formatter: any, ...params: any[]) =>
  debug("elysia-ip:" + unit)(formatter, ...params)
