Meteor.startup(function() {
    Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://localhost:3000';
    process.env.ROOT_URL = "http://localhost:3000";
});
