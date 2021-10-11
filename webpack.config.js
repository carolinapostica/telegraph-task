const path = require( "path" );

module.exports = {
	mode: "development",
	entry: "./src/js/app.js",
	module: {
		rules: [
			{ test: /\.handlebars$/, loader: "handlebars-loader" }
		]
	},
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "app.bundle.js"
	}
};
