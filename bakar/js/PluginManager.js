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