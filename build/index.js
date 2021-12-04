"use strict";
require("./check-versions")();
const ora = require("ora");
const rm = require("rimraf");
const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const config = require("../config");
const webpackConfig = require("./webpack.prod.conf");

const spinner = ora(`正在构建,请稍等...`);
spinner.start();

rm(path.join(config.build.assetsPublicPath, config.build.assetsSubDirectory), (err) => {
  if (err) throw err;
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false,
      }) + "\n\n"
    );

    if (stats.hasErrors()) {
      console.log(chalk.red("  Build failed with errors.\n"));
      process.exit(1);
    }

    console.log(chalk.cyan("  Build complete.\n"));
    console.log(
      chalk.yellow("  Tip: built files are meant to be served over an HTTP server.\n" + "  Opening index.html over file:// won't work.\n")
    );
  });
});
