import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { RspackManifestPlugin } from "rspack-manifest-plugin";
import CompressionPlugin = require("compression-webpack-plugin");
const RefreshPlugin = require("@rspack/plugin-react-refresh");

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["defaults", "supports es6-module"];

export default defineConfig({
	context: __dirname,
	entry: {
		main: "./src/main.tsx",
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"],
	},
	output: {
		publicPath: "",
		filename: "[name].[chunkhash:7].js",
		chunkFilename: "[name].[chunkhash:7].js",
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset",
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true,
								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: isDev,
									},
								},
							},
							env: { targets },
						},
					},
				],
			},
		],
	},
	plugins: [
		new RspackManifestPlugin({}),
		new CompressionPlugin({ algorithm: "gzip" }),
		new CompressionPlugin({ algorithm: "brotliCompress" }),
		isDev ? new RefreshPlugin() : null,
	].filter(Boolean),
	optimization: {
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets },
			}),
		],
	},
	experiments: {
		css: true,
	},
});
