module.exports = function(app) {
    var controller = app.controllers.meeting;

    app.route('/v1/meetings')
      .post(controller.createMeeting);
    app.route('/v1/meetings/verify')
      .post(controller.verifyMeeting);
};
