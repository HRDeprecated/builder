#! /usr/bin/env node

var _ = require("lodash");
var fs = require('fs');
var path = require('path');
var prog = require('commander');
var pkg = require('../package.json');

var Builder = require('../lib/builder').Builder;
var defaultConfig = require('../lib/defaults');

prog
.version(pkg.version);

prog.command('build [source_dir]')
.description('Build a HappyRhino application from a directory')
.option('-c, --config <file>', 'Configuration file', 'build.js')
.action(function(folder) {
    var config;

    folder = folder || process.cwd();
    config = require(path.resolve(folder, this.config));

    var config = _.defaults(this.data, defaultConfig);

    var builder = new Builder(config, console.log.bind(console));
    builder.build()
    .fail(function() {
        process.exit(-1);
    });
});

// Parse and fallback to help if no args
if(_.isEmpty(prog.parse(process.argv).args) && process.argv.length === 2) {
    prog.help();
}

