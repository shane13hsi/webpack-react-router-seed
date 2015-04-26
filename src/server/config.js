// 服务端的配置
module.exports = {
    piping: {
        // Ignore webpack custom loaders on server. TODO: Reuse index.js config.
        ignore: /(\/\.|~$|\.(css|less|sass|scss|styl))/,
        // Hook ensures server restart on all required deps, even client side.
        // Server restarting invalidates require cache, no more stale html.
        hook: true
    },
    port: process.env.PORT || 8000,
    webpackStylesExtensions: ['css', 'less', 'sass', 'scss', 'styl']
};
