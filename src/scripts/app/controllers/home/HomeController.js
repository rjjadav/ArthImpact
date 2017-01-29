var mCtrls = require('./../_mCtrls');

mCtrls.controller('HomeController',HomeController);

HomeController.$inject = [];
 
function HomeController(){
	var home = this;

	$(window).scroll(function(){
		if ($(window).scrollTop() >= 300) {
			$('.toolbar-header').removeClass('no-bg');
			$('.sticky').removeClass('hidden');
			$('.white').addClass('hidden');
		}
		else {
			$('.toolbar-header').addClass('no-bg');
			$('.sticky').addClass('hidden');
			$('.white').removeClass('hidden');
		}
	});
}