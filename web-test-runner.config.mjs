import {esbuildPlugin} from '@web/dev-server-esbuild';
import {defaultReporter, chromeLauncher} from '@web/test-runner';
import {createSauceLabsLauncher} from '@web/test-runner-saucelabs';

const useSauceConnect = process.env.SAUCE === 'true';
const timeout = process.env.TEST_TIMEOUT || 60000;
let browsers = null;

const appName = 'saucelabs-sandbox';
const environment = process.env.environment || 'dev';
const buildNumber = process.env.BUILD_NUMBER || 0;
const buildName = `${appName}-tests-${environment}#${buildNumber}`;

if (useSauceConnect) {
  const sauceLabsOptions = {
    name: buildName,
    build: buildNumber,
    recordVideo: true,
    recordScreenshots: false,
    logLevel: 'debug',
    browserStartTimeout: 60000,
  };

  const sauceConnectOptions = {
    // eslint-disable-next-line no-console
    logger: (msg) => console.log(msg),
    noSslBumpDomains: [
      'idbroker.webex.com',
      'idbrokerbts.webex.com',
      '127.0.0.1',
      'localhost',
      '*.wbx2.com',
      '*.ciscospark.com',
    ].join(','),
    logfile: './sauce.log',
  };

  const msEdgeOptions = {
    args: [
      '--disable-features=WebRtcHideLocalIpsWithMdns',
      '--use-fake-device-for-media-stream',
      '--use-fake-ui-for-media-stream',
      '--enable-experimental-web-platform-features',
    ],
  };

  const chromeOptions = {
    args: [
      'start-maximized',
      'disable-infobars',
      'ignore-gpu-blacklist',
      'test-type',
      'disable-gpu',
      '--no-sandbox',
      '--disable-features=WebRtcHideLocalIpsWithMdns',
      '--use-fake-device-for-media-stream',
      '--use-fake-ui-for-media-stream',
      '--enable-experimental-web-platform-features',
      '--allow-insecure-localhost',
      '--unsafely-treat-insecure-origin-as-secure',
    ],
  };

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const safariOptions = {
    technologyPreview: true,
  };

  const sauceLabsLauncher = createSauceLabsLauncher({
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
  }, sauceLabsOptions, sauceConnectOptions);

  browsers = [

    sauceLabsLauncher({
      browserName: 'chrome',
      browserVersion: 'latest',
      platformName: 'Windows 10',
      'goog:chromeOptions': chromeOptions,
      'sauce:options':{
        tags: ['w3c-chrome']
      }
    }),
    sauceLabsLauncher({
      browserName: 'firefox',
      browserVersion: 'latest',
      platformName: 'Windows 10',
      'moz:firefoxOptions': firefoxOptions,
      'sauce:options':{
        tags: ['w3c-firefox']
      }
    }),
    /*
    sauceLabsLauncher({
      browserName: 'MicrosoftEdge',
      browserVersion: 'latest',
      platformName: 'Windows 10',
      'ms:edgeOptions': msEdgeOptions,
    }),
    sauceLabsLauncher({
      browserName: 'chrome',
      browserVersion: 'latest',
      platformName: 'macOS 11',
      'goog:chromeOptions': chromeOptions,
      'sauce:options':{
        tags: ['w3c-chrome']
      }
    }),
    sauceLabsLauncher({
      browserName: 'firefox',
      browserVersion: 'latest',
      platformName: 'macOS 11',
      'moz:firefoxOptions': firefoxOptions,
    }),
    sauceLabsLauncher({
      browserName: 'MicrosoftEdge',
      browserVersion: 'latest',
      platformName: 'macOS 11',
      'ms:edgeOptions': msEdgeOptions,
    }),
    sauceLabsLauncher({
      browserName: 'safari',
      browserVersion: 'latest',
      platformName: 'macOS 11',
      // 'safari.options': safariOptions,
      'webkit:WebRTC': {
        DisableInsecureMediaCapture: true,
      },
    }),
    */
  ];
} else {
  browsers = [chromeLauncher({
    launchOptions: {
      args: [
        '--no-sandbox',
        '--use-fake-device-for-media-stream',
        '--use-fake-ui-for-media-stream',
      ],
    },
  })];
}

export default {
  nodeResolve: true,
  target: 'auto-always',
  concurrency: 1,
  concurrentBrowsers: 1,
  files: [
    'src/**/*-test-es6.js',
  ],
  plugins: [
    esbuildPlugin({

    }),
  ],

  browsers,
  browserLogs: true,
  browserStartTimeout: 120 * 1000,
  testFramework: {
    config: {
      timeout,
    },
  }

};
