/**
* Bakar (http://www.bakar.be)
*
* ApplicationConfig
*
* @link         http://www.bakar.be
* @copyright    Copyright (c) 2005-2016 Bakar. (http://www.bakar.be)
* @version      1.0
* 
* UPDATE
*   -   21/10/2015 06:00:00
*       -   Ajout de la fonction set
*       -   Ajout de la fonction get
*       -   Ajout de la fonction getLocale
*       -   Ajout de la fonction setLocale
*/
function ApplicationConfig(){
	this.path			=	null;
	this.version		=	null;
	this.serverVersion	=	null;
	this.serverConfig	=	null;
	this.space			=	null;
    this.locale         =   null;
	
	if($.isUndefined(this.initialized)){
        ApplicationConfig.prototype.set                     =   function(serverConfig){
            return this.setServerConfig(serverConfig);
        }
        ApplicationConfig.prototype.get                     =   function(element){
            return this.getServerCongig(element);
        }
        ApplicationConfig.prototype.setServerConfig         =   function(serverConfig){
			if(serverConfig !== null){
				this.serverConfig = serverConfig;
			}
			return this;
		};
        ApplicationConfig.prototype.getServerConfig         =   function(element){
			if(this.serverConfig === null){
				this.setServerConfig(this.generateServerConfig());
			}
			
			var returne	=	this.serverConfig;
			
			if($.isDefined(element)){
				returne	=	returne[element];
			}
			
			return returne;
		};
		ApplicationConfig.prototype.generateServerConfig    =	function(){
			var dom			=	$('#ApplicationConfig');
			var jsonConfig	=	dom.text();
			jsonConfig		=	$.parseJSON(jsonConfig);
			
			//dom.remove();
			return jsonConfig;
		};
		
		ApplicationConfig.prototype.setPath					=	function(path){
			if(path !== null){
				this.path	=	path;
			}
			return this;
		};
		ApplicationConfig.prototype.getPath					=	function(){
			if(this.path === null){
				this.setPath(this.generatePath());
			}
			return this.path;
		};
		ApplicationConfig.prototype.generatePath			=	function(){
			return this.getServerConfig('path');
		};
		
		ApplicationConfig.prototype.setSpace				=	function(space){
			if($.isDefined(space)){
				this.space	=	space;
			}
			return this;
		};
		ApplicationConfig.prototype.getSpace				=	function(){
			if($.isNull(this.space)){
				this.setSpace(this.generateSpace());
			}
			return this.space;
		};
		ApplicationConfig.prototype.generateSpace			=	function(){
			return this.getServerConfig('space');
		};
		
		ApplicationConfig.prototype.setVersion				=	function(version){
			if(version !== null){
				this.version = version;
			}
			return this;
		};
		ApplicationConfig.prototype.getClientVersion		=	function(){
			return this.getVersion();
		};
		ApplicationConfig.prototype.getVersion				=	function(){
			if(this.version === null){
				this.setVersion(this.generateVersion());
			}
			return this.version;
		};
		ApplicationConfig.prototype.generateVersion			=	function(){
			return this.getServerConfig('version');
		};
		
    	ApplicationConfig.prototype.setLocale       		=	function(locale){
			if(locale !== null){
				this.locale = locale;
			}
			return this;
		};
		ApplicationConfig.prototype.getLocale		        =	function(){
			if(this.locale === null){
				this.setLocale(this.generateLocale());
			}
			return this.locale;
		};
		ApplicationConfig.prototype.generateLocale	        =	function(){
			return $.isUndefined(this.getServerConfig('Locale'))    ?   'fr'    :   this.getServerConfig('Locale');
		};        

        ApplicationConfig.prototype.setServerVersion		=	function(serverVersion){
			if(serverVersion !== null){
				this.serverVersion = serverVersion;
			}
			return this;
		};
		ApplicationConfig.prototype.getServerVersion		=	function(){
			if(this.serverVersion === null){
				this.setServerVersion(this.generateServerVersion());
			}
			return this.serverVersion;
		};
		ApplicationConfig.prototype.generateServerVersion	=	function(){
			return this.getServerConfig('ServerVersion');
		};
        		
		ApplicationConfig.prototype.controlVersion			=	function(){
			if(this.getClientVersion() !== this.getServerVersion()){
                var config  =   $.extend(true, true, {}, this.getWindowConfig());
				config                  =   $.extend(true, true, {}, config);
				config.style			=	'error';
				config.value.title		=	'ATTENTION!!!';
				config.value.content	=	'<p>'+
												'La version Javascript est obsolète : '+this.getVersion()+'<br />'+
												'La version attendue est : '+this.getServerVersion()+
											'</p>';
				config.events			=	null;
				config.ajax.ajax		=	null;
				$('body').Window(config);
			}
		};
		ApplicationConfig.prototype.showVersion				=	function(){
			var div				=	$('<div></div>');
			var css				=	{};
			css.height			=	'40px';
			css.lineHeight		=	'40px';
			css.backgroundColor	=	'rgba(0, 0, 0, 0.05)';
			css.marginBottom	=	'20px';
			div.css(css);
			div.addClass('row');
			div.append('<div class="col-lg-12">Version client :: '+this.getVersion()+'</div>');
			$('body').prepend(div);				
		};
		
        ApplicationConfig.prototype.getFormConfig           =   function(){
            return  {
						Configuration	:	{
							zindex			:	1035,
							multiErrorBox	:	false,
							fx				:	{
								error	:	function(params){
								},
								complete:	function(params){
								},
								success	:	function(params){
								},
							}
						},
						Plugins			:	{
							Validators	:	{
								Configuration	:	{
									defaut	:	{
										Attributes	:	{
											type	:	'data-control-type',
										}
									},
								},
							},
						},
					}
        };
        ApplicationConfig.prototype.getWindowConfig         =   function(){
            return  {
                    	Configuration	:	{
                			auto		:	true,
                			lightbox	:	true,
                			live		:	true,
                			ajax		:	true,
                			loading	    :	true,
                			events	    :	'click',
                			zindex	    :	1035,
                			fixed		:	true,
                			adjust	    :	true,
                			position	:	'top',
                			positionY   :	'100',
                			spaceX	    :	10,
                			spaceY	    :	10,
                			classs	    :	{
                				window	:	'window',
                				//header:	'alphagray',
                				//body	:	'iphone',
                			},
                			tags		:	{
                				//footer	:	'<footer></footer>',
                				//header	:	'<header></header>',
                			},
                			resizable	:	true,
                			//footer	:	true,
                			//refresh	:	true,
                			//unique	:	"only",
                			//reload	:	true,
                			expand		:	true,
                			save		:	true,
                		},
                		Attributes		:	{
                			values	:	{
                				title	:	'title',
                			}
                		},
                		Plugins			:	{		
                			Ajax			:	{
                				Attributes		:	{
                					url		:	'href',
                				}
                			},
                			Lightbox		:	{
                				Configuration	:	{
                					classs	:	'alphagray',
                					multi	:	true,				
                				}
                			},
                			Resizable		:	{
                				resize	:	function(event, ui){
                					var $this	=	ui.element;
                					$this		=	$this.data($.getInjecteur('window'));
                					$this.Fx.setParams($this);
                				},
                			},
                		}
                	}
        };
        ApplicationConfig.prototype.getFilesConfig          =   function(){};
        ApplicationConfig.prototype.getAjaxConfig           =   function(){};
        
		this.initialized = true;
	}
}