// 服务端的配置
module.exports = {
  piping: {
    // Hook ensures server restart on all required deps, even client side.
    // Server restarting invalidates require cache, no more stale html.
    hook: true
  },
  port: process.env.PORT || 8000
};
