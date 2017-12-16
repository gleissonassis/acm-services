module.exports = function() {
    var controller = {};

    controller.getAPIInfo = function(req, res) {
        res.status(200).json({
          version: '1.0.0.0',
          status: 'Is everything working fine! All the robots are saying that, we trust them.'
      });
    };

    return controller;
};
