/**
* Bakar (http://www.bakar.be)
*
* ServiceManager
*
* @link         http://www.bakar.be
* @copyright    Copyright (c) 2005-2016 Bakar. (http://www.bakar.be)
* @version      1.0
* 
* UPDATE
*   -   21/10/2015 06:00:00
*       -1  Modification de la fonction css, déplacement vers l'objet Fx
*       -2  Modification de la fonction addClass, déplacement vers l'objet Fx
*       -3  Modification de la fonction attr, déplacement vers l'objet FX
*       -4	Suppression de la fonction getDateFormat, passage au plugin Moment
*/
function ServiceManager(){
    this.config;
    this.configurationManager;
    this.pluginManager;
    
    if($.isUndefined(this.initialized)){
        ServiceManager.prototype.hide                       =   function(elements){
            $.hide(elements);
            return this;
        };
        ServiceManager.prototype.show                       =   function(elements){
            $.show(elements);
            return this;
        };
        ServiceManager.prototype.disable                    =   function(elements){
            $.disable(elements);
            return this;
        };
        ServiceManager.prototype.enable                     =   function(elements){
            $.enable(elements);
            return this;
        };
		ServiceManager.prototype.float                      =   function(data){
            return $.float(data);
		};
            
        ServiceManager.prototype.css                        =   function(css, elements){
            $._css(css, elements);
            return this;
        };
        ServiceManager.prototype.addClass                   =   function(classs, elements){
            $._addClass(classs, elements);
            return this;
        };
        ServiceManager.prototype.attr    					=	function(name, value, elements){
			if($.isDefined(name) && $.isDefined(value) && $.isDefined(elements)){
				$._attr(name, value, elements);
			}
			return this;
		};
		
        ServiceManager.prototype.setApplicationConfig       =   function(applicationConfig){
            return this.setConfig(applicationConfig);
        }
        ServiceManager.prototype.getApplicationConfig       =   function(){
            return this.getConfig();
        }
        ServiceManager.prototype.setConfig                  =   function(config){
            if($.isDefined(config)){
                this.config =   config;
            }
            return this;
		};
		ServiceManager.prototype.getConfig                  =   function(){
            if($.isNull(this.config)){
                this.setConfig(new ApplicationConfig());
            }
            return this.config;
		};
        
        ServiceManager.prototype.setPluginManager           =   function(pluginManager){
            if($.isDefined(pluginManager)){
                this.pluginManager =   pluginManager;
            }
            return this;
        };
        ServiceManager.prototype.getPluginManager           =   function(){
            if($.isNull(this.pluginManager)){
                this.setPluginManager(new PluginManager());
            }
            return this.pluginManager;
        };
               
        ServiceManager.prototype.setConfigurationManager    =   function(configurationManager){
            if($.isDefined(configurationManager)){
                this.configurationManager   =   configurationManager;
            }
            return this;
        };
        ServiceManager.prototype.getConfigurationManager    =   function(){
            if($.isNull(this.configurationManager)){
                this.setConfigurationManager(new ConfigurationManager());
            }
            return this.configurationManager;
        };

        ServiceManager.prototype.setLocale                  =   function(locale){};
        ServiceManager.prototype.getLocale                  =   function(){};
        ServiceManager.prototype.setTranslator              =   function(translator){}
        ServiceManager.prototype.getTranslator              =   function(){};
        ServiceManager.prototype.translate                  =   function(string, params, locale){};
        
        ServiceManager.prototype.triggerError               =   function(message, windowConfig){
			if($.isUndefined(windowConfig)){
				windowConfig	=	{zindex : 1050};
			}
			
		    var Bwindow =   {
                Configuration   :   {
                    style   :   'error',
                    position:   'top',
                    lightbox:   true,
                    ajax    :   false,
                    auto    :   true,
                    zindex  :   windowConfig.zindex,
                    loading :   true,
					silent	:	false,
                },
                Data            :   {
                    values  :{
                        body    :    message, 
                    },
                },
                Plugins     :   {
                    Lightbox    :   {
                        Configuration   :   {
                            multi   :   true,
                        },
                    },
                }
			};
            Bwindow =   $.extend(true, true, windowConfig, Bwindow);
			
            $().Window(Bwindow);
            return this;
        };
        ServiceManager.prototype.triggerInfo                =   function(message, windowConfig){
            var zindex	=	20;
			if($('.b-window').length > 0){
				var $this	=	$('.b-window:last').data($.getInjecteur('window'));
				$this.Fx.setParams($this);
				zindex	=	$this.Fx.get('zindex');
			}
			
			var Bwindow =   {
                Configuration   :   {
                    style   :   'info',
                    position:   'center',
                    lightbox:   true,
                    ajax    :   false,
                    auto    :   true,
                    zindex  :   zindex,
                    loading :   true,
                },
                Data            :   {
                    values  :{
                        body    :    message, 
                    },
                },
                Plugins     :   {
                    Lightbox    :   {
                        Configuration   :   {
                            multi   :   true,
                        },
                    },
                }
			};

            
            $().Window(Bwindow);
            return this;
        };
		this.initialized = true;
	}
}