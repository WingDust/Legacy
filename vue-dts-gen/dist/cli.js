#!/usr/bin/env node
"use strict";
// src/cli.ts
var _cac = require('cac');

// package.json
var version = "0.2.3";

// src/cli.ts
var cli = _cac.cac.call(void 0, "vue-dts-gen");
cli.command("[...vue files]", "Generate .d.ts for .vue files").option("--outDir <dir>", "Output directory").action(async (input, flags) => {
  const {build} = await Promise.resolve().then(() => require("./index.js"));
  await build({input, outDir: flags.outDir});
});
cli.version(version);
cli.help();
cli.parse();
