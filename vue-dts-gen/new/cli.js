#!/usr/bin/env node
"use strict";

var _chunkOXJAFVBBjs = require('./chunk-OXJAFVBB.js');

// src/cli.ts
var _cac = require('cac');

// package.json
var version = "0.1.0";

// src/cli.ts
var cli = _cac.cac.call(void 0, "vue-dts-gen");
cli.command("[...vue files]", "Generate .d.ts for .vue files").option("--outDir <dir>", "Output directory").option("--tsconfig <dir>", "specified tsconfig.json path").action(async (input, flags) => {
  const {build} = await Promise.resolve().then(() => _chunkOXJAFVBBjs.__toModule.call(void 0, require("./index.js")));
  await build({input, outDir: flags.outDir, tsconfig: flags.tsconfig});
});
cli.version(version);
cli.help();
cli.parse();
