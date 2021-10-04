// Karma configuration
// Generated on Fri Oct 01 2021 12:08:47 GMT-0700 (Pacific Daylight Time)

module.exports = function (config) {
    const {
        SAUCE,
        SAUCE_USERNAME,
        SAUCE_ACCESS_KEY
    } = process.env;

    if (SAUCE === 'true' && !SAUCE_USERNAME || !SAUCE_ACCESS_KEY) {
        console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
        process.exit(1)
    }

    const firefoxOptions = {
        prefs: {
            'devtools.chrome.enabled': true,
            'devtools.debugger.prompt-connection': false,
            'devtools.debugger.remote-enabled': true,
            'dom.webnotifications.enabled': false,
            'media.webrtc.hw.h264.enabled': true,
            'media.getusermedia.screensharing.enabled': true,
            'media.navigator.permission.disabled': true,
            'media.navigator.streams.fake': true,
            'media.peerconnection.video.h264_enabled': true,
        },
    };

    const chromeOptions = {
        args: [
            'start-maximized',
            'disable-infobars',
            'ignore-gpu-blacklist',
            'test-type',
            'disable-gpu',
            '--disable-features=WebRtcHideLocalIpsWithMdns',
            '--use-fake-device-for-media-stream',
            '--use-fake-ui-for-media-stream',
            '--enable-experimental-web-platform-features',
            '--allow-insecure-localhost',
            '--unsafely-treat-insecure-origin-as-secure',
        ],
    };

    // Browsers to run on Sauce Labs
    // Check out https://saucelabs.com/platforms for all browser/OS combos
    const customLaunchers = {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: 'latest',
            tags: ['jsonwp-chrome'],
            'goog:chromeOptions': chromeOptions
        },
        sl_chromeW3C: {
            base: 'SauceLabs',
            browserName: 'chrome',
            browserVersion: 'latest',
            'goog:chromeOptions': chromeOptions,
            'sauce:options': {
                tags: ['w3c-chrome']
            }
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 'latest',
            'moz:firefoxOptions': firefoxOptions,
            tags: ['jsonwp-firefox']
        },
        sl_firefoxW3c: {
            base: 'SauceLabs',
            browserName: 'firefox',
            browserVersion: 'latest',
            'moz:firefoxOptions': firefoxOptions,
            'sauce:options': {
                tags: ['w3c-chrome']
            }
        }
    };

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
        frameworks: ['mocha', 'chai'],


        // list of files / patterns to load in the browser
        files: [

            'public/*.html',
            'src/**/*.js',
          //  {pattern: 'public/**/*.html', served: true }
           // 'src/**/*.test.js'
        ],

        // list of files / patterns to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
        reporters: ['progress', 'saucelabs'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
        customLaunchers: process.env.SAUCE === 'true' ? customLaunchers : null,
        browsers: process.env.SAUCE === 'true' ? Object.keys(customLaunchers) : ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser instances should be started simultaneously
        concurrency: Infinity,

        sauceLabs: {
          testName: 'Sandbox - Karma and Sauce Labs demo',
          recordScreenshots: false,
          connectOptions: {
            logfile: 'sauce_connect.log'
          },
          public: 'public'
        },
    })
}
