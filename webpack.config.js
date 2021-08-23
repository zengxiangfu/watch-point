const path = require('path')

module.exports = {
    mode:'production', // production | development
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname , 'dist'),
        filename:'watchPoint.js',
        // library:'WatchPoint',
        libraryTarget:'umd'
    }
}