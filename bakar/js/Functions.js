/**
* Bakar (http://www.bakar.be)
*
* Functions
*
* @link         http://www.bakar.be
* @copyright    Copyright (c) 2005-2016 Bakar. (http://www.bakar.be)
* @version      1.0
*/
(function($){
    var getInjecteur            =	function(name){
        var returne;
        
        switch(name){
            case 'lightbox':
            returne =   'Blightbox';
            break;
            
            case 'timer':
            returne =   'Btimer';
            break;
            
            case 'ajax':
            returne =   'Bajax';
            break;
            
            case 'window':
            returne =   'Bwindow';
            break;
			
			case 'forms':
			returne	=	'Bforms';
			break;
			
			case 'validators':
			returne	=	'Bvalidators';
			break;
            
			case 'checkbox':
			returne	=	'Bcheckbox';
			break;
			
			case 'filemanager':
			returne	=	'Bfilemanager';
			break;
			
			case 'files':
			returne	=	'Bfiles';
			break;
			
            default:
            returne =   'Bwindow';
            break;
        }
        return returne;
    };
    var getPrefix               =   function(name){
        var injecteur   =   $.getInjecteur(name).toLowerCase();
        return 'data-'+injecteur+'-';
    };
	var isFalse                 =   function(value){
        var returne	=	false;
        if(value === false || value === 'false'){
            returne = true;
        }
        return returne;
    };
    var isTrue			        =	function(value){
        var returne	=	false;
        if(value === true|| value === 'true'){
            returne	=	true;
        }
        return returne;
    };
    var isNotFalse		        =	function(value){
        var returne = false;
        if(value !== false && value !== 'false'){
            returne = true;
        }
        return returne;
    };
    var isNotTrue		        =	function(value){
        var returne	=	false;
        if(value !== true && value !== 'true'){
            returne = true;
        }
        return returne;
    };
    var isRealFalse		        =	function(value){
        var returne = false;
        if(value === false){
            returne = true;
        }
        return returne;
    };
    var isRealTrue		        =	function(value){
        var returne = false;
        if(value === true){
            returne = true;
        }
        return returne;
    };
    var isNotRealFalse	        =	function(value){
        var returne = false;
        if(value !== false){
            returne = true;
        }
        return returne;
    };
    var isNotRealTrue	        =	function(value){
        var returne = false;
        if(value !== true){
            returne = true;
        }
        return returne;
    };
    var isNull			        =	function(value){
        var returne = false;
        if(value === null || value === '' || typeof value == 'undefined'){
            returne = true;
        }
        return returne;
    };
    var isRealNull		        =	function(value){
        var returne = false;
        if(value === null){
            returne = true;
        }
        return returne;
    };
    var isNotNull		        =	function(value){
        var returne = false;
        if(value !== null && value !== '' && typeof value != 'undefined'){
            returne = true;
        }
        return returne;
    };
    var isNotRealNull	        =	function(value){
        var returne = false;
        if(value !== null){
            returne = true;
        }
        return returne;
    };
    var isDefined		        =	function(value){
        var returne = false;
        if(typeof value != 'undefined'){
            returne = true;
        }
        return returne;
    };
    var isUndefined		        =	function(value){
        var returne = false;
        if(typeof value == 'undefined'){
            returne = true;
        }
        return returne;
    };   
    var isEmpty			        =	function(value){
        var returne = false;
        if(value === '' || value === null || typeof value == 'undefined'){
           returne = true;
        }
        return returne;
    };
	var isRealEmpty		        =	function(value){
        var returne	=	false;
        if(value === ''){
            returne = true;
        }
        return returne;
    };
    var isNotEmpty		        =	function(value){
        var returne = false;
        if(value !== '' && value !== null && typeof value != 'undefined'){
            returne = true;
        }
        return returne;
    };
    var isRealNotEmpty	        =	function(value){
        var returne	=	false;
        if(value !== ''){
            returne = true;
        }
        return returne;
    };   
    var isJquery		        =	function(value){
        return value && value.hasOwnProperty && value instanceof jQuery;
    };
    var is$				        =	function(value){
        return $.isJquery(value);
    };   
    var isNot$                  =   function(value){
        return !this.is$(value);
    };
    var isNotJquery             =   function(value){
        return this.isNot$(value);
    };
    var isEnter			        =	function(evt){
        var returne	=	false;
        if(evt.keyCode === 13){returne = true;}
        return returne;
    };
    var isRightClick            =   function(evt){
        return    evt.which ==	3	?	true	:	false;  
    };
    var md5				        =	function(){
        return Math.random().toString(36).substr(2);
    };
    var key				        =	function(){
        return $.md5();
    };
    var stopDefault		        =	function(evt){
        evt.preventDefault();
    };
    var stopPropagation	        =	function(evt){
        evt.stopPropagation();
    };
    var stopped			        =	function(evt){
		$.stopPropagation(evt);
		$.stopDefault(evt);
	};
    var stop			        =	function(evt){
        $.stopped(evt);
    };
    var func			        =  	function(f, obj){
		var returne	=	obj;
		if($.isFunction(f)){returne = f(obj);}
		return returne;
	};
    var filters			        =  	function(type, data){
		switch(type){
			case 'numeric':
			data	=	data.replace(/[^\d\+]/g, "");
			break;
		}
		return data;
	}
	var scrollWidth		        =	function(){
		var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
			$outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
			inner = $inner[0],
			outer = $outer[0];
     
		jQuery('body').append(outer);
		var width1 = inner.offsetWidth;
		$outer.css('overflow', 'scroll');
		var width2 = outer.clientWidth;
		$outer.remove();
 
		return (width1 - width2);
	}
	var getCookie		        =	function getCookie(cname){
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
		}
		return "";
	}
	var setCookie		        =	function setCookie(cname, cvalue, exdays){
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}
    var getServiceManager       =   function(){ 
        return new ServiceManager();
    }
    var getApplicationConfig    =   function(){
        return new ApplicationConfig();
    }
    var getConfigurationManager =   function(){
        return new ConfigurationManager();
    }
    var checkbox    	        =	function(checkbox){
		if(checkbox.parent('.b-checkbox').length == 0){
			var bcheckbox	=	$('<div class="'+checkbox.attr('class')+'"></div>').clone();
			var mask		=	$('<div class="mask"></div>').clone();
			var checked		=	$('<button class="b-btn alphagray bold s"><span class="fa fa-check"></span></button>').clone();
			var unchecked	=	$('<button class="b-btn bold s"></button>').clone();
			var type		=	'b-checkbox.*';
			
			checked.data('isChecked', true);
			unchecked.data('isChecked', false);
			
			mask.append(checked)
				.append(unchecked);
				
			bcheckbox.append(mask);
			checkbox.before(bcheckbox).css('display', 'none');	
			bcheckbox.append(checkbox);
								
			if(!checkbox.prop('checked')){
				mask.css('marginLeft', - (mask.width() / 2));
			}
							
			if(!checkbox.is(':disabled')){
				bcheckbox.on('click', function(evt){
					bcheckbox	=	$(evt.currentTarget);					
					var checkbox=	bcheckbox.find('input.b-checkbox');
											
					if($.isFalse(checkbox.attr('data-bcheckbox-multi'))){
						$('input[type="checkbox"][name="'+checkbox.attr('name')+'"][data-bcheckbox-multi="false"].b-checkbox').filter(':checked').not(checkbox).each(function(){
							$(this).parent().trigger('click');
						});
					}	
					
					mask		=	bcheckbox.children('.mask');
											
					if(mask.css('marginLeft') == '0px'){
						mask.animate({
							marginLeft	:	- (mask.width() / 2),
						});
						
						checkbox	.attr('checked', false)
									.prop('checked', false);				
					}
					else{
						mask.animate({
							marginLeft	:	0,
						});
						checkbox	.attr('checked', true)
									.prop('checked', true);
					}
																
					$.event.trigger({
						type	:	type,
						target	:	checkbox,
					});
							
				});
			}	
		}
	};
    var hide                    =   function(elements){
        if($.isDefined(elements)){
            elements.addClass('hidden');
            if(elements.is(':visible')){
                elements.css('display', 'none')
                        .removeClass('hidden');
            }
        }
        
        return this;
    };
    var show                    =   function(elements){
        if($.isDefined(elements)){
            elements.removeClass('hidden');
            if(!elements.is(':visible')){
                elements.css('display', 'block');
            }
        }
        return this;
    };
    var disable                 =   function(elements){
        if($.isDefined(elements)){
            elements.attr('disabled', 'disabled');
        }
        return this;
    };
    var enable                  =   function(elements){
        if($.isDefined(elements)){
            elements.attr('enable', 'enable');
        }
        return this;
    };
    var float                   =   function(data){
        data.replace(/\D/, '');
        data    ===  ''  ?   data    =   0   :   data    =   parseFloat(data);
        return data;
    };
	var css                     =   function(css, elements){
        if($.isPlainObject(css)){elements.css(css);}
        return this;
	}
    var addClass                =   function(classs, elements){
        if($.isDefined(classs)){elements.addClass(classs);}
        return this;
    }
    var attr                    =   function(name, value, elements){
        if($.isDefined(name) && $.isDefined(value) && $.isDefined(elements)){
    		elements.attr(name, value);
		}
		return this;
    }
	var length					=	function(array){
		var length	=	0;
		for(var i in array){
			console.log(array[i]);
			length++;
		}
		console.log('end');
		return length;
	}
	var F				        =	{
        getInjecteur            :   getInjecteur,
        getPrefix               :   getPrefix,
        isFalse			        :	isFalse,
        isTrue			        :  	isTrue,
        isNotFalse		        :	isNotFalse,
        isNotTrue		        :	isNotTrue,
        isRealFalse		        :	isRealFalse,
        isRealTrue		        :	isRealTrue,
        isNotRealFalse	        :	isNotRealFalse,
        isNotRealTrue	        :	isNotRealTrue,
        isNull			        :	isNull,
        isRealNull		        :	isRealNull,
        isNotNull		        :	isNotNull,
        isNotRealNull	        :	isNotRealNull,
        isDefined		        :	isDefined,
        isUndefined		        :	isUndefined,
        isEmpty			        :	isEmpty,
        isRealEmpty		        :	isRealEmpty,
        isNotEmpty		        :	isNotEmpty,
        isRealNotEmpty	        :	isRealNotEmpty,
        isJquery		        :	isJquery,
        is$				        :	is$,
        isNot$                  :   isNot$,
        isNotJquery             :   isNotJquery,
        isEnter			        :	isEnter,
        isRightClick            :   isRightClick,
        md5				        :	md5,
        key				        :	key,
        stopDefault		        :	stopDefault,
        stopPropagation	        :	stopPropagation,
        stopped		    	    :	stopped,
        stop			        :	stop,
        func			        :	func,
		filters			        :	filters,
		scrollWidth		        :	scrollWidth,
		setCookie		        :   setCookie,
		getCookie		        :	getCookie,
        getServiceManager       :   getServiceManager,
        getApplicationConfig    :   getApplicationConfig,
        getConfigurationManager :   getConfigurationManager,
        checkbox                :   checkbox,
		hide				    :	hide,
        show                    :   show,
        disable                 :   disable,
        disabled                :   disable,
        enable                  :   enable,
        enabled                 :   enable,
        float                   :   float,
        toFloat                 :   float,
        _css                    :   css,
        _addClass               :   addClass,
        _attr                   :   attr,
		_length					:	length,
    };
	jQuery.extend(F);
})(jQuery);