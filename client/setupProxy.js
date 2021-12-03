import proxy from 'http-proxy-middleware'

module.exports = function(app) {
  app.use(proxy("/**", {
    target: "http://localhost:8000",
    secure: false
  }));
};