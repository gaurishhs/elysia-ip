import { defineConfig } from "tsdown";

export default defineConfig({
    entry: 'src/**/*.ts',
    dts: true,
    exports: true,
    unbundle: true
})