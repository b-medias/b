/**
* Bakar (http://www.bakar.be)
*
* PluginManager
*
* @link         http://www.bakar.be
* @copyright    Copyright (c) 2005-2014 Bakar. (http://www.bakar.be)
* @version      26072014.2054
*/
function PluginManager(){
    this.initialized;
    
    if($.isUndefined(this.initialized)){	
        PluginManager.prototype.setPlugin   =   function(name, plugin){
            if($.isDefined(name) && $.isDefined(plugin)){
                var plugins     =   this.getPlugins();
                plugins[name]   =   plugin;
                this.setPlugins(plugins);
            }
            return this;
        };
        PluginManager.prototype.getPlugin   =   function(name, $params){
            var plugin  =   null;
            switch(name){
				case 'Ajax':
				plugin	=	new Ajax($params);
				break;
				
				case 'Lightbox':
				plugin	=	new Lightbox($params);
				break;
				
				case 'Timer':
				plugin	=	new Timer($params);
				break;
				
				case 'Spinner':
				plugin	=	new Spinner($params);
				break;
			}
            return plugin;
        };
        PluginManager.prototype.get     =   function(name, $params){
            return this.getPlugin(name, $params);
        };
        PluginManager.prototype.set     =   function(name, plugin){
            return  this.setPlugin(name, plugin);
        };
        this.initialized = true;
	}
}

/**
* Bakar (http://www.bakar.be)
*
* B-Timer
*
* @link         http://www.bakar.be
* @copyright    Copyright (c) 2005-2013 Bakar. (http://www.bakar.be)
* @version      26072014.1505
*/
function Timer($params){
	var params	=	{
		Configuration	:	{},
		Keys			:	{
			injecteur	:	$.getInjecteur('timer'),
			events		:	getKeyEvents(),
		},
		jQuery			:	this,
		Elements		:	$(this),
		Selector		:	$(this).selector,
	};
	
	function Fx(params){
		if($.isUndefined(this.initialized)){			
            Fx.prototype.setParams              =	function($params){
                if($.isDefined($params)){
                    params	=	$params;
                }
                return this;
            };
            Fx.prototype.getParams              =	function(){
                if($.isNull(params)){this.setParams({});}
                return params;
            };
            Fx.prototype.setParam               =   function(name, param){
                var $params =   this.getParams();
                $params[name]   =   param;
                this.setParams($params);
                return this;
            };
            Fx.prototype.getParam               =   function(name){
                $params =   this.getParams();
                var param;
                if($.isDefined(name)){
                    param   =   params[name];
                }
                return param;
            };
			
			Fx.prototype.setConfiguration       =   function(name, configuration){
                if($.isDefined(name) && $.isDefined(configuration)){
                    var configurations      =   this.getParam('Configuration');
                    configurations[name]    =   configuration;
                    this.setParam('Configuration', configurations);
                }
                return this;
            };
            Fx.prototype.getConfiguration       =   function(name){
                var configuration   =   null;
        
                if($.isDefined(name)){
                    var configurations  =   this.getParam('Configuration');
                    configuration       =   configurations[name];
                }
                return configuration;
            };
            Fx.prototype.set                    =   function(name, value){
                return this.setConfiguration(name, value);
            };
            Fx.prototype.get                    =   function(name){
                return this.getConfiguration(name);
            };
            
            Fx.prototype.setServiceManager      =   function(serviceManager){
                if($.isDefined(serviceManager)){
                    this.setParam('ServiceManager', serviceManager);
                }
                return this;
            };
            Fx.prototype.getServiceManager      =   function(){
                if($.isNull(this.getParam('ServiceManager'))){
                    this.setServiceManager(new ServiceManager());
                }
                return this.getParam('ServiceManager');
            };
            Fx.prototype.setService             =   function(service){
                return this.setServiceManager(service);
            };
            Fx.prototype.getService             =   function(){
                return this.getServiceManager();
            };
            
            Fx.prototype.setAutoConfiguration   =   function(autoConfiguration){
                if($.isDefined(autoConfiguration)){
                    this.setParam('AutoConfiguration', autoConfiguration);
                }
                return this;
            };
            Fx.prototype.getAutoConfiguration   =   function(attributes){
				if($.isNull(this.getParam('AutoConfiguration'))){
					this.setAutoConfiguration({
                        closeWindow		:	this.getParam('Element').attr(attributes.closeWindow), 
                        showWindow      :   this.getParam('Element').attr(attributes.showWindow), 
                        closeLightbox   :   this.getParam('Element').attr(attributes.closeLightbox),
                        showLigthbox    :   this.getParam('Element').attr(attributes.showLightbox),
                        sendAjax		:	this.getParam('Element').attr(attributes.sendAjax),
                        keys	:	{
                            id  :  this.getParam('Element').attr(attributes.keys.id),	
                        },
					});
                }  
				return this.getParam('AutoConfiguration');
            };

			Fx.prototype.setKey                 =   function(name, key){
				if($.isDefined(name) && $.isDefined(key)){
					var keys    =   this.getParam('Keys');
					keys[name]  =   key;
					this.setParam('Keys', keys);
				}
				return this;
			};
			Fx.prototype.getKey                 =   function(name){
				var key;
				if($.isDefined(name)){
					var keys    =   this.getParam('Keys');
					key         =   keys[name];
				}
				return key;
			};
			
			Fx.prototype.setTag                 =	function(name, tag){
				if($.isDefined(name) && $.isDefined(tag)){
					var tags	=	this.get('tags');
					tags[name]	=	tag;
					this.set('tags', tags);
				}
				return this;
			};
			Fx.prototype.getTag                 =	function(name){
				var tag;
				if($.isDefined(name)){
					var tags	=	this.get('tags');
					tag			=	tags[name];
				}
				return tag;
			};
			
			Fx.prototype.trigger                =   function(type){
                var $this  =   {type   :   getKeyEvents()+type};
                $this[$.getInjecteur('window')]    =   this.getParams();   
                
                var returne     =   $.event.trigger($this);                    
                if($.isNotNull(returne)){this.setParams(returne);}
                return this;
            };
            Fx.prototype.inject                 =   function(element, $params, name, clone){
				this.trigger('before.inject');		
                if($.isUndefined($params)){
                    $params =   this.getParams();
                }
                if($.isUndefined(name)){
                    name    =   this.getKey('injecteur');
                }
                if($.isUndefined(element)){
                    element =   this.getParam('Element');
                }
                
                if($.isTrue(clone)){
                    $params =   $.extend(true, true, {}, $params);
                }

                if($.isDefined(element)){
					element.data(name, $params);
                }
				this.trigger('after.inject');
                return this;
            };
            Fx.prototype.is                     =	function(name){
                return $.isTrue(this.get(name));
            };
            Fx.prototype.$                      =   function(selector){
                var dom;
                
                if($.isDefined(selector)){
                    var doms    =   this.getParam('Dom');
                    dom         =   doms[selector];
                }  
                return dom;
            };
			
					
			Fx.prototype.initialize				=	function(){
				var defaultAttributes	=	this.getServiceManager()
												.getConfigurationManager()
												.getAttr($.getInjecteur('timer'));
					
				var defaultParams		=	this.getServiceManager()
												.getConfigurationManager()
												.get($.getInjecteur('timer'));
				
				var $params		=	$.extend(true, true, defaultParams, this.getParams());
				var attributes	=	$.extend(true, true, defaultAttributes, this.getParam('Attributes'));
										
				if($.isNotNull(this.getParam('Element'))){
                    this.set('auto', this.getParam('Element').attr(attributes.auto));
                    if(this.is('auto')){
                        $params.Configuration   =   $.extend(true, true, $params.Configuration, this.getAutoConfiguration(attributes));
                    }
				}
				
				this.setParams($params)
					.setParam('Attributes', attributes)
					.inject();
				
				return this;
			};
			Fx.prototype.getTime				=	function(name){
				return parseInt(this.get(name), 10);
			};
		
			this.initialized = true;
		}
	}
	function __construct(){	
		$this	=	$.extend(true, true, {}, params);
		$this	=	$.extend(true, true, $this, $params);
		$this.Fx=	new Fx($this);
		
		return $this;
	}
	function getKeyEvents(){
		return $.getInjecteur('timer')+'.';
	}
	
	return __construct();
}

/**
* Bakar (http://www.bakar.be)
*
* B-Lightbox
*
* @link         http://www.bakar.be
* @copyright    Copyright (c) 2005-2014 Bakar. (http://www.bakar.be)
* @version      26072014.1610
*/
function Lightbox($params){
	var params	=	{
		Configuration	:	{},
		Keys			:	{
			injecteur	:	$.getInjecteur('lightbox'),
			events		:	getKeyEvents(),
		},
		jQuery			:	this,
		Elements		:	$(this),
		Selector		:	$(this).selector,
	};

	function Fx(params){
		if($.isUndefined(this.initialized)){
			Fx.prototype.setParams              =	function($params){
				if($.isDefined($params)){
					params	=	$params;
				}
				return this;
			};
			Fx.prototype.getParams              =	function(){
				if($.isNull(params)){this.setParams({});}
				return params;
			};
			Fx.prototype.setParam               =   function(name, param){
				var $params =   this.getParams();
				$params[name]   =   param;
				this.setParams($params);
				return this;
			};
			Fx.prototype.getParam               =   function(name){
				$params =   this.getParams();
				var param;
				if($.isDefined(name)){
					param   =   params[name];
				}
				return param;
			};
			
			Fx.prototype.setConfiguration       =   function(name, configuration){
				if($.isDefined(name) && $.isDefined(configuration)){
					var configurations      =   this.getParam('Configuration');
					configurations[name]    =   configuration;
					this.setParam('Configuration', configurations);
				}
				return this;
			};
			Fx.prototype.getConfiguration       =   function(name){
				var configuration   =   null;
				if($.isDefined(name)){
					var configurations  =   this.getParam('Configuration');
					configuration       =   configurations[name];
				}
				return configuration;
			};
			Fx.prototype.set                    =   function(name, value){
				return this.setConfiguration(name, value);
			};
			Fx.prototype.get                    =   function(name){
				return this.getConfiguration(name);
			};
			
			Fx.prototype.setServiceManager      =   function(serviceManager){
				if($.isDefined(serviceManager)){
					this.setParam('ServiceManager', serviceManager);
				}
				return this;
			};
			Fx.prototype.getServiceManager      =   function(){
				if($.isNull(this.getParam('ServiceManager'))){
					this.setServiceManager(new ServiceManager());
				}
				return this.getParam('ServiceManager');
			};
			Fx.prototype.setService             =   function(service){
				return this.setServiceManager(service);
			};
			Fx.prototype.getService             =   function(){
				return this.getServiceManager();
			};
			
			Fx.prototype.setAutoConfiguration   =   function(autoConfiguration){
				if($.isDefined(autoConfiguration)){
					this.setParam('AutoConfiguration', autoConfiguration);
				}
				return this;
			};	
			Fx.prototype.getAutoConfiguration   =   function(attributes){
				if($.isNull(this.getParam('AutoConfiguration'))){
					this.setAutoConfiguration({
						value		:	this.getParam('Element').attr(attributes.value),
						css			:	this.getParam('Element').attr(attributes.css),
						id			:	this.getParam('Element').attr(attributes.id),
						classs		:	this.getParam('Element').attr(attributes.classs),
						multi		:	this.getParam('Element').attr(attributes.multi),
						connecteurs	:	this.getParam('Element').attr(attributes.connecteurs),
						zindex		:	this.getParam('Element').attr(attributes.zindex),
						style		:	this.getParam('Element').attr(attributes.style),
						superpose	:	this.getParam('Element').attr(attributes.superpose),
						keys	:	{
							id			:	this.getParam('Element').attr(attributes.keys.id),	
						},
						tags	:	{
							lightbox	:	this.getParam('Element').attr(attributes.tags.lightbox),
						},
					});
				}  
				return this.getParam('AutoConfiguration');
			};

			Fx.prototype.setKey                 =   function(name, key){
				if($.isDefined(name) && $.isDefined(key)){
					var keys    =   this.getParam('Keys');
					keys[name]  =   key;
					this.setParam('Keys', keys);
				}
				return this;
			};
			Fx.prototype.getKey                 =   function(name){
				var key;
				if($.isDefined(name)){
					var keys    =   this.getParam('Keys');
					key         =   keys[name];
				}
				return key;
			};
		
			Fx.prototype.setTag                 =	function(name, tag){
				if($.isDefined(name) && $.isDefined(tag)){
					var tags	=	this.get('tags');
					tags[name]	=	tag;
					this.set('tags', tags);
				}
				return this;
			};
			Fx.prototype.getTag                 =	function(name){
				var tag;
				if($.isDefined(name)){
					var tags	=	this.get('tags');
					tag			=	tags[name];
				}
				return tag;
			};
			
			Fx.prototype.setPlugin              =	function(name, plugin){
				if($.isDefined(name) && $.isDefined(plugin)){
					var plugins		=	this.getParam('Plugins');
					plugins[name]	=	plugin;
					this.setParam('Plugins', plugins);
				}
				return this;
			};	
			Fx.prototype.getPlugin              =   function(name){
				var plugin;
				if($.isDefined(name)){
					var plugins	=	this.getParam('Plugins');
					plugin		=	plugins[name];
				}
				return plugin;
			};
						
			Fx.prototype.trigger                =   function(type){
				var $this  =   {type   :   getKeyEvents()+type};
				$this[$.getInjecteur('window')]    =   this.getParams();   
				
				var returne     =   $.event.trigger($this);                    
				if($.isNotNull(returne)){this.setParams(returne);}
				return this;
			};
			Fx.prototype.inject                 =   function(element, $params, name, clone){
				this.trigger('before.inject');		
				if($.isUndefined($params)){
					$params =   this.getParams();
				}
				if($.isUndefined(name)){
					name    =   this.getKey('injecteur');
				}
				if($.isUndefined(element)){
					element =   this.getParam('Element');
				}
				
				if($.isTrue(clone)){
					$params =   $.extend(true, true, {}, $params);
				}

				if($.isDefined(element)){
					element.data(name, $params);
                }
				this.trigger('after.inject');
				return this;
			};
			Fx.prototype.is                     =	function(name){
				return $.isTrue(this.get(name));
			};
			Fx.prototype.$                      =   function(selector){
				var dom;
				
				if($.isDefined(selector)){
					var doms    =   this.getParam('Dom');
					dom         =   doms[selector];
				}  
				return dom;
			};
	
			Fx.prototype.resize					=	function(){
				var width	=	$(document).width();
				width	-=	$(document).width() > $('body').width()	?	$.scrollWidth()	:	0;
				this.getLightbox().css({
					width   :  	width,
					height  :   $(document).height(),
				});
				return this;
			};
			Fx.prototype.isVisible				=	function(){
				return this.getLightbox().is(':visible');
			};
			Fx.prototype.removeStyle			=	function(){
				this.getLightbox().removeClass('default success error warning info notice iphone');
				this.getLightbox().removeClass(this.get('classs'));
				return this;
			};
			Fx.prototype.style					=	function(style){
				if($.isNotNull(this.get('style'))){
					this.removeStyle();
					this.getLightbox().addClass(this.get('style'));
				}
				return this;
			};   
			Fx.prototype.hide					=	function(connecteur){
				var control	=	true;
				this.removeConnecteur(connecteur);
				
				if(this.getTotalConnecteurs() ===  0){
					var timer	=	this.getLightbox().data($.getInjecteur('timer'));
					timer.Fx.setParams(timer);
					this.getLightbox().fadeOut(timer.Fx.getTime('closeLightbox'), this.destruct);
				}
				
				return this;
			};
			Fx.prototype.show					=	function(){				
				var defaultParams   =   this.getServiceManager()
											.getConfigurationManager()
											.get($.getInjecteur('lightbox'));

				var connecteurs;
				var key;
				var $params			=	$.extend(true, true, defaultParams, this.getParams());
				var style			=	$params.Fx.get('style');
				var	unique			=	$('.b-lightbox['+$.getPrefix('lightbox')+'key=unique]');

				if($.isNotNull(this.getParam('Element'))){
					if($.isNotNull(this.getParam('Element').data($.getInjecteur('lightbox')))){
						$params	=	this.getParam('Element').data($.getInjecteur('lightbox'));
						$params.Fx.setParams($params);
						$params.Fx.set('zindex', this.get('zindex'));
												
						connecteurs	=	this.getConnecteurs();
						for(key in connecteurs){
							$params.Fx.addConnecteur(connecteurs[key]);
						}
					}
					else{
						var defaultAttributes	=	this.getServiceManager()
														.getConfigurationManager()
														.getAttr($.getInjecteur('lightbox'));
													
						var attributes			=	$.extend(true, true, defaultAttributes, this.getParam('Attributes'));
					
						this.set('auto', this.getParam('Element').attr(attributes.auto));
					
						if(this.is('auto')){
							$params.Configuration   =   $.extend(true, true, $params.Configuration, this.getAutoConfiguration(attributes));
						}	
					}
					this.setParams($params);
				}
			
				if(this.is('multi')){
					if(unique.length > 0){
						unique	=	unique.data($.getInjecteur('lightbox'));
						unique.Fx.setParams(unique);
					
						if($('.b-window').length == 1){
							for(key in connecteurs){
								unique.Fx.addConnecteur(connecteurs[key]);
							}
						
							this.setParams(unique)
								.setLightbox(unique.Fx.getLightbox());
						}
						else{
							connecteurs	=	this.getConnecteurs();
							for(key in connecteurs){
								unique.Fx.removeConnecteur(connecteurs[key]);
							}
						}
					}
				}
				else{
					if($('.b-lightbox:visible').length > 0){					
						var lightbox	=	$('.b-lightbox:last').data($.getInjecteur('lightbox'));
						lightbox.Fx.setParams(lightbox);
						
						connecteurs	=	lightbox.Fx.getConnecteurs();
						
						this.setParams(lightbox)
							.setLightbox(lightbox.Fx.getLightbox());
												
						for(key in connecteurs){
							this.addConnecteur(connecteurs[key]);
						}
					}
					else if(unique.length == 0){
						this.setConnecteurs(this.getConnecteurs());
						this.setKey('id', 'unique');
					}
					else{
						unique	=	unique.data($.getInjecteur('lightbox'));
						unique.Fx.setParams(unique);
						connecteurs	=	this.getConnecteurs();
						for(key in connecteurs){
							unique.Fx.addConnecteur(connecteurs[key]);
						}
						this.setParams(unique)
							.setLightbox(unique.Fx.getLightbox());
					}
				}
				
				var timer			=	this.getServiceManager()
											.getPluginManager()
											.get('Timer', this.getPlugin('Timer'));
				timer	.Fx
						.setParam('Element', this.getParam('Element'))
						.set('auto', this.get('auto'))
						.set('zindex', this.get('zindex'))
						.initialize()
						.inject(this.getLightbox());			
						
				this.inject(this.getParam('Element'))
					.inject(this.getLightbox());

				this.getServiceManager()
					.css(this.get('css'), this.getLightbox())
					.addClass(this.get('classs'), this.getLightbox())
					.attr('id', this.get('id'), this.getLightbox());
				
				
				this.getLightbox()
					.html(this.get('value'))
					.css('z-index', this.get('zindex'))
					.addClass('b-lightbox')
					.attr($.getPrefix('lightbox')+'key', this.getKey('id'));
				
				this.set('style', style)
					.style()
					.resize()
					.inject(this.getLightbox());
				
				$('body').prepend(this.getLightbox());

				this.getLightbox().fadeIn(timer.Fx.getTime('showLightbox'), function(){
               var $this   =  $(this).data($.getInjecteur('lightbox'));
               $this.Fx.setParams($this);
               $this.Fx.trigger('end');
            });
				return this;
			};
			Fx.prototype.destruct						=	function(){
					var $this   =  $(this).data($.getInjecteur('lightbox'));
               $this.Fx.setParams($this);
               $(this).remove();
               $this.Fx.trigger('destruct');
					return this;
				};
				
			Fx.prototype.getTotalConnecteurs			=	function(){
				return this.getConnecteurs().length;
			};
			Fx.prototype.addConnecteur					=	function(connecteur){
				if($.isDefined(connecteur) && $.inArray(connecteur, this.getConnecteurs()) == -1){
					this.getConnecteurs().push(connecteur);
				}
				return this;
			};
			Fx.prototype.removeConnecteur				=	function(connecteur){
				if($.isDefined(connecteur)){
					if($.inArray(connecteur, this.getConnecteurs()) > -1){
						this.getConnecteurs().splice(this.getConnecteurs().indexOf(connecteur), 1);
					}
				}
				return this;
			};
			Fx.prototype.setConnecteurs					=	function(connecteurs){
				if($.isDefined(connecteurs)){
					this.set('connecteurs', connecteurs);
				}
				return this;
			};
			Fx.prototype.getConnecteurs					=	function(){
				if($.isNull(this.get('connecteurs'))){
					this.set('connecteurs', []);
				}
				return this.get('connecteurs');
			};
				
			Fx.prototype.setLightbox					=	function(lightbox){
				if($.isDefined(lightbox)){
					this.setParam('Dom',{
						lightbox	:	lightbox
					});
				}
				return this;
			};
			Fx.prototype.getLightbox					=	function(){
				if($.isNull(this.$('lightbox'))){
					this.setLightbox($(this.getTag('lightbox')));
				}
				return this.$('lightbox');
			};		
												
			this.initialized = true;
		}
	}
	function __construct(){
		$this	=	$.extend(true, true, {}, params);
		$this	=	$.extend(true, true, $this, $params);
		$this.Fx=	new Fx($this);
		return $this;
	}
	function getKeyEvents(){
		return $.getInjecteur('lightbox')+'.';
	}

	return __construct();
}

/**
* Bakar (http://www.bakar.be)
*
* B-Ajax
*
* @link         http://www.bakar.be
* @copyright    Copyright (c) 2005-2013 Bakar. (http://www.bakar.be)
* @version      26072014.1736
*/
function Ajax($params){
	var params	=	{
		Configuration	:	{},
		Keys			:	{
			injecteur	:	$.getInjecteur('ajax'),
			events		:	getKeyEvents(),
		},
		jQuery			:	this,
		Elements		:	$(this),
		Selector		:	$(this).selector,
	};
	
	function Fx(params){
		if($.isUndefined(this.initialized)){			
            Fx.prototype.setParams              =	function($params){
                if($.isDefined($params)){
                    params	=	$params;
                }
                return this;
            };
            Fx.prototype.getParams              =	function(){
                if($.isNull(params)){this.setParams({});}
                return params;
            };
            Fx.prototype.setParam               =   function(name, param){
                var $params =   this.getParams();
                $params[name]   =   param;
                this.setParams($params);
                return this;
            };
            Fx.prototype.getParam               =   function(name){
                $params =   this.getParams();
                var param;
                if($.isDefined(name)){
                    param   =   params[name];
                }
                return param;
            };
			
			Fx.prototype.setConfiguration       =   function(name, configuration){
                if($.isDefined(name) && $.isDefined(configuration)){
                    var configurations      =   this.getParam('Configuration');
                    configurations[name]    =   configuration;
                    this.setParam('Configuration', configurations);
                }
                return this;
            };
            Fx.prototype.getConfiguration       =   function(name){
                var configuration   =   null;
        
                if($.isDefined(name)){
                    var configurations  =   this.getParam('Configuration');
                    configuration       =   configurations[name];
                }
                return configuration;
            };
            Fx.prototype.set                    =   function(name, value){
                return this.setConfiguration(name, value);
            };
            Fx.prototype.get                    =   function(name){
                return this.getConfiguration(name);
            };
            
            Fx.prototype.setServiceManager      =   function(serviceManager){
                if($.isDefined(serviceManager)){
                    this.setParam('ServiceManager', serviceManager);
                }
                return this;
            };
            Fx.prototype.getServiceManager      =   function(){
                if($.isNull(this.getParam('ServiceManager'))){
                    this.setServiceManager(new ServiceManager());
                }
                return this.getParam('ServiceManager');
            };
            Fx.prototype.setService             =   function(service){
                return this.setServiceManager(service);
            };
            Fx.prototype.getService             =   function(){
                return this.getServiceManager();
            };
        
            Fx.prototype.setAutoConfiguration   =   function(autoConfiguration){
                if($.isDefined(autoConfiguration)){
                    this.setParam('AutoConfiguration', autoConfiguration);
                }
                return this;
            };
            Fx.prototype.getAutoConfiguration   =   function(attributes){
				if($.isNull(this.getParam('AutoConfiguration'))){
					this.setAutoConfiguration({
                        url			:	this.getParam('Element').attr(attributes.url), 
                        accepts     :	this.getParam('Element').attr(attributes.accepts), 
                        crossDomain :	this.getParam('Element').attr(attributes.crossDomain),
                        cache       :   this.getParam('Element').attr(attributes.cache),
                        contentType :	this.getParam('Element').attr(attributes.contentType),
                        async       :	this.getParam('Element').attr(attributes.async),
                        enctype     :	this.getParam('Element').attr(attributes.enctype),
                        method      :	this.getParam('Element').attr(attributes.method), 
                        dataType    :	this.getParam('Element').attr(attributes.dataType),
                        processData :   this.getParam('Element').attr(attributes.processData),
                        data        :   this.getParam('Element').attr(attributes.data),
                        breforeSend :   this.getParam('Element').attr(attributes.beforeSend),
                        success     :   this.getParam('Element').attr(attributes.success),
                        error       :   this.getParam('Element').attr(attributes.error),
                        complete    :   this.getParam('Element').attr(attributes.complete),
                        xhr         :   this.getParam('Element').attr(attributes.xhr),
                        keys	:	{
                            id  :   this.getParam('Element').attr(attributes.keys.id),
                        },
					});
                }  
				return this.getParam('AutoConfiguration');
            };

			Fx.prototype.setKey                 =   function(name, key){
				if($.isDefined(name) && $.isDefined(key)){
					var keys    =   this.getParam('Keys');
					keys[name]  =   key;
					this.setParam('Keys', keys);
				}
				return this;
			};
			Fx.prototype.getKey                 =   function(name){
				var key;
				if($.isDefined(name)){
					var keys    =   this.getParam('Keys');
					key         =   keys[name];
				}
				return key;
			};
			
			Fx.prototype.setTag                 =	function(name, tag){
				if($.isDefined(name) && $.isDefined(tag)){
					var tags	=	this.get('tags');
					tags[name]	=	tag;
					this.set('tags', tags);
				}
				return this;
			};
			Fx.prototype.getTag                 =	function(name){
				var tag;
				if($.isDefined(name)){
					var tags	=	this.get('tags');
					tag			=	tags[name];
				}
				return tag;
			};
			
			Fx.prototype.trigger                =   function(type){
				var $this  =   {type   :   getKeyEvents()+type};
				$this[$.getInjecteur('ajax')]    =   this.getParams();   
				
				var returne     =   $.event.trigger($this);                    
				if($.isNotNull(returne)){this.setParams(returne);}
				return this;
			};
			Fx.prototype.inject                 =   function(element, $params, name, clone){
                this.trigger('before.inject');
                if($.isUndefined($params)){
					$params =   this.getParams();
				}
				if($.isUndefined(name)){
					name    =   this.getKey('injecteur');
				}
				if($.isUndefined(element)){
					element =   this.getParam('Element');
				}
				
				if($.isTrue(clone)){
					$params =   $.extend(true, true, {}, $params);
				}
				
                if($.isDefined(element)){
					element.data(name, $params);
                }
				this.trigger('after.inject');
				return this;
			};
			Fx.prototype.is                     =	function(name){
				return $.isTrue(this.get(name));
			};
			Fx.prototype.$                      =   function(selector){
				var dom;
				
				if($.isDefined(selector)){
					var doms    =   this.getParam('Dom');
					dom         =   doms[selector];
				}  
				return dom;
			};	
			
			Fx.prototype.setRequest				=	function(request){
				this.set('request', request);
			}
			Fx.prototype.getRequest				=	function(){
				return this.get('request');
			}
			Fx.prototype.abort					=	function(){
				this.getRequest().abort();
				return this;
			}
			
			Fx.prototype.resetConfiguration		=	function(){
				this.setParam('Configuration', {});
				return this;
			};
			Fx.prototype.send					=	function(){
				var defaultAttributes	=	this.getServiceManager()
												.getConfigurationManager()
												.getAttr($.getInjecteur('ajax'));
					
				var defaultParams		=	this.getServiceManager()
												.getConfigurationManager()
												.get($.getInjecteur('ajax'));
							
				var $params		=	$.extend(true, true, defaultParams, this.getParams());
				var attributes	=	$.extend(true, true, defaultAttributes, this.getParam('Attributes'));
								
				if($.isNotNull(this.getParam('Element'))){
                    this.set('auto', this.getParam('Element').attr(attributes.auto));
                    if(this.is('auto')){
                        $params.Configuration   =   $.extend(true, true, $params.Configuration, this.getAutoConfiguration(attributes));
                    }
				}
					
				this.setParams($params)
					.setParam('Attributes', attributes)
					.inject();
				
				if($.isFalse(this.haveError())){
					var request	=	$.ajax(this.getParam('Configuration'));
					this.setRequest(request);
				}
				else{				
					this.getServiceManager()
						.triggerError('<p>Erreur les paramètres Ajax ne sont pas correctes</p>', {
							Configuration	:	{
								zindex	:	this.get('zindex'),
							},
						});				
				}
			};
			Fx.prototype.haveError				=	function(){
				var returne = false;
				if($.isNull(this.get('url'))){returne = true;}
				return returne;
			};
		
			this.initialized = true;
		}
	}
	
	function __construct(){	
		$this	=	$.extend(true, true, {}, params);
		$this	=	$.extend(true, true, $this, $params);
		$this.Fx=	new Fx($this);
		return $this;
	}
	function getKeyEvents(){
		return $.getInjecteur('ajax')+'.';
	}

	return __construct();
}

/**
* Bakar (http://www.bakar.be)
*
* B-Window
*
* @link         http://www.bakar.be
* @copyright    Copyright (c) 2005-2014 Bakar. (http://www.bakar.be)
* @version      26072014.1516
*/
(function($){
	$.fn.Window	=	function($$params){
		var params	=	{
			Keys			:	{
				injecteur	:	$.getInjecteur('window'),
				events		:	getKeyEvents(),
			},
			jQuery			:	this,
			Elements		:	$(this),
			Selector		:	$(this).selector,
		};
	
		function Fx(params){
			if($.isUndefined(this.initialized)){
                Fx.prototype.setParams              =	function($params){
                    if($.isDefined($params)){
                        params	=	$params;
                    }
                    return this;
                };
                Fx.prototype.getParams              =	function(){
                    if($.isNull(params)){this.setParams({});}
                    return params;
                };
                Fx.prototype.setParam               =   function(name, param){
                    var $params =   this.getParams();
                    $params[name]   =   param;
                    this.setParams($params);
                    return this;
                };
                Fx.prototype.getParam               =   function(name){
                    $params =   this.getParams();
                    var param;
                    if($.isDefined(name)){
                        param   =   params[name];
                    }
                    return param;
                };
				
				Fx.prototype.setConfiguration       =   function(name, configuration){
                    if($.isDefined(name) && $.isDefined(configuration)){
                        var configurations      =   this.getParam('Configuration');
                        configurations[name]    =   configuration;
                        this.setParam('Configuration', configurations);
                    }
                    return this;
                };
                Fx.prototype.getConfiguration       =   function(name){
                    var configuration   =   null;
            
                    if($.isDefined(name)){
                        var configurations  =   this.getParam('Configuration');
                        configuration       =   configurations[name];
                    }
                    return configuration;
                };
                Fx.prototype.set                    =   function(name, value){
                    return this.setConfiguration(name, value);
                };
                Fx.prototype.get                    =   function(name){
                    return this.getConfiguration(name);
                };
                
                Fx.prototype.setServiceManager      =   function(serviceManager){
                    if($.isDefined(serviceManager)){
                        this.setParam('ServiceManager', serviceManager);
                    }
                    return this;
                };
                Fx.prototype.getServiceManager      =   function(){
                    if($.isNull(this.getParam('ServiceManager'))){
                        this.setServiceManager(new ServiceManager());
                    }
                    return this.getParam('ServiceManager');
                };
                Fx.prototype.setService             =   function(service){
                    return this.setServiceManager(service);
                };
                Fx.prototype.getService             =   function(){
                    return this.getServiceManager();
                };
                
                Fx.prototype.setAutoConfiguration   =   function(autoConfiguration){
					if($.isDefined(autoConfiguration)){
                        this.setParam('AutoConfiguration', autoConfiguration);
                    }
                    return this;
                };
                Fx.prototype.getAutoConfiguration   =   function(attributes){
					if($.isUndefined(this.getParam('AutoConfiguration'))){
                        this.setAutoConfiguration({
                            classs      :   {
                                window  :   this.getParam('Element').attr(attributes.classs.window),
                                header  :   this.getParam('Element').attr(attributes.classs.header),
                                body	:	this.getParam('Element').attr(attributes.classs.body),
                                footer	:	this.getParam('Element').attr(attributes.classs.footer),	
                                title	:	this.getParam('Element').attr(attributes.classs.title),
                                close	:	this.getParam('Element').attr(attributes.classs.close),
                                refresh	:	this.getParam('Element').attr(attributes.classs.refresh),
                                reload	:	this.getParam('Element').attr(attributes.classs.reload),
                                compress:	this.getParam('Element').attr(attributes.classs.compress),
                                expand	:	this.getParam('Element').attr(attributes.classs.expand),
                                save	:	this.getParam('Element').attr(attributes.classs.save),
                            },
                            id          :   {
                                window	:	this.getParam('Element').attr(attributes.id.window),
                                header	:	this.getParam('Element').attr(attributes.id.header),
                                body	:	this.getParam('Element').attr(attributes.id.body),
                                footer	:	this.getParam('Element').attr(attributes.id.footer),
                                title	:	this.getParam('Element').attr(attributes.id.title),
                                close	:	this.getParam('Element').attr(attributes.id.close),
                                refresh	:	this.getParam('Element').attr(attributes.id.refresh),
                                reload	:	this.getParam('Element').attr(attributes.id.reload),
                                compress:	this.getParam('Element').attr(attributes.id.compress),
                                expand	:	this.getParam('Element').attr(attributes.id.expand),
                                save	:	this.getParam('Element').attr(attributes.id.save),                              
                            },
                            css         :   {
                                window	:	this.getParam('Element').attr(attributes.css.window),
                                header	:	this.getParam('Element').attr(attributes.css.header),
                                body	:	this.getParam('Element').attr(attributes.css.body),
                                footer	:	this.getParam('Element').attr(attributes.css.footer),	
                                title	:	this.getParam('Element').attr(attributes.css.title),
                                close	:	this.getParam('Element').attr(attributes.css.close),
                                refresh	:	this.getParam('Element').attr(attributes.css.refresh),
                                reload	:	this.getParam('Element').attr(attributes.css.reload),
                                compress:	this.getParam('Element').attr(attributes.css.compress),
                                expand	:	this.getParam('Element').attr(attributes.css.expand),
                                save	:	this.getParam('Element').attr(attributes.css.save),
                            },
                            events      :   this.getParam('Element').attr(attributes.events),
                            parse       :	this.getParam('Element').attr(attributes.parse),
                            zindex		:   this.getParam('Element').attr(attributes.zindex),
                            
                            position	:   this.getParam('Element').attr(attributes.position),
                            positionX	:   this.getParam('Element').attr(attributes.positionX),
                            positionY	:	this.getParam('Element').attr(attributes.positionY),
                            spaceX		:   this.getParam('Element').attr(attributes.spaceX),
                            spaceY		:	this.getParam('Element').attr(attributes.spaceY),
                            
                            style		:	this.getParam('Element').attr(attributes.style),
                            unique		:	this.getParam('Element').attr(attributes.unique),
                            
                            live		:	this.getParam('Element').attr(attributes.live),					
                            one			:	this.getParam('Element').attr(attributes.one),
                            adjust		:	this.getParam('Element').attr(attributes.adjust),
                            lightbox	:	this.getParam('Element').attr(attributes.lightbox),
                            silent		:	this.getParam('Element').attr(attributes.silent),
                            refresh		:	this.getParam('Element').attr(attributes.refresh),
                            compress	:	this.getParam('Element').attr(attributes.compress),
                            expand		:	this.getParam('Element').attr(attributes.expand),
                            footer		:	this.getParam('Element').attr(attributes.footer),
                            save		:	this.getParam('Element').attr(attributes.save),
                            
                            header		:	this.getParam('Element').attr(attributes.header),
                            title		:	this.getParam('Element').attr(attributes.title),
                            close		:	this.getParam('Element').attr(attributes.close),
                            fixed		:	this.getParam('Element').attr(attributes.fixed),
                            replace		:   this.getParam('Element').attr(attributes.replace),
                            draggable	:	this.getParam('Element').attr(attributes.draggable),
                            resizable	:	this.getParam('Element').attr(attributes.resizable),
							multiRefresh:	this.getParam('Element').attr(attributes.multiRefresh),
                        });
                    } 
					return this.getParam('AutoConfiguration');
                };
                
				Fx.prototype.resetData				=	function(){
					this.getData('values').body	=	null;
					this.getData('values').html	=	null;
					return this;
				}
                Fx.prototype.setAutoData            =   function(autoData){
                    if($.isDefined(autoData)){
                        this.setParam('AutoData', autoData);
                    }
                    return this;
                };
                Fx.prototype.getAutoData            =   function(attributes){
					if($.isNull(this.getParam('AutoData'))){
                        this.setAutoData({
                            values  :   {
								window	:	this.getParam('Element').attr(attributes.values.window),
								header	:	this.getParam('Element').attr(attributes.values.header),
								footer	:	this.getParam('Element').attr(attributes.values.footer),
								title	:	this.getParam('Element').attr(attributes.values.title),
								body	:   this.getParam('Element').attr(attributes.values.body),
								close	:   this.getParam('Element').attr(attributes.values.close),
								refresh	:   this.getParam('Element').attr(attributes.values.refresh),
								reload	:	this.getParam('Element').attr(attributes.values.reload),
								compress:	this.getParam('Element').attr(attributes.values.compress),
								expand	:	this.getParam('Element').attr(attributes.values.expand),
								save	:	this.getParam('Element').attr(attributes.values.save),
                            },   
                            request	:	this.getParam('Element').attr(attributes.request),
                            state   :	this.getParam('Element').attr(attributes.state),
                        });
                    }
                    return this.getParam('AutoData');
                };
				Fx.prototype.setDefaultData         =   function(defaultData){
                    if($.isDefined(defaultData)){
                        this.setParam('DefaultData', defaultData);
                    }
                    return this;
				};
				Fx.prototype.getDefaultData         =   function(){
                    if($.isNull(this.getParam('DefaultData'))){
                        this.setDefaultData({
                            values      :   {
                                title	:	'B-window by Bakar',
                                header	:	'',
                                close	:	'<span class="fa fa-times"></span>',
                                refresh	:	'<span class="fa fa-refresh"></span>',
                                reload	:   '<span class="fa fa-random"></span>',
                                footer	:	'',
                                body	:	'',
                                compress:	'<span class="fa fa-compress"></span>',
                                expand	:	'<span class="fa fa-expand"></span>',
                                save	:	'<span class="fa fa-download"></span>',    
                            },
                            state       :   'success',
                            html		:	null,
                            json		:	null,	
                            text		:	null,
                            xml			:	null,	
                            requestState:	null,
                            response	:	null,
                        });
                    }
                    return this.getParam('DefaultData');
				};                
                Fx.prototype.setData				=	function(name, value){
                    if($.isDefined(name) && $.isDefined(value)){
                        var datas   =   this.getParam('Data');
                        datas[name] =   value;
                        this.setParam('Data', datas);
                    }
                    return this;
                };
                Fx.prototype.getData				=	function(name){
                    var data    =   null;
                    if($.isDefined(name)){
                        var datas   =   this.getParam('Data');
                        data        =   datas[name];
                    }
					return data;
                };
                
                Fx.prototype.setKey                 =   function(name, key){
                    if($.isDefined(name) && $.isDefined(key)){
                        var keys    =   this.getParam('Keys');
                        keys[name]  =   key;
                        this.setParam('Keys', keys);
                    }
                    return this;
                };
                Fx.prototype.getKey                 =   function(name){
                    var key;
                    if($.isDefined(name)){
                        var keys    =   this.getParam('Keys');
						key         =   keys[name];
					}
                    return key;
                };
            
                Fx.prototype.setTag                 =	function(name, tag){
                    if($.isDefined(name) && $.isDefined(tag)){
                        var tags	=	this.get('tags');
                        tags[name]	=	tag;
                        this.set('tags', tags);
                    }
                    return this;
                };
                Fx.prototype.getTag                 =	function(name){
                    var tag;
                    if($.isDefined(name)){
                        var tags	=	this.get('tags');
                        tag			=	tags[name];
                    }
                    return tag;
                };
                
                Fx.prototype.setPlugin              =	function(name, plugin){
                    if($.isDefined(name) && $.isDefined(plugin)){
                        var plugins		=	this.getParam('Plugins');
                        plugins[name]	=	plugin;
                        this.setParam('Plugins', plugins);
                    }
                    return this;
                };	
                Fx.prototype.getPlugin              =   function(name){
                    var plugin;
                    if($.isDefined(name)){
                        var plugins	=	this.getParam('Plugins');
                        plugin		=	plugins[name];
                    }
                    return plugin;
                };
                
                Fx.prototype.setTotalWindow         =   function(totalWindow){
                    if($.isDefined(totalWindow)){
                        this.set('totalWindow', totalWindow);
                    }
                    return this;
                };
                Fx.prototype.getTotalWindow			=	function(visible){
                    var totalWindow =   $.isTrue(visible)   ?   $('.b-window:visible')  :  $('.b-window').length;
                    this.setTotalWindow(totalWindow);
                    return totalWindow;
                };
                
				Fx.prototype.setResponse			=	function(response){
					if($.isDefined(response)){
						var data		=	this.getParam('Data');
						data.response	=	response;
					}
					return this;
				}
				Fx.prototype.getResponse			=	function(key){
					var response	=	this.getParam('Data').response;
					if($.isDefined(key) && $.isNotNull(response)){
						response	=	response[key];
					}
					return	response;
				}
				
                Fx.prototype.setDefaults			=	function(defaults){
					if($.isDefined(defaults)){
						this.setParam('Defaults', defaults);
					}
					return this;
				};
				Fx.prototype.getDefaults			=	function(){
					if($.isNull(this.getParam('Defaults'))){
						this.setDefaults({});
					}
					return this.getParam('Defaults');
				};
				Fx.prototype.setDefault				=	function(name, value){	
					if($.isDefined(name) && $.isDefined(value)){
						var defaults	=	this.getDefaults();
						defaults[name]	=	value;
						this.setDefaults(defaults);
					}
					return this;
				};
				Fx.prototype.getDefault				=	function(name){
					if($.isDefined(name)){
						var defaults	=	this.getDefaults();
						defaut			=	defaults[name];
					}
					return defaut;
				};

				Fx.prototype.getLoading				=	function(){
					var defaultConfigurationSpinner =   this.getServiceManager()
                                                            .getConfigurationManager()
                                                            .get('Spinner');

					var configurationSpinner		=	$.extend(true, true, defaultConfigurationSpinner, this.getPlugin('Spinner'));	
					var spinner                     =	new Spinner(configurationSpinner);
					spinner                         =	spinner.spin();
					
					var containerSpinner	=	$('<div class="container-spinner"></div>');
					containerSpinner.append(spinner.el);
					
					var loading				=	$('<div class="b-loading"><p class="center">Chargement en cours...</p></div>');
					loading.append(containerSpinner);
					return loading;
				}
				
                Fx.prototype.initialize             =	function(){
					this.trigger('before.initialize');
                    var defaultParams       =   this    .getServiceManager()
                                                        .getConfigurationManager()
                                                        .get($.getInjecteur('window'));
                                                            
                    var defaultAttributes   =   this    .getServiceManager()
                                                        .getConfigurationManager()
                                                        .getAttr($.getInjecteur('window'));
    
					var $params                 =   $.extend(true, true, defaultParams, this.getParams());
					var attributes              =   $.extend(true, true, defaultAttributes, this.getParam('Attributes'));
					var data                    =   $.extend(true, true, this.getDefaultData(), this.getParam('Data'));

					if($.isNotNull(this.getParam('Element'))){
						this.set('auto', this.getParam('Element').attr(attributes.auto));                        
						if(this.is('auto')){
							$params.Configuration   =   $.extend(true, true, $params.Configuration, this.getAutoConfiguration(attributes));
                            data                    =   $.extend(true, true, data, this.getAutoData(attributes));
                       }			
					}

					this.setParams($params)
                        .setParam('Attributes', attributes)
                        .setParam('Data', data)
                        .inject()
						.initEvents();
					
					this.trigger('after.initialize');
					return this;
				};
                Fx.prototype.initEvents             =   function(){
                    if(this.is('dynamic')){
						return this;
					}
					var selector	=	this.getParam('Selector')+'['+$.getPrefix('window')+'one-'+this.get('events')+'!='+this.get('events')+']['+$.getPrefix('window')+'on-'+this.get('events')+'!='+this.get('events')+']';
					if(this.is('one')){
						$('body').off(this.get('events'), selector, begin);
                        this.getParam('Element')
                            .one(this.get('events'), begin)
                            .attr($.getPrefix('window')+'one-'+this.get('events'), this.get('events'));

                        if(this.is('live')){
                            $('body').on(this.get('events'), selector, begin);
                        }
                    }
                    else if(this.is('live')){												
						$('body').off(this.get('events'), selector, begin);
                        $('body').on(this.get('events'), selector, begin);
                    }
                    else{
                        $('body').off(this.get('events'), selector, begin);

                        this.getParam('Element')
                            .on(this.get('events'), begin)
                            .attr($.getPrefix('window')+'on-'+this.get('events'), this.get('events'));
	
                        if(this.is('live')){
                            $('body').on(this.get('events'), selector, begin);
                        }
                    }
                    return this;
                };
				Fx.prototype.trigger                =   function(type){
                    var $this  =   {type   :   getKeyEvents()+type};
                    $this[$.getInjecteur('window')]    =   this.getParams();   
                    
                    var returne     =   $.event.trigger($this);                    
                    if($.isNotNull(returne)){this.setParams(returne);}
                    return this;
                };
                Fx.prototype.inject                 =   function(element, $params, name, clone){
					this.trigger('before.inject');		
                    if($.isUndefined($params)){
                        $params =   this.getParams();
                    }
                    if($.isUndefined(name)){
                        name    =   this.getKey('injecteur');
                    }
                    if($.isUndefined(element)){
                        element =   this.getParam('Element');
                    }
                    
                    if($.isTrue(clone)){
                        $params =   $.extend(true, true, {}, $params);
                    }

					if($.isDefined(element)){
						element.data(name, $params);
					}
					this.trigger('after.inject');
                    return this;
                };
                Fx.prototype.is                     =	function(name){
                    return $.isTrue(this.get(name));
                };
                Fx.prototype.$                      =   function(selector){
                    var dom;
                    
                    if($.isDefined(selector)){
                        var doms    =   this.getParam('Dom');
                        dom         =   doms[selector];
                    }  
                    return dom;
                };

                Fx.prototype.start                  =	function(){
					this.trigger('before.start');
					if(!$.isTrue(this.getParam('Element').data('lock'))){
						if($.isNotNull(this.get('events'))){
							this.getParam('Element').data('lock', true);
						}
						this.construct();
                    }
                    else{
						this.getServiceManager().triggerInfo('<p>Information : cette fenêtre est déjà en cours de chargement...</p>',{
							Configuration	:	{
								zindex	:	this.get('zindex'),
							},
						});
                    }
                    this.trigger('after.start');
                    return this;
                };
                Fx.prototype.construct              =	function(){
					this.trigger('before.construct');
					this.setParam('Dom',{
                        window	:	$(this.getTag('window')),
                        header	:	$(this.getTag('header')),
                        body	:	$(this.getTag('body')),
                        footer	:   $(this.getTag('footer')),
                        close	:	$(this.getTag('close')),
                        refresh	:	$(this.getTag('refresh')),
                        reload	:	$(this.getTag('reload')),
                        compress:	$(this.getTag('compress')),
                        expand	:	$(this.getTag('expand')),
                        save	:	$(this.getTag('save')),
                        title	:	$(this.getTag('title')),
                    })
					.injectEvent('close', this.$('close'))
                    .injectEvent('reload', this.$('reload'))
                    .injectEvent('refresh', this.$('refresh'))
                    .injectEvent('compress', this.$('compress'))
                    .injectEvent('expand', this.$('expand'))
                    .injectEvent('save', this.$('save'))
                    .injectEvent('superpose', this.$('window'))
					.inject(this.$('window'))
                    .decore()
					.getServiceManager()
					.hide(this.$('header'))
					.hide(this.$('title'))
					.hide(this.$('close'))
					.hide(this.$('footer'))
					.hide(this.$('refresh'))
					.hide(this.$('reload'))
					.hide(this.$('compress'))
					.hide(this.$('expand'))
					.hide(this.$('save'));

                    this.append()
                        .trigger('after.construct');
					return this;
                };
                Fx.prototype.injectEvent            =   function(evt, element, clone){
                    this.trigger('before.injectEvent');
       
                    switch(evt){
                        case 'close':
						var events	=	$._data(element, 'events');
						
						if($.isUndefined(events) || element.attr($.getPrefix('window')+'event') != evt ){
							element.on('click', this.close);
						}
						break;
						
						case 'expand':
						if(element.attr($.getPrefix('window')+'event') != evt){
							element.on('click', this.expand);
						}
						break;
						
						case 'compress':
						if(element.attr($.getPrefix('window')+'event') != evt){
							element.on('click', this.compress);
						}
						break;
						
						case 'refresh':
						if(element.attr($.getPrefix('window')+'event') != evt){
							element.on('click', this.refresh);
						}
						break;
						
						case 'save':
						if(element.attr($.getPrefix('window')+'event') != evt){
							element.on('click', this.save);
						}
						break;
						
						case 'superpose':
						if(element.attr($.getPrefix('window')+'event') != evt){
							element.on('mousedown', this.superpose);
						}
						break;
						
						case 'reload':
						if(element.attr($.getPrefix('window')+'event') != evt){
							element.on('click', this.reload);
						}
						break;
                    }
					element.attr($.getPrefix('window')+'event', evt);
                    this.trigger('after.injectEvent');
                    return this;
                };
                Fx.prototype.append					=	function(){
                    this.trigger('before.append');					
					if(this.getData('state') == 'success'){                
						this.show('header')
                            .show('footer')
                            .show('title')
                            .show('close')
                            .show('reload')
                            .show('refresh')
                            .show('compress')
                            .show('expand')
                            .show('save');
                        
                        this.$('header')
                            .append(this.$('close'))
                            .append(this.$('expand'))
                            .append(this.$('compress'))
                            .append(this.$('refresh'))
                            .append(this.$('reload'))
                            .append(this.$('save'))
                            .append(this.$('title'));

                        this.$('window')
                            .append(this.$('header'))
                            .append(this.$('body'))
                            .append(this.$('footer'))
                            .css('z-index', this.getTotalWindow() + this.get('zindex'));
                        
                        this.unique();
                    }
                    else{
                        this.getServiceManager().triggerError(getMessage('error'), this.getParams());
                    }
                    this.trigger('after.append');
                    return this;
                };
                Fx.prototype.show                   =   function(element){
					if($.isTrue(this.get(element))){
                        this.getServiceManager().show(this.$(element));
                    }
                    return this;
                };
                Fx.prototype.unique                 =   function(){
                    this.trigger('before.unique');
                    if($.isNotNull(this.get('unique'))){
                        if($('#'+this.get('unique')).length > 0){
							$('#'+this.get('unique')).click();
							this.end();
						}
						else{
							$('body').append(this.$('window'));
							this.loadData();
						}
					}
                    else{
                        $('body').append(this.$('window'));
						this.loadData();
                    }
                    this.trigger('after.unique');
                    return this;
                };
                Fx.prototype.superpose				=	function(evt){
					var target;
					
					$.is$(evt)	?	target	=	evt	:	target	=	$(evt.currentTarget);
					
					var $this	=	target.data($.getInjecteur('window'));
					$this	.Fx
							.setParams($this)
							.trigger('before.superpose');
				
                    var index   =   $this.Fx.getTotalWindow() - 1;
					var current	=	$this.Fx.get('zindex');
					
					index		=	parseInt(index, 10);
					current		=	parseInt(current, 10);
													
					if(target.css('z-index') < index + current){
						middle = target.css('z-index');
						
						$('.b-window').each(function(){
							var window	=	$(this);
							if(window.is(target)){
								target.css('z-index', index + current);
							}
							else{
								var pos	=	window.css('z-index');
								if(pos > middle){
									window.css('z-index', pos-1);
								}
							}
						});
					}
					
					$this.Fx.trigger('after.superpose');
					
                    return $this;
                };
                Fx.prototype.loadData               =   function(){
                    this.trigger('before.loadData');
					if(this.is('loading') && this.$('body').children('.b-loading').length === 0){
                        this.setData('request', 'LOADING')
                            .parse();
                    }
                    else{
						if(this.is('ajax')){
                            var ajax;
                            
                            if($.isUndefined(this.getParam('Element').data($.getInjecteur('ajax')))){
                                ajax	=	this.getServiceManager()
												.getPluginManager()
												.get('Ajax', this.getPlugin('Ajax'));
									
								ajax.Fx
									.setParam('Element', this.getParam('Element'))
									.set('auto', this.get('auto'))
									.setKey('id', this.getKey('id'))
									.set('error', this.errorAjax)
									.set('beforeSend', this.beforeSendAjax)
									.set('complete', this.completeAjax)
									.set('error', this.errorAjax)
									.set('success', this.successAjax)
									.set($.getInjecteur('window'), this.getParams());
							
							}
							else{
                                ajax    =   this.getParam('Element').data($.getInjecteur('ajax'));
								ajax.Fx.setParams(ajax)
									.setParam('Element', this.getParam('Element'))
									.set('auto', this.get('auto'))
									.setKey('id', this.getKey('id'))
									.set('error', this.errorAjax)
									.set('beforeSend', this.beforeSendAjax)
									.set('complete', this.completeAjax)
									.set('error', this.errorAjax)
									.set('success', this.successAjax)
									.set($.getInjecteur('window'), this.getParams());
							}
							if(this.is('reloaded')){ajax.Fx.inject(this.getParam('Element'));}
							else{ajax.Fx.inject(this.$('window'));}
							ajax.Fx.send();
							this.set('request', ajax.Fx.getRequest());
						}
						else{
							this.setData('request', 'STANDARD')
								.parse();
						}
					}
					this.trigger('after.loadData');
					return this;
				};
                Fx.prototype.parse					=	function(test){									
                    this.trigger('before.parse');
					if(this.getData('request') == 'LOADING'){                      
                        this.getData('values').loading	=	this.getLoading();
                    }
                    else{						
						if($.isPlainObject(this.getData('response'))){
							var data	=	$.extend(true, true, this.getParam('Data'), this.getData('response'));
							this.setParam('Data', data);
							if($.isNotNull(this.getData('response').html)){
								this.getData('values').body = this.getData('response').html;
                            }			
							if($.isDefined(this.getData('response').style)){
								this.set('style', this.getData('response').style);
							}
							if($.isDefined(this.getData('response').replace)){
								this.set('replace', this.getData('response').replace);
							}
							if($.isDefined(this.getData('response').classs)){
								this.set('classs', this.getData('response').classs);
							}
						}
                        else if($.isNotNull(this.getData('response'))){
                            this.getData('values').body	=	this.getData('response');
                        }
                        else{
                            //console.log('STANDARD REQUEST');
                        }
                    }

                    this.bindData();
                    this.trigger('after.parse');
                    return this;
                };
                Fx.prototype.bindData				=	function(){
					this.trigger('before.bindData');
					this.$('close').html(this.getData('values').close);
                    this.$('reload').html(this.getData('values').reload);
                    this.$('refresh').html(this.getData('values').refresh);
                    this.$('save').html(this.getData('values').save);
                    this.$('compress').html(this.getData('values').compress);
                    this.$('expand').html(this.getData('values').expand);
                    this.$('footer').html(this.getData('values').footer);
                    
					switch(this.get('parse')){
                        case 'text':
						this.$('body').text(this.getData('values').body);
                        this.$('title').text(this.getData('values').title);
                        break;
					

                        default:
						//this.$('title').html(this.getData('values').title);
						if(this.$('body').children('.b-loading').length > 0){
							var loading	=	this.$('body').children('.b-loading');
							var timer   =   this.getServiceManager()
												.getPluginManager()
												.get('Timer', this.getPlugin('Timer'));
														
							timer   .Fx
									.setParam('Element', this.getParam('Element'))
									.set('auto', this.get('auto'))
									.initialize()
									.inject(this.$('window'));
									
							this.inject(this.$('window'));
				
							loading.fadeOut(timer.Fx.getTime('closeLoading'), function(){
								var loading	=	$(this);
								var parent	=	loading.parents('.b-window');
								$this		=	parent.data($.getInjecteur('window'));
								var css		=	{opacity :   0};
							
								$this.Fx.setParams($this);						
																
								//$($this.Fx.getData('values').body).css(css);
								//$($this.Fx.getData('values').title).css(css);
								
								$this	.Fx.$('body')
										.html($this.Fx.getData('values').body);
										
								$this.Fx.$('title').html($this.Fx.getData('values').title);
								
								//$($this.Fx.getData('values').body).fadeIn();
								//$($this.Fx.getData('values').title).fadeIn();
								
								$this	.Fx
										.position()
										.style()
										.showWindow();
							});
						}
						else{
							if(this.is('loading')){
								this.$('body').html(this.getData('values').loading);
							}
							else{
								this.$('body').html(this.getData('values').body);
								
								if(this.is('replace')){
									this.$('title').html(this.getData('values').title);
								}
							}
							
							this.style()
								.showWindow();
						}
						break;
					}
				
					this.trigger('after.bindData');
					return this;
				};
                Fx.prototype.style					=	function(){
					this.trigger('before.style');
					var title	=	this.getData('values').title;
					var style	=	this.get('style');
								
					switch(style){
                        case 'error':
                        title   =   '<span class="glyphicon glyphicon-remove-circle"></span> Error';
                        break;
                        
                        case 'info':
                        title	=   '<span class="glyphicon glyphicon-info-sign"></span> Information';
                        //style lightbox
                        break;
                        
                        case 'success':
                        title	=   '<span class="glyphicon glyphicon-ok"></span> Success';
                        //style lightbox
                        break;
                        
                        case 'warning':
                        title	=   '<span class="glyphicon glyphicon-warning-sign"></span> Warning';
                        break;
                        
                        case 'default':
                        title	=	'B-window by Bakar';
                        break;
                        
                        case 'notice':
                        title	=	'Notice';
                        break;
                        
                        case 'none':
                        break;
                        
                        default:		
                        style;			
						break;
                    }
					
					
					if($.isNotNull(style)){
						this.removeStyle()
                            .getServiceManager()
							.addClass(style, this.$('window'))
							.addClass(style, this.$('body'))
                            .addClass(style, this.$('header'))
                            .addClass(style, this.$('footer'));
                    }
										
					if(this.is('replace')){
						var values	=	this.getResponse('values');
						if($.isNotNull(values) && $.isNotNull(values.title)){
							title	=	values.title;
						}
						this.getData('values').title	=	title;
						this.$('title').html(title);
					}
					
					this.trigger('after.style');
					return this;
				};
				Fx.prototype.removeStyle			=	function(){
					this.trigger('before.removeStyle');
					//var style	=	'success info warning default notice error iphone';
					
					this.$('window').removeAttr('class').addClass('b-window');
					this.$('header').removeAttr('class').addClass('header');
					this.$('footer').removeAttr('class').addClass('footer');
					this.$('body').removeAttr('class').addClass('body');

					//this.$('window').removeClass(style);
					//this.$('header').removeClass(style);
					//this.$('footer').removeClass(style);
					//this.$('body').removeClass(style);
					//this.$('header').removeClass(this.get('classs').header);
					//this.$('footer').removeClass(this.get('classs').footer);
					//this.$('body').removeClass(this.get('classs').body);
					this.trigger('after.removeStyle');
					return this;
				};
				Fx.prototype.drag					=	function(){
					var defautDraggable		=	this.getServiceManager()
                                                    .getConfigurationManager()
                                                    .get('Draggable');
                        
                    var	draggable           =   $.extend(true, true, defautDraggable, this.getPlugin('Draggable'));
                    $(draggable.handle).css('cursor', 'move');
                        
                    this.$('window').draggable(draggable);
					return this;
				}
				Fx.prototype.showWindow				=	function(){
					this.$('window').get(0).style.width = '';
					this.$('window').get(0).style.height= '';
					this.$('body').get(0).style.width = '';
					this.$('body').get(0).style.height= '';
					
					this.trigger('before.showWindow');		
					
					if(this.is('lightbox')){								
						if($.isDefined(this.getPlugin('Lightbox').Fx)){
							var lightbox	=	this.getPlugin('Lightbox');
							var zindex		=	lightbox.Fx.get('zindex');
						}
						else{
							var lightbox	=	this.getServiceManager()
													.getPluginManager()
													.get('Lightbox', this.getPlugin('Lightbox'));
							var zindex		=	this.get('zindex') + (this.getTotalWindow() -1);
						}
						
						
						
						lightbox	.Fx
									.setParam('Element', this.getParam('Element'))
									.set('auto', this.get('auto'))
									.set('zindex', zindex)
									.set('style', this.get('style'))
									.addConnecteur(this.getKey('id'))
									.show()
									.inject(this.$('window'));
						
					}
					if(this.is('resizable')){
						var defautResizable		=	this.getServiceManager()
                                                        .getConfigurationManager()
                                                        .get('Resizable');
																		
						var resizable			=	$.extend(true, true, defautResizable, this.getPlugin('Resizable'));
						resizable.alsoResize	=	this.$('body');
						this.$('window').resizable(resizable);
					}			
					if(!this.is('silent')){					
						this.position();
						
						if($.isFalse(this.$('window').is(':visible'))){							
							this.$('body').css('display', '');
							this.$('window').css({
								display	:	'block',
								opacity	:	0,
							});							
														
							this.$('window').animate(this.get('animate'), function(){
								var target	=	$(this);
								var $this	=	target.data($.getInjecteur('window'));
								$this.Fx.setParams($this);
								$this.Fx.position();
							});
						}
						else{	
							this.position();
							this.$('window').animate(this.get('animate'), function(evt){
								var target	=	$(this);
								var $this	=	target.data($.getInjecteur('window'));
								$this.Fx.setParams($this);
								$this.Fx.position();
							});
						}
					}					
					if(this.is('adjust')){
						/*
						if(this.$(window).width() > $('body').width()){
							var width	=	$(window).width() / 1.2;
							this.$('body').css('width', width);
							this.position();
						};
						
						if(this.$('window').height() > $('body').height()){
							var height	=	$(window).height() / 1.2
							console.log(height);
							this.$('body').css('height', height);
							this.position();
						}
						
						this.$('body').css('overflow', 'auto');
						*/
					}
					if(this.is('draggable')){
                    	this.drag();
					}
					this.end();
					this.trigger('after.showWindow');
					return this;
				};
				Fx.prototype.position				=	function(){
					this.trigger('before.position');
					this.fixed();
								
					var spaceX						=	$('.b-window').index(this.$('window')) * parseInt(this.get('spaceX'), 10);
					var spaceY						=	$('.b-window').index(this.$('window')) * parseInt(this.get('spaceY'), 10);
															
					var elementWidth				=	this.$('window').outerWidth();
					var elementHeight				=	this.$('window').outerHeight();
										
                    var px                          =	0;
                    var py                          =	0;					
						
					var scrollTop					=	$(window).scrollTop();
					var viewWidth					=	$(window).width();
					var viewHeight					=	$(window).height();
					
					this.set('positionX', parseInt(this.get('positionX'), 10))
						.set('positionY', parseInt(this.get('positionY'), 10));

					if($.isSmartphone()){viewHeight	>	screen.height	?	viewHeight = screen.height : null;}
					
					switch(this.get('position')){
						case 'top left':
						px  =   0;
						py  =   scrollTop;
						break;
						
						case 'top right':
						px  =   viewWidth - elementWidth;
						py  =   scrollTop;
						break;
						
						case 'top':
						px  =   (viewWidth - elementWidth) / 2; 
						py  =   scrollTop;
						break;
						
						case 'center left':
						px	=	0;
						py  =   scrollTop + ((viewHeight - elementHeight) / 2);
						break;
						
						case 'center right':
						px	=	viewWidth - elementWidth;
						py  =   scrollTop + ((viewHeight - elementHeight)/2);
						break;
						
						case 'center':
						px		=	(viewWidth - elementWidth) / 2;
						py      =   scrollTop + ((viewHeight - elementHeight) / 2);
						break;
						
						case 'bottom left':
						px  =   0;
						py  =   scrollTop + (viewHeight - elementHeight);
						break;
						
						case 'bottom right':
						px	=	viewWidth - elementWidth;
						py  =   scrollTop + (viewHeight - elementHeight);
						break;
						
						case 'bottom':
						px	=	(viewWidth - elementWidth) / 2;
						py	=	scrollTop + (viewHeight - elementHeight);
						break;
						
						default :
						px	=	0;
						py	=	0;
						break;
					}
					
					px	=	px + this.get('positionX') + spaceX;
					py	=	py + this.get('positionY') + spaceY;
					
					if(py < scrollTop || elementHeight > viewHeight){
						py = scrollTop;
					}
					
					if(this.is('fixed')){py = py - scrollTop;}
					
					this.$('window').css({
						left	:	px,
						top		:	py,
					});
					
					this.trigger('after.position');
					return this;
				};
                Fx.prototype.fixed					=	function(){
					this.trigger('before.fixed');
					if(this.is('fixed')){
						this.$('window').css({
							position	:	'fixed',
							top			:	this.$('window').offset().top - $(window).scrollTop(),
						});
					}
					this.trigger('after.fixed');
					return this;
				};
				Fx.prototype.end					=	function(){
					this.$('close').focus();
					if(this.getData('request') == 'LOADING'){
						this.loadData();
					}
					else{
						this.position()
							.trigger('end');
					}
				};
				Fx.prototype.destruct				=	function(){
					var $this	=	$(this).data($.getInjecteur('window'));
					var lightbox=	$(this).data($.getInjecteur('lightbox'));
					$this.Fx.setParams($this);
																				
					$this.Fx.trigger('before.destruct');
					$(this).remove();
										
					if($this.Fx.is('lightbox')){
						lightbox.Fx.setParams(lightbox);
						lightbox.Fx.hide($this.Fx.getKey('id'));
					}
										
					$this.Fx.trigger('after.destructWindow');
					return $this;
				};
				Fx.prototype.decore					=	function(){
					this	.getServiceManager()
							.css(this.get('css').window, this.$('window'))
							.css(this.get('css').header, this.$('header'))
							.css(this.get('css').body, this.$('body'))
							.css(this.get('css').footer, this.$('footer'))
							.css(this.get('css').close, this.$('close'))
							.css(this.get('css').refresh, this.$('refresh'))
							.css(this.get('css').reload, this.$('reload'))
							.css(this.get('css').compress, this.$('compress'))
							.css(this.get('css').expand, this.$('expand'))
							.css(this.get('css').save, this.$('save'))
							.css(this.get('css').title, this.$('title'))
							.addClass(this.get('classs').window, this.$('window'))
							.addClass(this.get('classs').header, this.$('header'))
							.addClass(this.get('classs').body, this.$('body'))
							.addClass(this.get('classs').footer, this.$('footer'))
							.addClass(this.get('classs').close, this.$('close'))
							.addClass(this.get('classs').refresh, this.$('refresh'))
							.addClass(this.get('classs').reload, this.$('reload'))
							.addClass(this.get('classs').compress, this.$('compress'))
							.addClass(this.get('classs').expand, this.$('expand'))
							.addClass(this.get('classs').save, this.$('save'))
							.addClass(this.get('classs').title, this.$('title'))
							.attr('id', this.get('id').window, this.$('window'))
							.attr('id', this.get('id').header, this.$('header'))
							.attr('id', this.get('id').body, this.$('body'))
							.attr('id', this.get('id').footer, this.$('footer'))
							.attr('id', this.get('id').close, this.$('close'))
							.attr('id', this.get('id').refresh, this.$('refresh'))
							.attr('id', this.get('id').reload, this.$('reload'))
							.attr('id', this.get('id').compress, this.$('compress'))
							.attr('id', this.get('id').expand, this.$('expand'))
							.attr('id', this.get('id').save, this.$('save'))
							.attr('id', this.get('id').title, this.$('title'))
							.attr($.getPrefix('window')+'key', this.getKey('id'), this.$('window'));
							
							this.$('window').addClass('b-window');
							this.$('header').addClass('header');
							this.$('body').addClass('body');
							this.$('footer').addClass('footer');
							this.$('title').addClass('b-title');
							this.$('close').addClass('b-close');
							this.$('refresh').addClass('b-refresh');
							this.$('reload').addClass('b-reload');
							this.$('compress').addClass('b-compress');
							this.$('expand').addClass('b-expand');
							this.$('save').addClass('b-save');                            
							
							if($.isNotNull(this.get('unique'))){
								this.getServiceManager().attr('id', this.get('unique'), this.$('window'));
							}
					return this;
				}
				
				Fx.prototype.successAjax			=	function(response, state, jqXhr){
					var injecteur	=	$.getInjecteur('window');
					var $this		=	jqXhr[injecteur];
					$this.Fx.setParams($this);

					$this.Fx.trigger('before.successAjax');

					$this	.Fx
							.resetData()
							.setData('request', 'AJAX')
							.setData('response', response)
							.setData('requestState', state)
							.parse();
					
					$this.Fx.trigger('after.successAjax');
					return $this;
				};
				Fx.prototype.errorAjax				=	function(jqXhr, error, exception){
					var $this		=	jqXhr[$.getInjecteur('window')];
					var	response	=	{
						html	:	error,
					};
					var data			=	$.extend(true, true, {}, $this.Fx.getParam('Data'));
					var configuration	=	$.extend(true, true, {}, $this.Fx.getParam('Configuration'));
					var element			=	$this.Fx.getParam('Element');
					
					$this	.Fx
							.setData('response', response)
							.setData('request', 'AJAX')
							.setData('requestState', false)
							.setDefault($.getInjecteur('window')+'.Element', element)
							.setDefault($.getInjecteur('window')+'.Configuration', configuration)
							.setDefault($.getInjecteur('window')+'.Data', data)
							.set('style', 'error')
							.set('silent', false)
							.style()
							.parse();
					return $this;
				};
				Fx.prototype.completeAjax			=	function(jqXhr, object){
					var $this		=	jqXhr[$.getInjecteur('window')];
					$this	.Fx	
							.trigger('before.completeAjax')
							.trigger('after.completeAjax');
							
					return $this;
				};
				Fx.prototype.beforeSendAjax			=	function(jqXhr, object){
					var injecteur		=	$.getInjecteur('window');
					jqXhr[injecteur]	=	object[injecteur];	
					return jqXhr;
				};
				
				Fx.prototype.close					=	function(evt){
					$.stopped(evt);
					var target	=	$(evt.currentTarget);
					var parent	=	target.parents('.b-window');
					var $this	=	parent.data($.getInjecteur('window'));					
					var timer	=	parent.data($.getInjecteur('timer'));
										
					if($.isUndefined(timer)){
						timer	=	$this.Fx.getServiceManager().getPluginManager().getPlugin('Timer');
					}
															
					timer	.Fx
							.setParams(timer)
							.initialize();
										
					$this	.Fx
							.setParams($this)
							.trigger('before.close')
							.$('window')
							.fadeOut(timer.Fx.getTime('closeWindow'), $this.Fx.destruct);
							
					$this.Fx.trigger('after.close');
					
					return $this;
				};
                Fx.prototype.expand					=	function(evt){
					$.stopped(evt);
					var target		=	$(evt.currentTarget);
					var parent		=	target.parents('.b-window');
					var $this		=	parent.data($.getInjecteur('window'));
					$this.Fx.setParams($this);
					$this.Fx.trigger('before.expand');

					
					var css			=	{
						width		:	$(window).width(),
						height		:	$(window).height(),
						'max-width'	:	$(window).width(),
						'max-height':	$(window).height(),
						left		:	0,
						top			:	0,
					};
					
					$this	.Fx
							.set('defaultWindowWidth', $this.Fx.$('window').width())
							.set('defaultWindowHeight', $this.Fx.$('window').height())
							.set('defaultWindowPosition', $this.Fx.$('window').position())
							.set('defaulBodyWidth', $this.Fx.$('body').width())
							.set('defaulBodyHeight', $this.Fx.$('body').height())
							.set('compress', true);
					$this.Fx.$('body').animate({
						width	:	'100%',
						height	:	$(window).height() - ($this.Fx.$('footer').height() + $this.Fx.$('header').height()),
					});
					$this.Fx.$('window').animate(css, function(){
                 		$this.Fx.trigger('expand.completed');
               		});
					
					
					$this.Fx.show('compress').getServiceManager().hide($this.Fx.$('expand'));
					$this.Fx.trigger('after.expand');
					return $this;
				};
				Fx.prototype.compress				=	function(evt){
					$.stopped(evt);
					var target	=	$(evt.currentTarget);
					var parent	=	target.parents('.b-window');
					var $this	=	parent.data($.getInjecteur('window'));
					$this.Fx.setParams($this);
					
					$this.Fx.trigger('before.compress');					
					var css		=	{
						width	:	$this.Fx.get('defaultWindowWidth'),
						height	:	$this.Fx.get('defaultWindowHeight'),
						left	:	$this.Fx.get('defaultWindowPosition').left,
						top		:	$this.Fx.get('defaultWindowPosition').top,
					};
					
					$this.Fx.$('window').animate(css);
					$this.Fx.$('body').animate({
						height	:	css.height	-	($this.Fx.$('footer').height() + $this.Fx.$('header').height()),
					}, function(){
                  		$this.Fx.trigger('compress.completed');
               		});
					$this	.Fx
							.show('expand')
							.getServiceManager()
							.hide($this.Fx.$('compress'));
					$this.Fx.trigger('after.compress');
					return $this;
				};
				Fx.prototype.refresh				=	function(evt){
					$.stopped(evt);
					var target	=	$(evt.currentTarget);
					var parent	=	target.parents('.b-window');
					var $this	=	parent.data($.getInjecteur('window'));
					$this.Fx.setParams($this);
					
					$this.Fx.trigger('before.refresh');
					
					if($.isDefined(parent.data($.getInjecteur('lightbox')))){
						var lightbox	=	parent.data($.getInjecteur('lightbox'));
						lightbox.Fx.setParams(lightbox);
						lightbox.Fx.hide($this.Fx.getKey('id'));
						
						$this	.Fx
								.setPlugin('Lightbox', lightbox);
					}
					
					var element			=	$.isDefined($this.Fx.getDefault($.getInjecteur('window')+'.Element'))	?	$this.Fx.getDefault($.getInjecteur('window')+'.Element') : $this.Fx.getParam('Element');
					var configuration	=	$.isDefined($this.Fx.getDefault($.getInjecteur('window')+'.Configuration')) ? $this.Fx.getDefault($.getInjecteur('window')+'.Configuration') : $this.Fx.getParam('Configuration');
					var data			=	$.isDefined($this.Fx.getDefault($.getInjecteur('window')+'.Data')) ? $this.Fx.getDefault($.getInjecteur('window')+'.Data') : $this.Fx.getParam('Data');

					$this	.Fx
							.setParam($params)
							.set('reloaded', false)
							.setParam('Configuration', configuration)
							.setParam('Element', element)
							.setParam('Data', data)
							.removeStyle()
							.decore()
							.loadData();
					
					$this.Fx.trigger('after.refresh');
									
					return $this;
				};	
				Fx.prototype.save					=	function(evt){
					$.stopped(evt);
					var target	=	$(evt.currentTarget);
					var parent	=	target.parents('.b-window');
					var $this	=	target.data($.getInjecteur('window'));
					$this.Fx.trigger('before.save');
					$this.Fx.triggre('after.save');
					return $this;
				};
				Fx.prototype.reload					=	function(evt){
					$.stopped(evt);
					var target		=	$(evt.currentTarget);
					var $this;
					var parent		=	target.parents('.b-window');	
					
					if($.isUndefined(target.data($.getInjecteur('window')))){																
						$this   =   parent.data($.getInjecteur('window'));
					}
					else{
						$this	=	target.data($.getInjecteur('window'));
					}
					
					$this.Fx.setParams($this);
					
					if($.isDefined(parent.data($.getInjecteur('lightbox')))){
						var lightbox	=	parent.data($.getInjecteur('lightbox'));
						lightbox.Fx.setParams(lightbox);
						lightbox.Fx.hide($this.Fx.getKey('id'));
					}
																																						
					if((!$this.Fx.is('multiRefresh') && $.isUndefined($this.Fx.getDefault('Element'))) || $this.Fx.is('multiRefresh')){
						$this	.Fx
								.setDefault($.getInjecteur('window')+'.Element', $this.Fx.getParam('Element'))
								.setDefault($.getInjecteur('window')+'.Configuration', $.extend(true, true, {}, $this.Fx.getParam('Configuration')))
								.setDefault($.getInjecteur('window')+'.Data', $.extend(true, true, {}, $this.Fx.getParam('Data')));
					}

					$this	.Fx
							.setParam('Element', target)
							.set('reloaded', true)
							.inject(target)
							.loadData();	
							
					return $this;		
				};
				this.initialized                    =	true;
			}
		}
	
        function __construct(){
			if(params.Elements.length > 0){
				params.Elements.each(function(){
					var $this   =   $.extend(true, true, {}, params);
                    $this       =   $.extend(true, true, $this, $$params);
                    $this.Fx    =   new Fx($this);
                
					$this   .Fx
                            .setParam('Element', $(this))
                            .setKey('id', $.md5())
                            .initialize();				
				});    
            }
            else{
                if(params.Selector === ''){
                    __begin();
                }
            }
            $(document).on(getKeyEvents()+'end', function(evt){
                var $this =   evt[$.getInjecteur('window')];
                $this.Fx.setParams($this);
              
                if($this.Fx.getData('request') != 'LOADING'){
                    $this.Fx.getParam('Element').data('lock', false);
                }		
                
				if($this.Fx.$('body').find('.b-reload').length > 0){
                    var reloader    =   $this.Fx.$('body').find('.b-reload');
                    reloader.each(function(){
                        $this.Fx.injectEvent('reload', $(this));
                    });
                }           
			
				if($this.Fx.$('body').find('.b-refresh').length > 0){
					var refresher	=	$this.Fx.$('body').find('.b-refresh');
					refresher.each(function(){
						$this.Fx.injectEvent('refresh', $(this));
					});
				}				
                if($this.Fx.$('body').find('.b-close').length > 0){
					var close   =   $this.Fx.$('body').find('.b-close');
                    
					close.each(function(){
                        if($.isTrue($this.Fx.get('reloaded'))){
							$this.Fx.injectEvent('refresh', $(this));
						}
						else{
							$this.Fx.injectEvent('close', $(this));
						}
					});
                }           
				
				if($this.Fx.is('lightbox')){
					//var lightbox	=	$this.Fx.$('window').data($.getInjecteur('lightbox'));
					//lightbox.Fx.setParams(lightbox);
					//lightbox.Fx.resize();
				}
			});
            $(document).on($.getInjecteur('window')+'.after.destructWindow', function(obj){
				var $this	=	obj[$.getInjecteur('window')];
				$this.Fx.setParams($this);
				
				if($.isDefined($this.Fx.get('request'))){
					$this.Fx.get('request').abort();
				};
			});
			
			$(window).on('resize', function(evt){
				if($(evt.target).is($(window))){
					$('.b-window').each(function(){
						var $this       =   $(this).data($.getInjecteur('window'));
						var Lightbox	=	$(this).data($.getInjecteur('lightbox'));
						
						
						$this	.Fx
								.setParams($this)
								.position();
						
						if($.isDefined(Lightbox)){
							Lightbox.Fx	
									.setParams(Lightbox)
									.resize();
						}
						
						return $this;
					}); 
				}
			});
			
        }
        
		function __invoke(target){
            var $this   =   $.extend(true, true, {}, params);
            $this       =   $.extend(true, true, $this, $$params);
            $this.Fx    =   new Fx($this);

            $this   .Fx
                    .setParam('Element', target)
					.setKey('id', $.md5())
					.set('reloaded', false)
					.set('dynamic', true)
                    .initialize();
            
			$this	=	$this.Fx.getParams();
			
            return $this;
        }

        function __begin(){
			var $this   =   __invoke($('body'));
            $this   .Fx
					.setParams($this)
					.setKey('id', $.md5())
					.start();  
		}

		function begin(evt){
			var target  =   $(document);
			var $this	=	null;
			if($.isNotNull(evt)){
				$.stopped(evt);
				target  =   $(evt.currentTarget);
				$this   =   target.data($.getInjecteur('window'));
			}

			if($.isNull($this)){
				$this   =   __invoke(target);
				$this   .Fx
						.getParam('Element')
						.trigger($this.Fx.get('events'));
			}
			else{
				$this	=	$.extend(true, true, {}, $this);
				$this	.Fx
						.setParams($this)
						.setKey('id', $.md5())
						.start();
			}
		}
		
        function getKeyEvents(){
            return $.getInjecteur('window')+'.';
        }    

        __construct();    
        
        return this;
	};
})(jQuery);

/**
* Bakar (http://www.bakar.be)
*
* B-Validators
*
* @link         http://www.bakar.be
* @copyright    Copyright (c) 2005-2014 Bakar. (http://www.bakar.be)
* @version      26072014.1516
*/
(function($) {
    $.fn.Validators = function($params) {
        var params = {
            Keys: {
                injecteur: $.getInjecteur('validators'),
                events: getKeyEvents(),
            },
            jQuery: this,
            Elements: $(this),
            Selector: $(this).selector,
        };
        function Fx(params) {
            if ($.isUndefined(this.initialized)) {
                Fx.prototype.setParams          =   function($params) {
                    if ($.isDefined($params)) {
                        params = $params;
                    }
                    return this;
                };
                Fx.prototype.getParams          =   function() {
                    if ($.isNull(params)) {
                        this.setParams({});
                    }
                    return params;
                };
                Fx.prototype.setParam           =   function(name, param) {
                    var $params = this.getParams();
                    $params[name] = param;
                    this.setParams($params);
                    return this;
                };
                Fx.prototype.getParam           =   function(name) {
                    $params = this.getParams();
                    var param;
                    if ($.isDefined(name)) {
                        param = params[name];
                    }
                    return param;
                };

                Fx.prototype.setConfiguration   =   function(name, configuration) {
                    if ($.isDefined(name) && $.isDefined(configuration)) {
                        var configurations = this.getParam('Configuration');
                        configurations[name] = configuration;
                        this.setParam('Configuration', configurations);
                    }
                    return this;
                };
                Fx.prototype.getConfiguration   =   function(name) {
                    var configuration = null;

                    if ($.isDefined(name)) {
                        var configurations = this.getParam('Configuration');
                        configuration = configurations[name];
                    }
                    return configuration;
                };
                Fx.prototype.set                =   function(name, value) {
                    return this.setConfiguration(name, value);
                };
                Fx.prototype.get                =   function(name) {
                    return this.getConfiguration(name);
                };

                Fx.prototype.setServiceManager  =   function(serviceManager) {
                    if ($.isDefined(serviceManager)) {
                        this.setParam('ServiceManager', serviceManager);
                    }
                    return this;
                };
                Fx.prototype.getServiceManager  =   function() {
                    if ($.isNull(this.getParam('ServiceManager'))) {
                        this.setServiceManager(new ServiceManager());
                    }
                    return this.getParam('ServiceManager');
                };
                Fx.prototype.setService         =   function(service) {
                    return this.setServiceManager(service);
                };
                Fx.prototype.getService         =   function() {
                    return this.getServiceManager();
                };

                Fx.prototype.setKey             =   function(name, key) {
                    if ($.isDefined(name) && $.isDefined(key)) {
                        var keys = this.getParam('Keys');
                        keys[name] = key;
                        this.setParam('Keys', keys);
                    }
                    return this;
                };
                Fx.prototype.getKey             =   function(name) {
                    var key;
                    if ($.isDefined(name)) {
                        var keys = this.getParam('Keys');
                        key = keys[name];
                    }
                    return key;
                };

                Fx.prototype.setPlugin          =   function(name, plugin) {
                    if ($.isDefined(name) && $.isDefined(plugin)) {
                        var plugins = this.getParam('Plugins');
                        plugins[name] = plugin;
                        this.setParam('Plugins', plugins);
                    }
                    return this;
                };
                Fx.prototype.getPlugin          =   function(name) {
                    var plugin;
                    if ($.isDefined(name)) {
                        var plugins = this.getParam('Plugins');
                        plugin = plugins[name];
                    }
                    return plugin;
                };
				
				Fx.prototype.initEvents			=	function(){                
                    var selector	=	this.getParam('Selector')+'['+$.getPrefix('forms')+'one-'+this.get('events')+'!='+this.get('events')+']['+$.getPrefix('forms')+'on-'+this.get('events')+'!='+this.get('events')+']';
					if(this.is('one')){
						$('body').off(this.get('events'), selector, begin);
                        this.getParam('Element')
                            .one(this.get('events'), begin)
                            .attr($.getPrefix('forms')+'one-'+this.get('events'), this.get('events'));

                        if(this.is('live')){
                            $('body').on(this.get('events'), selector, begin);
                        }
                    }
                    else if(this.is('live')){												
						$('body').off(this.get('events'), selector, begin);
                        $('body').on(this.get('events'), selector, begin);
                    }
                    else{
                        $('body').off(this.get('events'), selector, begin);
                        this.getParam('Element')
                            .on(this.get('events'), begin)
                            .attr($.getPrefix('forms')+'on-'+this.get('events'), this.get('events'));
	
                        if(this.is('live')){
                            $('body').on(this.get('events'), selector, begin);
                        }
                    }
                    return this;
                };
				Fx.prototype.trigger            =   function(type){
                    var $this  =   {type   :   getKeyEvents()+type};
                    $this[$.getInjecteur('window')]    =   this.getParams();   
                    
                    var returne     =   $.event.trigger($this);                    
                    if($.isNotNull(returne)){this.setParams(returne);}
                    return this;
                };
                Fx.prototype.inject             =   function(element, $params, name, clone){
					this.trigger('before.inject');		
                    if($.isUndefined($params)){
                        $params =   this.getParams();
                    }
                    if($.isUndefined(name)){
                        name    =   this.getKey('injecteur');
                    }
                    if($.isUndefined(element)){
                        element =   this.getParam('Element');
                    }
                    
                    if($.isTrue(clone)){
                        $params =   $.extend(true, true, {}, $params);
                    }

					if($.isDefined(element)){
						element.data(name, $params);
					}
                    this.trigger('after.inject');
                    return this;
                };
                Fx.prototype.$                  =   function(selector){
                    var dom;
                    
                    if($.isDefined(selector)){
                        var doms    =   this.getParam('Dom');
                        dom         =   doms[selector];
                    }  
                    return dom;
                };

                /**
                *   NAMESPACE
                */
                Fx.prototype.getNameSpace           =	function(){
					if($.isNull(this.getParam('NameSpace'))){
						this.setParam('NameSpace', this.getInput().attr('name'));
					}
					return this.getParam('NameSpace');
				};
				Fx.prototype.setNameSpace           =	function(namespace){
					if($.isDefined(namespace)){
						this.setParam('NameSpace', namespace);
					}
					return this;
				};
                
                Fx.prototype.setErrors              =   function(errors){
                    if($.isDefined(errors)){
                        this._set('errors', errors);
                    }
                    return this;
                };
                Fx.prototype.getErrors              =   function(){
                    return this._get('errors');
                };
                
                Fx.prototype.setError               =   function(error) {
					if ($.isDefined(error)) {
                        this._set('error', error)
                            ._get('errors').push(error);
                    }
                    return this;
                };
                Fx.prototype.getError               =   function() {
                    return this._get('error');
                };		
				
				Fx.prototype.style					=	function(type){
					var inverse;
					type	==	'valid'	?	inverse	=	'error'	:	inverse	=	'valid';
					var style	=	this._get('style');
					
					var element	=	this.getInput();
					
					if(this.isInputBfiles()){
						//element	=	this.getInput().prev('.b-files').find('.dropzone');
					}
										
					element	.removeClass(style[inverse].classes)
							.css(style[type].css)
							.addClass(style[type].classes);
					
					return this;
				};
				Fx.prototype.setStyleError          =   function(type, style){
                    if($.isDefined(type) && $.isDefined(style)){
                        var $style              =   this._get('style');
                        $style.error[type]   =   style;
                        this._set('style', $style);
                    }
                    return this;
				};
				Fx.prototype.getStyleError          =   function(type){
                    var style   =   this._get('style');
                    if($.isDefined(type)){
                        style   =   style.error[type];
                    }
                    return style;
				};
				Fx.prototype.setStyleSuccess        =   function(type, style){
                    if($.isDefined(type) && $.isDefined(style)){
                        var $style      =   this._get('style');
                        $style.valid[type]    =   style;
                        this._set('style', $style);
                    }
                    return this;
				};
				Fx.prototype.getStyleSuccess        =   function(type){
                    var style   =   this._get('style');
                    if($.isDefined(type)){
                        style   =   style.valid[type];
                    }
                    return style;
				};
				
				Fx.prototype.setValue               =	function(value){
					if($.isDefined(value)){
						this._set('value', value);
					}
					return this;
				};
				Fx.prototype.getValue               =   function(){
                    if(this.isInputFiles()){
                        if(this.isInputBfiles()){
                            var $files  =   this.getInput().data($.getInjecteur('files'));
							$files.Fx.setParams($files);
                            
                            var files   =   $files.Fx.getFiles().success;
							this._set('value', files);
                        }
                        else{
                            //????
                        }
                    }
                    else{
                        this._set('value', this.getInput().val());
                    }    
                
					return this._get('value');
				};
                
                Fx.prototype.isInputFiles           =   function(){
                    return  this.getInput().attr('type')    ==  'file'  ?   true    :   false;
                };
                Fx.prototype.isInputBfiles          =   function(){
                    var $files  =   this.getInput().data($.getInjecteur('files'));
                    return  $.isDefined($files) ?   true    :   false;
                };
                Fx.prototype.setFiles               =   function(files){
                    if($.isDefined(files)){
                        this._set('files', files);
                    }
                    return this;
                };
                Fx.prototype.getFiles               =   function(){
                    return this._get('files');
                };
                Fx.prototype.getInfosFile           =   function(file){};

				Fx.prototype.getInput               =	function(){
					return this.getParam('Element');
				};
				Fx.prototype.setInput               =	function(input){
					return this.setParam('Element', input);
				};
				
				Fx.prototype.initialize				=   function(){				
                    var defaultParams               =   this.getServiceManager()
                                                            .getConfigurationManager()
                                                            .get($.getInjecteur('validators'));
                    
                    var defaultAttributes           =   this.getServiceManager()
                                                            .getConfigurationManager()
                                                            .getAttr($.getInjecteur('validators'));
                    
                    var $params                     =   $.extend(true, true, defaultParams, this.getParams());
                    var attributes                  =   $.extend(true, true, defaultAttributes, this.getParam('Attributes'));								
				
					this.setParams($params)
						.setParam('Attributes', attributes);
					
					if($.isNotNull(this.getInput())){
						this.setNameSpace(this.getInput().attr(attributes.namespace));
					}
					
					var _defaut		=	this.get('defaut');
					var _namespace	=	this.getNameSpace();
					if($.isUndefined(this.get(this.getNameSpace()))){
						this.set(this.getNameSpace(), $.extend(true, true, {}, this.get('defaut')));
					}

					var	_params		=	$.extend(true, true, _defaut, this.get(this.getNameSpace()));
					this._setParams(_params);

					if($.isDefined(this.getInput())){
						this._set('auto', this.getInput().attr(attributes.auto));
						if(this.is('auto')){
							var _attributes	=	$.extend(true, true, defaultAttributes, this._getParam('Attributes'));
							this._setParam('Attributes', _attributes);
							_params.Configuration	=	$.extend(true, true, _params.Configuration, this._getAutoConfiguration(_attributes));	
						}
					}	
					this._setParams(_params)
						.inject();
					
					if($.isNull(this._get('label'))){
						var label	=	this.getInput().prev('.b-label:first, label:first').text();
						if($.isNull(label)){
							label	=	this.getInput().parents('.b-label:first, label:first').text();
							if($.isNull(label)){
								label	=	this.getNameSpace();
							}
						}
						this._set('label', label);
					}
                    
					return this;				
				};
				Fx.prototype.is                     =   function(name){
					return $.isTrue(this._get(name));
                };
                Fx.prototype.reset                  =   function(){
                    var config		=   this._getParam('Configuration');
                    config.error    =   null;
                    config.errors   =   [];
					config.state	=	true;
                    
                    this._setParam('Configuration', config);
                    return this;
                };
                Fx.prototype.control                =   function(){
					this.configureByType();
					
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('required'))){
                      	if(this._get('required') == 'required'){
							this._set('required', true);
						}
						this._is('required');
                    }
                    if($.isTrue(this._get('state')) && $.isTrue(this._get('notEmpty'))){
                        this._is('notEmpty');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('minLength'))){
                        this._is('minLength');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('maxLength'))){
                        this._is('maxLength');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('min'))){
                        this._is('min');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('max'))){
                        this._is('max');
                    }        
					if($.isTrue(this._get('state')) && $.isNotNull(this._get('minSize'))){
                        this._is('minSize');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('maxSize'))){
                        this._is('maxSize');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('extentions'))){
                        this._is('extentions');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('maxWidth'))){
                        this._is('maxWidth');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('minWidth'))){
                        this._is('minWidth');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('maxHeight'))){
                        this._is('maxHeight');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('minHeight'))){
                        this._is('minHeight');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('maxFiles'))){
                        this._is('maxFiles');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('minFiles'))){
                        this._is('minFiles');
                    }
                    if($.isTrue(this._get('state')) && $.isNotNull(this._get('recordExists'))){
                        this._is('recordExists');
                    }
					if($.isTrue(this._get('state')) && $.isNotNull(this._get('noSpace'))){
						this._is('noSpace');
					}
					if($.isTrue(this._get('state')) && $.isNotNull(this._get('date'))){
						this._is('date');
					}
					if($.isTrue(this._get('state')) && $.isNotNull(this._get('email'))){
						this._is('email');
					}
					if($.isTrue(this._get('state')) && $.isNotNull(this._get('url'))){
						this._is('url');
					}
					if($.isTrue(this._get('state')) && $.isNotNull(this._get('notAlpha'))){
						this._is('notAlpha');
					}
					if($.isTrue(this._get('state')) && $.isNotNull(this._get('type'))){
                        this._is(this._get('type'));
                    }
                    return this;
                };
                Fx.prototype.isValid                =   function(){
					this.reset()
						.control();
					
                    return this._get('state');
                };
                Fx.prototype.configureByType        =   function(){                   
                    switch (this._get('type')){
						case 'label::short':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 25);}
						if($.isNull(this._get('label'))){this._set('label', 'Label');}
						break;
						
						case 'label::short::notspace':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 25);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Label');}
						break;
						
						case 'label':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 50);}
						if($.isNull(this._get('label'))){this._set('label', 'Label');}
						break;
						
						case 'label::notspace':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 50);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Label');}
						break;
						
						case 'label::long':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 75);}
						if($.isNull(this._get('label'))){this._set('label', 'Label');}
						break;
						
						case 'label::long::notspace':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 75);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Label');}
						break;
						
						case 'label::infinity':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('label'))){this._set('label', 'Label');}
						break;
						
						case 'label::notspace::infinity':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Label');}
						break;
						
						case 'name::short':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 25);}
						if($.isNull(this._get('label'))){this._set('label', 'Name');}
						break;
						
						case 'name::short::notspace':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 25);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Name');}
						break;
						
						case 'name':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 50);}
						if($.isNull(this._get('label'))){this._set('label', 'Name');}
						break;
						
						case 'name::notspace':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 50);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Name');}
						break;
						
						case 'name::long':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 75);}
						if($.isNull(this._get('label'))){this._set('label', 'Name');}
						break;
						
						case 'name::long::notspace':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 75);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Name');}
						break;
						
						case 'name::infinity':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('label'))){this._set('label', 'Name');}
						break;
						
						case 'name::notspace::infinity':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Name');}
						break;
						
						case 'pseudo::short':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 25);}
						if($.isNull(this._get('label'))){this._set('label', 'Pseudo');}
						break;
						
						case 'pseudo::short::notspace':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 25);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Pseudo');}
						break;
						
						case 'pseudo':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 50);}
						if($.isNull(this._get('label'))){this._set('label', 'Pseudo');}
						break;
						
						case 'pseudo::notspace':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 50);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Pseudo');}
						break;
						
						case 'pseudo::long':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 75);}
						if($.isNull(this._get('label'))){this._set('label', 'Pseudo');}
						break;
						
						case 'pseudo::long::notspace':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 75);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Pseudo');}
						break;
						
						case 'pseudo::infinity':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('label'))){this._set('label', 'Pseudo');}
						break;
						
						case 'pseudo::notspace::infinity':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Pseudo');}
						break;
						
						case 'email':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 200);}
						if($.isNull(this._get('email'))){this._set('email', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Email');}
						break;
						
						case 'email::infinity':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('email'))){this._set('email', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Email');}
						break;
						
						case 'title::short':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 25);}
						if($.isNull(this._get('label'))){this._set('label', 'Title');}
						break;
						
						case 'title::short::notspace':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 25);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Title');}
						break;
						
						case 'title':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 50);}
						if($.isNull(this._get('label'))){this._set('label', 'Title');}
						break;
						
						case 'title::notspace':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 50);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Title');}
						break;
						
						case 'title::long':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 75);}
						if($.isNull(this._get('label'))){this._set('label', 'Title');}
						break;
						
						case 'title::long::notspace':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('maxLength'))){this._set('maxLength', 75);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Title');}
						break;
						
						case 'title::infinity':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('label'))){this._set('label', 'Title');}
						break;
						
						case 'title::notspace::infinity':
						if($.isNull(this._get('minLength'))){this._set('minLength', 1);}
						if($.isNull(this._get('notSpace'))){this._set('notSpace', true);}
						if($.isNull(this._get('label'))){this._set('label', 'Title');}
						break;
						
						case 'avatar::small':
						if($.isNull(this._get('maxSize'))){this._set('maxSize', 4 * 1024);}
						if($.isNull(this._get('maxFiles'))){this._set('maxFiles', 1);}
						if($.isNull(this._get('extentions'))){this._set('extentions', 'jpeg, jpg, png, bmp, gif');}
						if($.isNull(this._get('label'))){this._set('label', 'Avatar');}
						break;
						
						case 'avatar':
						if($.isNull(this._get('maxSize'))){this._set('maxSize', 8 * 1024);}
						if($.isNull(this._get('maxFiles'))){this._set('maxFiles', 1);}
						if($.isNull(this._get('extentions'))){this._set('extentions', 'jpeg, jpg, png, bmp, gif');}
						if($.isNull(this._get('label'))){this._set('label', 'Avatar');}
						break;
						
						case 'avatar::big':
						if($.isNull(this._get('maxSize'))){this._set('maxSize', 16 * 1024);}
						if($.isNull(this._get('maxFiles'))){this._set('maxFiles', 1);}
						if($.isNull(this._get('extentions'))){this._set('extentions', 'jpeg, jpg, png, bmp, gif');}
						if($.isNull(this._get('label'))){this._set('label', 'Avatar');}
						break;
						
												
						/////OLD VALIDATOR//////////
						/**
						*	Bakar\Filter\BlogName
						*/
						case 'name::notSpace':
						if ($.isNull(this._get('notEmpty'))) {
                            this._set('notEmpty', true);
                        }
						if ($.isNull(this._get('minLength'))) {
                            this._set('minLength', 1);
                        }
                        if ($.isNull(this._get('maxLength'))) {
                            this._set('maxLength', 50);
                        }
                        if ($.isNull(this._get('label'))) {
                            this._set('label', 'Name / Pseudo');
                        }
						if ($.isNull(this._get('noSpace'))){
							this._set('noSpace', true);
						}
						break;
						
						case 'numeric':
                        if ($.isNull(this._get('required'))) {
                            this._set('required', true);
                        }
                        if ($.isNull(this._get('notEmpty'))) {
                            this._set('notEmpty', true);
                        }
                        if ($.isNull(this._get('numeric'))) {
                            this._set('numeric', true);
                        }
                        if ($.isNull(this._get('label'))) {
                            this._set('label', 'Numéric');
                        }
                        break;
						
						case 'phone::not-alpha':
						if ($.isNull(this._get('notAlpha'))) {
                            this._set('notAlpha', true);
                        }
                        if ($.isNull(this._get('required'))) {
                            this._set('required', true);
                        }
						if ($.isNull(this._get('notEmpty'))) {
                            this._set('notEmpty', true);
                        }
						if ($.isNull(this._get('label'))) {
                            this._set('label', 'Téléphone');
                        }
						break;
						
						case 'phone':
						if ($.isNull(this._get('numeric'))) {
                            this._set('numeric', true);
                        }
                        if ($.isNull(this._get('required'))) {
                            this._set('required', true);
                        }
						if ($.isNull(this._get('notEmpty'))) {
                            this._set('notEmpty', true);
                        }
						if ($.isNull(this._get('label'))) {
                            this._set('label', 'Téléphone');
                        }
						break;
						
						case 'email::not-required':
						if(this.getValue() != ''){
							this._set('email', true);
						}
						else{
							this._set('email', null);
						}

                        if($.isNull(this._get('label'))) {
                            this._set('label', 'Email');
                        }
						break;

						case 'url':
						if($.isNull(this._get('required'))){
							this._set('required', true);
						}
						if($.isNull(this._get('notEmpty'))){
							this._set('notEmpty', true);
						}
						if($.isNull(this._get('noSpace'))){
							this._set('noSpace', true);
						}
						if($.isNull(this._get('url'))){
							this._set('url', true);
						}
						if($.isNull(this._get('label'))){
							this._set('label', 'Url');
						}
						break;

                        case 'pictures':
                        if ($.isNull(this._get('maxSize'))) {
                            this._set('maxSize', 8 * 1024);
                        }
                        if ($.isNull(this._get('maxFiles'))) {
                            this._set('maxFiles', 10);
                        }
                        if ($.isNull(this._get('minFiles'))) {
                            this._set('minFiles', 0);
                        }
                        if ($.isNull(this._get('extentions'))) {
                            this._set('extentions', 'jpeg, jpg, png, bmp, gif');
                        }
                        if ($.isNull(this._get('label'))) {
                            this._set('label', 'Pictures');
                        }
                        break;

                        case 'required':
                        if ($.isNull(this._get('required'))) {
                            this._set('required', true);
                        }
                        break;
						
						case 'city':
                        if ($.isNull(this._get('required'))) {
                            this._set('required', true);
                        }
						if ($.isNull(this._get('notEmpty'))) {
                            this._set('notEmpty', true);
                        }
						if ($.isNull(this._get('minLength'))) {
                            this._set('minLength', 1);
                        }
                        if ($.isNull(this._get('maxLength'))) {
                            this._set('maxLength', 50);
                        }
                        if ($.isNull(this._get('label'))) {
                            this._set('label', 'Ville / Commune');
                        }
                        break;
						
						case 'street':
                        if ($.isNull(this._get('required'))) {
                            this._set('required', true);
                        }
						if ($.isNull(this._get('notEmpty'))) {
                            this._set('notEmpty', true);
                        }
						if ($.isNull(this._get('minLength'))) {
                            this._set('minLength', 1);
                        }
                        if ($.isNull(this._get('maxLength'))) {
                            this._set('maxLength', 200);
                        }
                        if ($.isNull(this._get('label'))) {
                            this._set('label', 'Rue');
                        }
                        break;
						
                        case 'postCode':
                        if ($.isNull(this._get('label'))) {
                            this._set('label', 'Code postal');
                        }
                        break;
                        
						case 'streetNumber':
                        if ($.isNull(this._get('required'))) {
                            this._set('required', true);
                        }
						if ($.isNull(this._get('notEmpty'))) {
                            this._set('notEmpty', true);
                        }
						if ($.isNull(this._get('minLength'))) {
                            this._set('minLength', 1);
                        }
                        if ($.isNull(this._get('maxLength'))) {
                            this._set('maxLength', 50);
                        }
                        if ($.isNull(this._get('label'))) {
                            this._set('label', 'Numéro de porte');
                        }
                        break;
						
                        case 'article':
                        if ($.isNull(this._get('minLength'))) {
                            this._set('minLength', 1);
                        }
                        if ($.isNull(this._get('maxLength'))) {
                            this._set('maxLength', 100000);
                        }
                        if ($.isNull(this._get('label'))) {
                            this._set('label', 'Article');
                        }
                        break;
						
						case 'message':
                        if ($.isNull(this._get('notEmpty'))) {
                            this._set('notEmpty', true);
                        }
						if ($.isNull(this._get('minLength'))) {
                            this._set('minLength', 1);
                        }
                        if ($.isNull(this._get('maxLength'))) {
                            this._set('maxLength', 5000);
                        }
                        if ($.isNull(this._get('label'))) {
                            this._set('label', 'Message');
                        }
                        break;
						
						case 'notes':
						if ($.isNull(this._get('maxLength'))) {
                            this._set('maxLength', 5000);
                        }
                        if ($.isNull(this._get('label'))) {
                            this._set('label', 'Message');
                        }
                        break;
                    
						case 'key':
                        case 'password':
						if ($.isNull(this._get('notEmpty'))) {
                            this._set('notEmpty', true);
                        }
						if ($.isNull(this._get('minLength'))) {
                            this._set('minLength', 5);
                        }
                        if ($.isNull(this._get('maxLength'))) {
                            this._set('maxLength', 100);
                        }
						if ($.isNull(this._get('noSpace'))){
							this._set('noSpace', true);
						}
						if ($.isNull(this._get('label'))) {
                            this._set('label', 'Password');
                        }
						break;
						
						case 'date':
						if(this.getValue() !== ''){
							this._set('date', true);
						}
						break;
						
						case 'equal':
						var target		=	this.getInput().parents('form').find(this.getInput().attr($.getPrefix('validators')+'target'));
						var validator	=	target.data($.getInjecteur('validators'));
						validator.Fx.setParams(validator);
						validator							=	validator.Fx.get(validator.Fx.getNameSpace());
						validator							=	$.extend(true, true, this.get(this.getNameSpace()), validator);
						validator.Configuration.type		=	'equal';
						validator.Configuration.label		=	this._get('label');
						validator.Configuration.equalTarget	=	target;
						this.set(this.getNameSpace(), validator);
						this.reset();
						
						if($.isUndefined(target.data($.getPrefix('validators')+'equal'))){
							target.data($.getPrefix('validators')+'equal', this.getParams());
							target.on('focus focusin select keydown keypress keyup click mousedown mouseup blur', function(evt){
								target		=	$(evt.currentTarget);
								var equal	=	target.data($.getPrefix('validators')+'equal');
								equal.Fx.getInput().trigger('keypress');
							});
						}
						break;
					}
                    return this;
                };

                Fx.prototype._is                    =   function(type) {
                    var error;
                    var regex;
                    var pluriel;

                    switch (type) {
						case 'email':
                        regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                        if (!regex.test(this.getValue())) {
                            error = '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La valeur du champs n\'est pas une adresse e-mail valide.<br />Utilisez le format de base de la partie locale @hostname</p>';

                            this._set('state', false)
                                .setError(error);
                        }
                        break;
						
						case 'url':
						regex	=	new RegExp(
										  "^" +
											// protocol identifier
											"(?:(?:https?|ftp)://)" +
											// user:pass authentication
											"(?:\\S+(?::\\S*)?@)?" +
											"(?:" +
											  // IP address exclusion
											  // private & local networks
											  "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
											  "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
											  "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
											  // IP address dotted notation octets
											  // excludes loopback network 0.0.0.0
											  // excludes reserved space >= 224.0.0.0
											  // excludes network & broacast addresses
											  // (first & last IP address of each class)
											  "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
											  "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
											  "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
											"|" +
											  // host name
											  "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
											  // domain name
											  "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
											  // TLD identifier
											  "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
											  // TLD may end with dot
											  "\\.?" +
											")" +
											// port number
											"(?::\\d{2,5})?" +
											// resource path
											"(?:[/?#]\\S*)?" +
										  "$", "i"
										);
						if(!regex.test(this.getValue())){
                            error = '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La valeur du champs n\'est pas une url valide.</p>';
							this._set('state', false)
								.setError(error);
						}
						break;

                        case 'required':
                        if ($.isUndefined(this.getInput())) {
                            error = '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />Le champs est requis</p>';

                            this._set('state', false)
                                .setError(error);
                        }
                        break;

                        case 'notEmpty':
                        if ($.isNull(this.getValue())) {
                            error = '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La valeur du champs ne peut pas être vide</p>';

                            this._set('state', false)
                                .setError(error);
                        }
                        break;

                       	case 'notAlpha':
						if(this.getValue() == ''){
							this._set('state', true);
						}
						else{
							var value	=	this.getValue().replace(/[a-zA-Z]/g, "");
							this.getInput().val(value);
							this.setValue(value);							
						}
						break;
					   
					    case 'phone':
						case 'numeric':
                        if(this.getValue() == ''){
							this._set('state', true);
						}
						else{
							var value	=	this.getValue().replace(/[^\d\+]/g, "");
							this.getInput().val(value);
							this.setValue(value);
							regex = /^[0-9]{1,}$/;
							if (!regex.test(this.getValue())) {
								error = '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La valeur entrée n\'est pas un type valide (nombres uniquement)</p>';

								this._set('state', false)
									.setError(error);
							}
						}
						break;

                        case 'minLength':
                        if (this.getValue().length < this._get('minLength')) {
                            pluriel =   this._get('maxLength') > 1 ? 's' : '';
                            error   =   '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La valeur entrée est trop courte<br />Minimum <span class="red bold">' + this._get('minLength') + '</span> caractère' + pluriel + '</p>';
                            this._set('state', false)
                                .setError(error);
                        }
                        break;

                        case 'maxLength':
                        if (this.getValue().length > this._get('maxLength')) {
                            pluriel = this._get('maxLength') > 1 ? 's' : '';
                            error = '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La valeur entrée est trop longue<br />Maximum <span class="red bold">' + this._get('maxLength') + '</span> caractère' + pluriel + '</p>';

                            this._set('state', false)
                                .setError(error);
                        }
                        break;

                        case 'checked':
                        if (!this.getInput().is(':checked')) {
                            error   =   '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />Le champs doit être "sélectionné"</p>';
                            this._set('state', false)
                                .setError(error);
                        }
                        break;

                        case 'maxSize':
                        error   =   '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />Le poids du fichier <span class="red bold">' + this._get('fileName')+ '</span> est de <span class="red bold">' + this._get('fileSize')+ ' Ko</span><br />Le poids maximum du fichier ne peut pas dépasser <span class="red bold">' + this._get('maxSize') + ' Ko</span></p>';
                        break;

                        case 'minSize':
                        error   =   '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />Le poids du fichier <span class="red bold">' + this._get('fileName')+ '</span> est de <span class="red bold">' + this._get('fileSize') + ' Ko</span><br />Le poids minimum du fichier ne peut pas être inférieur à <span class="red bold">' + this._get('minSize') + ' Ko</span></p>';
                        break;

                        case 'maxFiles':
						console.log($._length(this.getValue()));
						pluriel =   this._get('maxLength') > 1 ? 's' : '';
                        error   =   '<p><span class="txt-blueceane">Information pour le champs (' + this._get('label') + ')</span><br />Maximum <span class="blueceane bold">' + this._get('maxFiles') + '</span> fichier autorisé' + pluriel + '<br />Vous avez déjà <span class="blueceane bold">' + this._get('totalFiles') + '</span> fichier' + pluriel + ' chargé' + pluriel + '</p>';
                        break;

                        case 'minFiles':
                        pluriel =   this._get('maxLength') > 1 ? 's' : '';
                        error   =   '<p><span class="txt-blueceane">Information pour le champs (' + this._get('label') + ')</span><br />Minimum <span class="blueceane bold">' + this._get('minFiles') + '</span> fichier obligatoire' + pluriel + '<br />Vous n\'avez que <span class="blueceane bold">' + this._get('totalFiles') + '</span> fichier' + pluriel + ' chargé' + pluriel + '</p>';
                        break;

                        case 'maxWidth':
                        error   =   '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La largeur de l\'élément est de <span class="red bold">' + this._get('elementWidth') + ' px</span><br />La largeur maximum ne peut pas dépasser <span class="red bold">' + this._get('maxWidth') + ' px</span></p>';
                        break;

                        case 'minWidth':
                        error   =   '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La largeur de l\'élément est de <span class="red bold">' + this._get('elementWidth') + ' px</span><br />La largeur minimum ne peut pas être inférieure à <span class="red bold">' + this._get('minWidth') + ' px</span></p>';
                        break;

                        case 'maxHeight':
                        error   =   '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La hauteur de l\'élément est de <span class="red bold">' + this._get('elementHeight') + ' px</span><br />La hauteur maximum ne peut pas dépasser <span class="red bold">' + this._get('maxHeight') + ' px</span></p>';
                        break;

                        case 'minHeight':
                        error   =   '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La hauteur de l\'élément est de <span class="red bold">' + this._get('elementHeight') + ' px</span><br />La hauteur minimum ne peut pas être inférieure à <span class="red bold">' + this._get('minHeight') + ' px</span></p>';
                        break;

                        case 'min':
                        error   =   '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La valeur entrée est trop basse<br />Minimum <span class="red bold">' + this._get('min') + '</span></p>';
                        break;

                        case 'max':
                        error   =   '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La valeur entrée est trop élévée<br />Maximum <span class="red bold">' + this._get('max') + '</span></p>';
                        break;
						
						case 'date':
						if(this.getValue() == ''){
							this._set('state', true);
						}
						else{
							error	=	'<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La date ne correspond pas à un format valide<br />Veuillez utiliser le format Jour/Mois/Année (ex : 01/01/1970)</p>';
							var control;
							
							try{
								control	=	$.datepicker.parseDate("dd/mm/yy", this.getValue());
							}
							catch(e){}
							
							if($.type(control) !== 'date'){
								this._set('state', false)
									.setError(error);
							}
						}
						break;
						
						case 'float':
						var value	=	this.getValue().replace(/[^\d,.]+/, "");
						this.getInput().val(value);
						this.setValue(value);
						
						if(this.getValue() == ''){
							this._set('state', true);
						}
						else{
							var regex	=	/^(\d+(?:[\.\,]\d{1,})?)$/;
							error 		= 	'<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La valeur entrée n\'est pas un type valide (nombres / nombres à virgule) uniquement </p>';
							
							if(!regex.test(this.getValue())){
								this._set('state', false)
									.setError(error);
							}
						}
						break;
						
                        case 'recordExists':
                        break;
						
						case 'noSpace':
						error	=	'<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La valeur entrée ne peut pas contenir d\'espace</p>';
						regex	=	/\s/g;
						if(regex.test(this.getValue())){
							this._set('state', false)
								.setError(error);
						}
						break;
						
                        case 'notSpecialChars':
                        error               =   '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La valeur du champs ne peut pas contenir de caractères spéciaux</p>';
                        var level           =   null;
                        var specialChars    =   '';
                        switch (level) {
                            case 1:
                            specialChars    =   '[a-zA-Z0-9_-]';
                            break;

                            default:
                            specialChars = '[a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ _-]';
                            break;
                        }

                        regex = new RegExp("^" + specialChars + "{1,}$", "gi");

                        if (!regex.test(this.getValue())) {
                            this._set('state', false)
                                .setError(error);
                        }
                        break;
						
						case 'extentions':
                        case 'extensions':
                        error   =   '<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />L\'extension <span class="red bold">' + this._get('fileExtention') + '</span> du fichier <span class="red bold">' + this._get('fileName') + '</span> n\'est pas autorisée<br />Les extensions autorisées sont ' + this._get('extentions') + '</p>';
                        break;
                    
						case 'equal':
						if(this.getValue()	!==	this._get('equalTarget').val()){
							var equalTarget		=	this._get('equalTarget');
							var equalValidator	=	equalTarget.data($.getInjecteur('validators'));
							equalValidator.Fx.setParams(equalValidator);
							
							error	=	'<p><span class="txt-red">Erreur pour le champs (' + this._get('label') + ')</span><br />La valeur du champs ne correspond pas à la valeur du champs ( '+equalValidator.Fx._get('label')+' )</p>';
							this._set('state', false)
								.setError(error);
						}
						break;
					}

                    return this;
                };

				Fx.prototype._set                   =	function(name, value){
					if($.isDefined(name) && $.isDefined(value)){						
						var config	=	this._getParam('Configuration');
						config[name]=	value;
						this._setParam('Configuration', config);
					}
					return this;
				};
				Fx.prototype._get                   =	function(name){
					var returne;
					if($.isDefined(name)){
						var config	=	this._getParam('Configuration');
						returne		=	config[name];
					}
					return returne;
				};

				Fx.prototype._setParams             =	function($params){
					if($.isDefined($params)){
						this.set(this.getNameSpace(), $params);
					}
					return this;
				};
				Fx.prototype._getParams             =	function(){
					if($.isUndefined(this.get(this.getNameSpace()))){
						this._setParams($.extend(true, true, {}, this.get('defaut')));
					}
					return this.get(this.getNameSpace());
				};
				Fx.prototype._setParam              =	function(name, param){
					var $params = this._getParams();
                    $params[name] = param;
                    this._setParams($params);
                    return this;
				};
				Fx.prototype._getParam              =	function(name){
					$params = this._getParams();
                    var param;
                    if ($.isDefined(name)) {
                        param = $params[name];
                    }
                    return param;
				};
                Fx.prototype._setAutoConfiguration  =   function(autoConfiguration) {
                    if ($.isDefined(autoConfiguration)) {
                        this._setParam('AutoConfiguration', autoConfiguration);
                    }
                    return this;
                };
                Fx.prototype._getAutoConfiguration  =   function(attributes) {
                    if($.isNull(this._getParam('AutoConfiguration'))) {
						this._setAutoConfiguration({
							state: this.getParam('Element').attr(attributes.state),
							type: this.getParam('Element').attr(attributes.type),
							sender: this.getParam('Element').attr(attributes.sender),
							max: this.getParam('Element').attr(attributes.max),
							min: this.getParam('Element').attr(attributes.min),
							maxWidth: this.getParam('Element').attr(attributes.maxWidth),
							minWidth: this.getParam('Element').attr(attributes.minWidth),
							maxHeight: this.getParam('Element').attr(attributes.maxHeight),
							minHeight: this.getParam('Element').attr(attributes.minHeight),
							label: this.getParam('Element').attr(attributes.label),
							maxFiles: this.getParam('Element').attr(attributes.maxFiles),
							minFiles: this.getParam('Element').attr(attributes.minFiles),
							maxLength: this.getParam('Element').attr(attributes.maxLength),
							minLength: this.getParam('Element').attr(attributes.minLength),
							maxSize: this.getParam('Element').attr(attributes.maxSize),
							minSize: this.getParam('Element').attr(attributes.minSize),
							extentions: this.getParam('Element').attr(attributes.extentions),
							required: this.getParam('Element').attr(attributes.required),
							notEmpty: this.getParam('Element').attr(attributes.notEmpty),
						});
                    }
					return this._getParam('AutoConfiguration');
                };
			
                this.init = true;
            }
        }
        function __construct() {
            if(params.Elements.length > 0){
				params.Elements.each(function(){
                    var $this   =   $.extend(true, true, {}, params);
                    $this       =   $.extend(true, true, $this, $params);
                    $this.Fx    =   new Fx($this);

                    $this   .Fx
                            .setParam('Element', $(this))
                            .setKey('id', $.md5())
							.initialize();				
				});    
            }            
        }	
        function getKeyEvents(){
            return $.getInjecteur('validators')+'.';
        }    
       
        __construct();
    };
})(jQuery);
