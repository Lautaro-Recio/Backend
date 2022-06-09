const path  = require("path");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    target: "node",
    externals:[webpackNodeExternals()],
    output: {
        path: path.resolve(__dirname, "build"),
        filename:"main.js"
    },
    resolve:{
        extensions: [ ".ts","js"]
    },
    module:{
        rules:[
            {
                test: /\.ts?/,
                use: "ts-loader",
                exclude:/node_modules/
            }

        ]
        
    }
}

// la explicacion de la confid esta en las diapositivas