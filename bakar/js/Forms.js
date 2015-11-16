/**
* Bakar (http://www.bakar.be)
*
* B-Forms
*
* @link         http://www.bakar.be
* @copyright    Copyright (c) 2005-2014 Bakar. (http://www.bakar.be)
* @version      26072014.1516
*/
(function($){
	$.fn.Forms	=	function($params){
		var params	=	{
			Keys			:	{
				injecteur	:	$.getInjecteur('forms'),
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
				
                Fx.prototype.setAutoConfiguration   =   function(autoConfiguration){
                    if($.isDefined(autoConfiguration)){
                        this.setParam('AutoConfiguration', autoConfiguration);
                    }
                    return this;
                };
				Fx.prototype.getAutoConfiguration	=	function(attributes){
                    if($.isUndefined(this.getParam('AutoConfiguration'))){
                        this.setAutoConfiguration({
                            events          :   this.getParam('Element').attr(attributes.events),
                            live            :   this.getParam('Element').attr(attributes.live),					
                            one             :   this.getParam('Element').attr(attributes.one),
                            auto            :   this.getParam('Element').attr(attributes.auto),					
                            multiErrorBox	:	this.getParam('Element').attr(attributes.multiErrorBox),
                            staticControl	:	this.getParam('Element').attr(attributes.staticControl),
                            sendControl		:	this.getParam('Element').attr(attributes.sendControl),
                            zindex			:	this.getParam('Element').attr(attributes.zindex),
                            onlyVisible		:	this.getParam('Element').attr(attributes.onlyVisible),
                            ajax			:	this.getParam('Element').attr(attributes.ajax),
                        });
                    } 
					return this.getParam('AutoConfiguration');
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
		
				Fx.prototype.isInputFiles           =   function(input){
                    return  input.attr('type')    ==  'file'  ?   true    :   false;
                };
                Fx.prototype.isInputBfiles          =   function(input){
                    var $files  =   input.data($.getInjecteur('files'));
                    return  $.isDefined($files) ?   true    :   false;
                };
		
				Fx.prototype.initEvents				=	function(){                
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
				Fx.prototype.trigger                =   function(type){
                    var $this  =   {type   :   getKeyEvents()+type};
                    $this[$.getInjecteur('forms')]    =   this.getParams();   
                    
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
				Fx.prototype.injectEvent            =   function(evt, element, clone){
                    this.trigger('before.injectEvent');
       
                    switch(evt){
                        case 'static':	
						if(element.attr($.getPrefix('forms')+'event') != evt){
							if(this.isInputBfiles(element) || this.isInputFiles(element)){
								//element.on('change', this.staticControl);
							}
							else{
								element.on('focus focusin select keydown keypress keyup click mousedown mouseup blur', this.staticControl);
							}
						}
						break;
                    }
					element.attr($.getPrefix('forms')+'event', evt);
                    this.trigger('after.injectEvent');
                    return this;
                };
				Fx.prototype.initialize				=	function(){
					this.trigger('before.initialize');
                    var defaultParams           =   this    .getServiceManager()
                                                            .getConfigurationManager()
                                                            .get($.getInjecteur('forms'));
                    
                    var defaultAttributes       =   this    .getServiceManager()
                                                            .getConfigurationManager()
                                                            .getAttr($.getInjecteur('forms'));

					var $params                 =   $.extend(true, true, defaultParams, this.getParams());
					var attributes              =   $.extend(true, true, defaultAttributes, this.getParam('Attributes'));
					
					if($.isNotNull(this.getParam('Element'))){
						this.getParam('Element').attr(attributes.auto);
						this.set('auto', this.getParam('Element').attr(attributes.auto)); 
						
						if(this.is('auto')){
							$params.Configuration   =   $.extend(true, true, $params.Configuration, this.getAutoConfiguration(attributes));
                       }			
					}
					
					this.setParams($params)
                        .setParam('Attributes', attributes)
						.setParam('Element', this.getSender())
                        .inject()
						.initEvents();
					
					this.inputs()
						.inject(this.$('inputs'));
					
					this.$('inputs')
						.each(function(){
							var $this	=	$(this).data($.getInjecteur('forms'));
							$this.Fx.setParams($this);
							$(this).Validators($this.Fx.getPlugin('Validators'));
						});
					
					if(this.is('staticControl')){
						this.injectEvent('static', this.$('inputs'));
					}
					
					this.trigger('after.initialize');
					return this;
				};
				
				Fx.prototype.getForm				=	function(){
					return this.$('form');
				};
				Fx.prototype.getSender				=	function(){
					return this.$('form').find('[type="submit"]:first');
				};
				Fx.prototype.reset					=	function(){
					var config		=	this.getParam('Configuration');
					config.errors	=	[];
					this.setParam('Configuration', config);
					return this;
				};

				Fx.prototype.isValid				=	function(){
                    if(this.get('errors').length === 0){
						return true;
					}
					else{
						return false;
					}
				};
				Fx.prototype.send					=	function(evt){
					this.trigger('before.send');
					this.control();
					
					if(this.isValid() || !this.is('sendControl')){
						if(this.is('ajax')){
							$.stopped(evt);
							var ajax	=	this.getServiceManager()
												.getPluginManager()
												.get('Ajax', this.getPlugin('Ajax'));
							
							if(this.getForm().parents('.b-window').length > 0 && this.get('reloadWindow')){
								var window		=	this.getForm().parents('.b-window');
								Bwindow			=	window.data($.getInjecteur('window'));
								Bwindow.Fx.setParams(Bwindow);
								var reloader	=	window.find('.b-reload:first');
								ajax.Fx
									.setParam('Element', reloader)
									.set('method', this.getForm().attr('method'))
									.set('url', this.getForm().attr('action'))
									.set('zindex', this.get('zindex'))
									.set('data', this.getForm().serialize())
									.set($.getInjecteur('forms'), this.getParams())
									.inject();	
									
									reloader.trigger(Bwindow.Fx.get('events'));
							}
							else{
								ajax.Fx
									.setParam('Element', this.getSender())
									.set('auto', this.get('auto'))
									.setKey('id', this.getKey('id'))
									.set('zindex', this.get('zindex'))
									.set('method', this.getForm().attr('method'))
									.set('url', this.getForm().attr('action'))
									.set('zindex', this.get('zindex'))
									.set('data', this.getForm().serialize())
									.set('beforeSend', this.beforeSendAjax)
									.set('complete', this.completeAjax)
									.set('error', this.errorAjax)
									.set('success', this.successAjax)
									.set($.getInjecteur('forms'), this.getParams())
									.inject();
									
								ajax.Fx.send();
							}
						}
						else{
							this.getSender().off().trigger('click');
						}
					}
					else{
						var errorText	=	'';
						var	errors		=	this.get('errors');
						var zindex;
						for(var i in errors){
							if(this.is('multiErrorBox')){															
								this.getServiceManager().triggerError(errors[i], {
									Configuration	:	{
                                        zindex  :   this.get('zindex') - i,
										spaceX	:	10,
										spaceY	:	10,
									},
								});
							}
							else{
								errorText	+=	errors[i];	
							}
						}
						
						if(!this.is('multiErrorBox')){
							this.getServiceManager().triggerError(errorText, {
								Configuration	:	{
									zindex : parseInt(this.get('zindex'), 10),
								}
							});
						}
					}
					
					this.trigger('after.send');
				};
				Fx.prototype.inputs					=	function(){
					this.trigger('before.inputs');
					var doms		=	this.getParam('Dom');
					var inputs		=	this.$('form').find(':input.b-control');
					
					if(this.is('visibleOnly')){
						inputs	=	inputs.filter(':visible');
					}
					
					doms.inputs	=	inputs;
					this.setParam('Dom', doms);	
					this.trigger('after.inputs');
					return this;
				};
				Fx.prototype.control				=	function(evt){
					this.reset();
					this.trigger('before.control');
					
					this.$('inputs').each(function(){
						var $this		=	$(this).data($.getInjecteur('forms'));
						var validator	=	$(this).data($.getInjecteur('validators'));
						
						validator.Fx.setParams(validator);
						if(validator.Fx.isValid()){
							validator.Fx.style('valid');
						}
						else{
							validator.Fx.style('error');
							$this.Fx.get('errors').push(validator.Fx.getError());
						}
					});
					this.trigger('after.control');
				};
				Fx.prototype.staticControl			=	function(evt){
					var target		=	$(evt.currentTarget);
					var validator	=	target.data($.getInjecteur('validators'));
					if(validator.Fx.isValid()){
						validator.Fx.style('valid');
					}
					else{
						validator.Fx.style('error');
					}
				};
				
				Fx.prototype.successAjax			=	function(response, state, jqXhr){
					var injecteur	=	$.getInjecteur('forms');
					var $this		=	jqXhr[injecteur];
					var $params		=	{
						response	:	response,
						state		:	state,
						jqXhr		:	jqXhr,
					};
					$params[$.getInjecteur('forms')]	=	$this;
					
					$this	.Fx
							.trigger('before.success.ajax')
							.func($this.Fx.get('fx').success, $params)
							.trigger('after.success.ajax');
							
					return $this;
				};
				Fx.prototype.errorAjax				=	function(jqXhr, error, exception){
					var $this		=	jqXhr[$.getInjecteur('forms')];
					var	$params		=	{
						jqXhr		:	jqXhr,
						error		:	error,
						exception	:	exception,
					};
					$params[$.getInjecteur('forms')]	=	$this;
					
					$this	.Fx
							.trigger('before.error.ajax')
							.func($this.Fx.get('fx').error, $params)
							.trigger('after.error.ajax');
							
					return $this;
				};
				Fx.prototype.completeAjax			=	function(jqXhr, object){
					var $this		=	jqXhr[$.getInjecteur('forms')];
					var $params		=	{
						jqXhr	:	jqXhr,
						object	:	object,
					};
					$params[$.getInjecteur('forms')]	=	$this;
					
					$this	.Fx	
							.trigger('before.completeAjax')
							.func($this.Fx.get('fx').complete, $params)
							.trigger('after.completeAjax');
							
					return $this;
				};
				Fx.prototype.beforeSendAjax			=	function(jqXhr, object){
					var injecteur		=	$.getInjecteur('forms');
					jqXhr[injecteur]	=	object[injecteur];
					var $this			=	object[injecteur];
					var $params		=	{
						jqXhr	:	jqXhr,
						object	:	object,
					};
					
					$this	.Fx
							.trigger('before.beforeSendAjax')
							.func($this.Fx.get('fx').beforeSend, $params)
							.trigger('after.beforeSendAjax');
							
					
					return jqXhr;
				};			
				Fx.prototype.func					=	function(fx, $params){
					if($.isFunction(fx)){
						fx($params);
					}
					return this;
				};
				this.initialized                    =	true;
			}
		}

		function __construct(){
			if(params.Elements.length > 0){
				params.Elements.each(function(){
                    var $this   =   $.extend(true, true, {}, params);
                    $this       =   $.extend(true, true, $this, $params);
                    $this.Fx    =   new Fx($this);
					
                    $this   .Fx
                            .setParam('Element', $(this))
							.setParam('Dom',{
								form	:	$(this),
								sender	:	$(this).find('[type="submit"]:first'),
							})
                            .setKey('id', $.md5())
                            .initialize();		
					});    
            }
		}
		function __invoke(){}
		function begin(evt){
			$.stopped(evt);
			var target	=	$(evt.currentTarget);
			var	$this	=	target.data($.getInjecteur('forms'));
			$this.Fx.setParams($this);
			$this.Fx.send(evt);
		}
        function getKeyEvents(){
            return $.getInjecteur('forms')+'.';
        }    
       
		
		__construct();
		return this;
	};
})(jQuery);