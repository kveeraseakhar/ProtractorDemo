/* global malarkey:false, toastr:false, moment:false */
(function() {
	'use strict';

	angular
	.module('norseApp')
	.constant('malarkey', malarkey)
	.constant('toastr', toastr)
	.constant('moment', moment)
	.constant('DEBUG_MODE', /*DEBUG_MODE*/true/*DEBUG_MODE*/)
	.constant('VERSION_TAG', /*VERSION_TAG_START*/new Date().getTime()/*VERSION_TAG_END*/)
	.constant('LOCALES', {
		'locales': {
			'ru_RU': 'Русский',
			'en_US': 'English'
		},
		'preferredLocale': 'en_US'
	});

})();