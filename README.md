# elysia-ip

![badge](https://github.com/gaurishhs/elysia-ip/actions/workflows/npm-publish.yml/badge.svg)

Get the client ip address in Elysia.
It works with Bun, Cloudflare, Fastly and other runtimes.

Please consider starring the repository to show your ❤️ and support.

## Installation

Requires Bun v1.0.4 or above.
Requires Elysia v1.0.9 or above. 
For older elysia versions please install v0.0.7 of this package

```bash
bun a elysia-ip
```

## Documentation

### Introduction

This plugin adds a `ip` property to the context object. It contains the client ip address.

### Usage

```ts
import { Elysia } from "elysia";
import { ip } from "elysia-ip";

new Elysia().use(ip()).get("/", ({ ip }) => ip).listen(3000);
```

### How does it work?

For Bun runtime, We use `server.requestIP` introduced in Bun v1.0.4 to get the client ip address and early return it.

It relies on headers for runtimes other than Bun. 
Cloudflare and other providers send back specific headers, containing the IP address. For example `CF-Connecting-IP` for Cloudflare and `Fastly-Client-IP` for Fastly.

We also add support for `X-Forwarded-For` header (de-facto standard header) and other various headers.

Priority list:

1. User specified
2. `X-Forwarded-For` (de-facto standard header)
3. `CF-Connecting-IP` (Cloudflare)
4. `Fastly-Client-IP` (Fastly)
5. `X-Real-IP` (Apache)
6. `X-Client-IP` (Nginx)
7. `X-Cluster-Client-IP` (GCP)
8. `X-Forwarded` (RFC 7239)
9. `Forwarded-For` (RFC 7239)
10. `Forwarded` (RFC 7239)
11. `appengine-user-ip` (GCP)
12. `true-client-ip` (Akamai and Cloudflare)
13. `cf-pseudo-ipv4` (Cloudflare)

You can even specify your own headers if you want to as following

```ts
import { Elysia } from "elysia";
import { ip } from "elysia-ip";

new Elysia().use(ip({ checkHeaders: ["X-Forwarded-For", "X-Real-IP"] })).get("/", ({ ip }) => ip).listen(3000);
```

or 

```ts
import { Elysia } from "elysia";
import { ip } from "elysia-ip";

new Elysia().use(ip({ checkHeaders: "X-Forwarded-For" })).get("/", ({ ip }) => ip).listen(3000);
```

You can also switch to Headers only mode by setting `headersOnly` to `true`. This will only check headers and not the `server.requestIP` property.

```ts
import { Elysia } from "elysia";
import { ip } from "elysia-ip";

new Elysia().use(ip({ headersOnly: true })).get("/", ({ ip }) => ip).listen(3000);
```

## License
MIT

## Author
Copyright (c) 2023 Gaurish Sethia, All Rights Reserved.
