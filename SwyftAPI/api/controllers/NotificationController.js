module.exports = {
  subscribe: function (req, res) {
    if (req.isSocket == true) {
      sails.sockets.join(req.socket, 'notifications');
      res.send('Connected');
    } else {
      res.badRequest('You must be using WebSockets for this request.');
    }
  }
}
