module.exports = (app) => {
  app.get('/msg/', (req, res) => {
    res.json(require('./common/msg.json'));
  });
};
