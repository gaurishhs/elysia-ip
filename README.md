# elysia-ip

![badge](https://github.com/gaurishhs/elysia-ip/actions/workflows/npm-publish.yml/badge.svg)

Get the Client Ip Address in Elysia.

It supports Cloudflare, Fastly and other runtimes as well.

## Installation

Requires Bun v1.0.4 or above.

```bash
bun a elysia-ip
```

## Documentation

### Introduction

This plugin let's you get client's ip address in Elysia.js

It supports Multiple runtimes (Cloudflare, Fastly Edge, etc.)

### Usage

```ts
import { Elysia } from "elysia";
import { ip } from "elysia-ip";

new Elysia().use(ip()).get("/", ({ ip }) => ip).listen(3000);
```

### How does it work?

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

You can even specify your own header or list of headers if you want to as following

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

For Bun runtime, We use `server.requestIP` introduced in Bun v1.0.4


## License
MIT

## Author
Copyright (c) 2023 Gaurish Sethia, All Rights Reserved.
