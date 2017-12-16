module.exports = function(app) {
    var controller = app.controllers.api;

    app.route('/v1/api')
      .get(controller.getAPIInfo);
};
