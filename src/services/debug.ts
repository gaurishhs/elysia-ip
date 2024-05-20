import { debuglog } from "node:util";

export const debug = (message: string) => {
  debuglog("elysia-ip")(message);
};
