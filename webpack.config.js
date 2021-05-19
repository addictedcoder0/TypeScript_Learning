const path = require("path");

module.exports = {
    mode : "development",
    entry : "./src/classes/app.ts",
    output : {
        publicPath : "public/classes", // webpack dev server is having some issue
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
    }
};