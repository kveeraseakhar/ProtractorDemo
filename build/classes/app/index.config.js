(function() {
    'use strict';

    angular
        .module('norseApp')
        .config(config);

    /** @ngInject */
    function config($logProvider, toastr) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = true;
    }
    
 // Angular debug info
    angular
    .module('norseApp').config(function ($compileProvider, DEBUG_MODE) {
      if (!DEBUG_MODE) {
        $compileProvider.debugInfoEnabled(false);// disables AngularJS debug info
      }
    })
    // Angular Translate
    .config(function ($translateProvider, DEBUG_MODE, LOCALES) {
      if (DEBUG_MODE) {
        $translateProvider.useMissingTranslationHandlerLog();// warns about missing translates
      }

      $translateProvider.useStaticFilesLoader({
        prefix: 'resources/locale-',
        suffix: '.json'
      });

      $translateProvider.preferredLanguage(LOCALES.preferredLocale);
      $translateProvider.useLocalStorage();
    })
    // Angular Dynamic Locale
    .config(function (tmhDynamicLocaleProvider) {
      tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
    })

})();