'use strict';

var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;

var HTMLReport = require('protractor-html-reporter');
var jasmineReporters = require('jasmine-reporters');
var fs = require('fs-extra');

fs.emptyDir('screenshots/', function (err) {
        console.log(err);
    });

exports.config = {
   
		 sauceUser: 'norse',
		 sauceKey: '23583044-7022-4fe6-a1f0-6f1eb7d2306c',	
		
	// The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json
    // Capabilities to be passed to the webdriver instance.
		
	//For CrossBrowser Testing
   multiCapabilities:[{
      'browserName': 'Firefox',
      'platform': 'OS X 10.10',
      'version': '52.0',
      'name': 'OS X 10.10-Firefox0-v52',
      'tunnel-identifier': process.env.AGENT_NAME

    }, {
        browserName: "chrome",
        platform: "Windows 10",
        version: "45.0",
        'build': 12345,
		'name': 'Windows-Chrome-v45'
    }, {
        browserName: "MicrosoftEdge",
        platform: "Windows 10",
        version: "13.10586",  
        screenResolution:'1280*10204',
		'name': 'Windows-MicrosoftEdge-v13.10586'
    },{
        browserName: "chrome",
        platform: "Windows 10",
        version: "50",
        'build': 12345,
		 'name': 'Windows-Chrome-v50'
    }, {
        browserName: "internet explorer",
        platform: "WIN8",
        version: "10",
        'build': 12345,
		'name': 'Internet Explorer'
    }],
		 //Mobile cross browser testing
		 /*multiCapabilities: [
		        {platformName: 'Android',
		            platformVersion: '5.0',
		            browserName: 'Browser',
		            deviceName: 'Android Emulator',
		            'appium-version': "1.5.3",
		            name: 'Android 5.0',
	            username: 'norse',
	            accessKey: '23583044-7022-4fe6-a1f0-6f1eb7d2306c'

		        },{
		        	 platformName: 'Android',
			            platformVersion: '4.4',
			            browserName: 'Browser',
			            deviceName: 'Android Emulator',
			            'appium-version': "1.5.3",	
			            name:'Android 4.4',
		            username: 'norse',
		            accessKey: '23583044-7022-4fe6-a1f0-6f1eb7d2306c'
		        }], */
   
		/*capabilities: {			
		
			//Mobile Cross browser functional testing(Web)
		       platformName: 'Android',
	            platformVersion: '4.4',
	            browserName: 'Browser',
	            deviceName: 'Android Emulator',
	            'appium-version': "1.5.3",
	            username: 'norse',
	            accessKey: '23583044-7022-4fe6-a1f0-6f1eb7d2306c',
	            name: 'Norse>Mobile Cross Browser Testing1'
			
			//Web Cross browser testing		
	            	// Note: Please UnComments for (browser.driver.manage().window().setSize(1680,900);)	            	
			  'browserName': 'chrome',			     
			   'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
			    'build': 12345,
			    'name': 'Norse>Web Cross Browser Functional Testing'
	    },*/

	    baseUrl: 'http://localhost:3000',

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: [paths.e2e + '/**/login.js'],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 360000
    },
    onPrepare: function() {
    	
    	browser.driver.manage().window().setSize(1680,900);
        // Add a screenshot reporter and store screenshots to `/tmp/screnshots`: 
    	jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
    	    consolidateAll: true,
    	    savePath: '/Users/veerashekar/Documents/workspace123/norse-demo-frontend/reports',
    	    filePrefix: 'xmlresults'
    	}));
    	
    	jasmine.getEnv().addReporter({
            specDone: function(result) {
                if (result.status == 'failed') {
                    browser.getCapabilities().then(function (caps) {
                        var browserName = caps.get('browserName');
     
                        browser.takeScreenshot().then(function (png) {
                        	  var stream = fs.createWriteStream('/Users/veerashekar/Documents/workspace123/norse-demo-frontend/reports/screenshots/' + browserName + '-' + result.fullName+ '.png');
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        });
                    });
                }
            }
        });
     },
    
    onComplete: function() {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
           browserName = caps.get('browserName');
           browserVersion = caps.get('version');

           var HTMLReport = require('protractor-html-reporter');

   		var testConfig = {
   				outputPath: '/Users/veerashekar/Documents/workspace123/norse-demo-frontend/reports',
   				reportTitle: 'Test Execution Report',
               outputPath: 'target/protractorReports',
               screenshotPath: '/Users/veerashekar/Documents/workspace123/norse-demo-frontend/reports/screenshots',
               testBrowser: browserName,
               browserVersion: browserVersion,
               modifiedSuiteName: false,
               screenshotsOnlyOnFailure: true
           };
   		new HTMLReport().from('/Users/veerashekar/Documents/workspace123/norse-demo-frontend/reports/xmlresults.xml', testConfig);
       });
    }
    
};