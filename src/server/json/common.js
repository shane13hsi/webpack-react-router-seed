module.exports = function(app) {
    app.get('/msg/', function(req, res) {
        res.json(require('./common/msg.json'));
    });
};
