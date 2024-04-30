import type { Server } from "bun"
import type Elysia from "elysia"

export type injectServer = (app: Elysia) => Server | null
