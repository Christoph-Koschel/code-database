const {ConfigBuilder} = require("./engine/config");
const {PLUGINS} = require("./engine/plugins");
let builder = new ConfigBuilder();

builder.add_module("cdb", [
    "./cdb"
])
    .type("lib")
    .use(PLUGINS.TSB.PACKER, "cdb", "./out/cdb.js");

exports.default = builder.build();