// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/modernizr/modernizr.js',
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/jquery-validate/dist/jquery.validate.js',
      'app/bower_components/fastclick/lib/fastclick.js',
      'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
      'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
      'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
      'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
      'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
      'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
      'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
      'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
      'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
      'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
      'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
      'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
      'app/bower_components/bootstrap-select/dist/js/bootstrap-select.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/jquery-ui/ui/jquery-ui.js',
      'app/bower_components/ng-table/ng-table.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/lodash/dist/lodash.compat.js',
      'app/bower_components/angular-google-maps/dist/angular-google-maps.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/ng-table/ng-table.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
