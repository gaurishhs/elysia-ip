import { Elysia } from "elysia";
import { ip } from "./src";

const app = new Elysia()
  .use(ip({ headersOnly: true, checkHeaders: ["cf-connecting-ip"] })).get(
    "/test",
    ({ ip, request }) => {
      console.log("ip", ip);
      console.log("headers", JSON.stringify(request.headers, null, 2));
      return "777";
    },
  ).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);