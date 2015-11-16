(function($){
	var device				=	new Object();
	
	device.isAndroid		=	function() {
        return navigator.userAgent.match(/Android/i);
    },
    device.isBlackBerry	=	function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    device.isiOS			=	function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    device.isOperaMini		=	function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    device.isWindowsMobile	= 	function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    device.isMobile		=	function() {
        return (device.isAndroid() || device.isBlackBerry() || device.isOperaMini() || device.isiOS() || device.isWindowsMobile());
    }
	device.isIpad			=	function(){
		return navigator.userAgent.match(/iPad/i);
	}
	device.isIpod			=	function(){
		return navigator.userAgent.match(/iPod/i);
	}
	device.isIphone		=	function(){
		return navigator.userAgent.match(/Iphone/i);
	}
	device.isSmartphone	=	function(){
		return (device.isAndroid() || device.isBlackBerry() || device.isOperaMini() || device.isIphone() || device.isWindowsMobile());
	}
	
	jQuery.extend(device);
})(jQuery);