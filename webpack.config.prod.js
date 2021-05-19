const path = require("path");
const CleanPlugin =  require("clean-webpack-plugin");

module.exports = {
    mode : "production",
    entry : "./src/classes/app.ts",
    output : {
        filename : "bundle.js",
        path : path.resolve(__dirname,"public/classes")
    },
    devtool : "inline-source-map", // for sourceMap=true mapping
    module : { 
        rules : [
            {
                test : /\.ts$/,
                use : "ts-loader",
                exclude : /node_modules/
            }
        ]
    },
    resolve : {
        extensions : [".ts",".js"]
    },
    plugins: [
        // this plugin will clean the public/classes folder before writing anything to it 
        new CleanPlugin.CleanWebpackPlugin()
    ]
};