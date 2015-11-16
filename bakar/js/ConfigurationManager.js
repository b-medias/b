/**
* Bakar (http://www.bakar.be)
*
* ConfigurationManager
*
* @link         http://www.bakar.be
* @copyright    Copyright (c) 2005-2016 Bakar. (http://www.bakar.be)
* @version      1.0
*/
function ConfigurationManager(){       
	ConfigurationManager.prototype.get                          =   function(configuration){
		switch(configuration){
			case 	'Selectable':
			configuration	=	this.getSelectableConfiguration();
			break;
			
			case    'Draggable':
			configuration	=	this.getDraggableConfiguration();
			break;
			
			case	'Resizable':
			configuration	=	this.getResizableConfiguration();
			break;
			
			case    'Bwindow':
			configuration	=	this.getWindowConfiguration();
			break;
			
			case    'Btimer':
			configuration	=	this.getTimerConfiguration();
			break;
			
			case    'Spinner':
			configuration	=	this.getSpinnerConfiguration();
			break;
			
			case    'Blightbox':
			configuration	=	this.getLightboxConfiguration();
			break;
			
			case	'Bajax':
			configuration	=	this.getAjaxConfiguration();
			break;
			
			case	'Bforms':
			configuration	=	this.getFormsConfiguration();
			break;
			
			case	'Bvalidators':
			configuration	=	this.getValidatorsConfiguration();
			break;
			
			case	'Bfiles':
			configuration	=	this.getFilesConfiguration();
			break;
		}
		return configuration;
	};
	ConfigurationManager.prototype.getAttr                      =   function(name){
		var attributes;
		
		switch(name){
			case 	'Selectable':
			attributes	=	this.getSelectableAttributes();
			break;
			
			case    'Draggable':
			attributes	=	this.getDraggableAttributes();
			break;
			
			case	'Resizable':
			attributes	=	this.getResizableAttributes();
			break;
			
			case    'Bwindow':
			attributes  =   this.getWindowAttributes();
			break;
			
			case    'Btimer':
			attributes  =   this.getTimerAttributes();
			break;
			
			case    'Spinner':
			attributes	=	this.getSpinnerAttributes();
			break;
			
			case	'Blightbox':
			attributes	=	this.getLightboxAttributes();
			break;
			
            case    'Bajax':
			attributes	=	this.getAjaxAttributes();
			break;
			
			case	'Bforms':
			attributes	=	this.getFormsAttributes();
			break;
			
			case	'Bvalidators':
			attributes	=	this.getValidatorsAttributes();
			break;
			
			case	'Bfiles':
			attributes	=	this.getFilesAttributes();
			break;
		}
		
		return attributes;
	};
	
	ConfigurationManager.prototype.getFilesConfiguration        =   function(){
		return	{			
			Plugins			:	{},
			Configuration	:	{
				events			:	null,
				auto            :	false,
				thumbnails		:	{
					btn	:	{
						show	:	true,
						trash	:	true,
						info	:	true,
						order	:	true,
					},
				},
				tags            :   {
					container	:	'<div></div>',
					dropzone	:	'<div></div>',
					thumbszone	:	'<div></div>',
					thumbs		:	'<div></div>',
					show        :	'<button></button>',
					trash       :	'<button></button>',
					checkbox    :	'<button></button>',
					info        :	'<button></button>',
					order		:	'<button></button>',
					browse		:	'<button></button>',
					progress    :   '<div></div>',
					progressBar	:	'<div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>',
					progressText:	'<span></span>',
					btnGroup    :   '<div></div>',
					loading		:   '<div></div>',
					dropper		:	'<div class="dropper"></div>',
				},
				classs		    :	{},
				css             :   {
					container	:	{},
					dropzone	:	{},
					thumbszone	:	{},
					thumbs		:	{},
					show		:	{},
					trash		:	{},
					checkbox	:	{},
					info		:	{},
					order		:	{},
					browse		:	{},
					progress	:	{},
					progressBar	:	{},
					progressText:	{},
					btnGroup	:	{},
					loading		:	{},
					dropper		:	{},
				},
				id              :   {},
				merged          :   true,
				selectorAdded   :   null,
				files           :   {
					success :   new Array(),
					removed :   new Array(),
					added   :   new Array(),
					loaded  :   new Array(),
				},
				values          :   {
					container		:	'',
					dropzone		:	'<p>Glisser / Déposer vos fichiers ici</p>',
					thumbszone		:	'',
					thumbs			:	'',
					show			:	'<span class="fa fa-eye"></span>',
					trash			:	'<span class="fa fa-trash-o"></span>',
					checkbox		:	'<span class="fa fa-square-o"></span>',
					info			:	'<span class="fa fa-info-circle"></span>',
					order			:	'',
					browse			:	'Parcourir mon disque dur...',
					progress		:	'',
					progressBar		:	'',
					progressText	:	'',
					btnGroup		:	'',
					dropper			:	'',
				}
			}
		}
	}	
	ConfigurationManager.prototype.getFilesAttributes           =   function(){
		var prefix	=	'data-files-';
		return  {
			params      :   prefix,
			events		:	prefix+'events',
			auto		:	prefix+'auto',
			tags		:	{},
			classs		:   {},
			css         :   {},
			id          :   {},
		};
	}

	ConfigurationManager.prototype.getSelectableConfiguration   =   function(){
		return  {
			appendTo    :   'body',
			autoRefresh :   true,
			cancel      :   'input, textarea, button, select, option',
			delay       :   0,
			disabled    :   false,
			distance    :   0,
			filter      :   '*',
			tolerance   :   'touch',
			
			/**
			*   METHODS
			*   -   destroy
			*   -   disable
			*   -   enable
			*   -   instance
			*   -   option()
			*   -   option(name)
			*   -   option(name, value)
			*   -   refresh
			*   -   widget
			*/
			start		:	function(ui){},
			stop		:	function(ui){},

			/**
			*   EVENT
			*   -   create
			*   -   selected
			*   -   selecting
			*   -   start
			*   -   stop    
			*   -   unselected
			*   -   unselecting
			*/
		};	
	}
	ConfigurationManager.prototype.getSelectableAttributes      =   function(){
		var prefix	=	'data-selectable-';
		return	{
			params		:	prefix,
			appendTo	:	prefix+'appendto',
			autoRefresh	:	prefix+'autorefresh',
			cancel		:	prefix+'cancel',
			delay		:	prefix+'delay',
			disabled	:	prefix+'disabled',
			distance	:	prefix+'distance',
			filter		:	prefix+'filter',
			tolerance	:	prefix+'tolerance',
		}
	}	
	
	ConfigurationManager.prototype.getWindowConfiguration       =   function(){
		return  {
			Plugins			:	{},
			Configuration	:	{
				events      :   null,
				parse       :   'json',
				zindex      :	20,
				auto        :	false,
						
				position    :   'center',
				positionX	:	0,
				positionY	:	0,
				spaceX      :	0,
				spaceY		:   0,
										
				style       :	null,
				unique		:	null,
						
				lightbox    :	false,
				live		:	false,
				one			:	false,
				silent		:	false,
				refresh		:	false,
				reload		:	false,
				compress	:	false,
				expand		:	false,
				footer		:	false,	
				save        :   false,
							
				header		:   true,
				title		:	true,
				close		:	true,
				fixed		:	true,
				replace		:	true,
				draggable	:	true,
				resizable   :	true,
				multiRefresh:	true,
				
				animate     :   {
					opacity :   1,
				},
				tags        :   {
					window      :	'<div></div>',
					header		:	'<div></div>',
					body		:	'<div></div>',
					footer		:	'<div></div>',
					title		:	'<h1></h1>',
					close		:	'<button></button>',
					refresh		:	'<button></button>',
					reload		:	'<button></button>',
					compress	:	'<button></button>',
					expand		:	'<button></button>',
					save		:	'<button></button>',
				},
				classs		:	{},
				css			:	{},
				id          :   {},
			}
		};
	};
	ConfigurationManager.prototype.getWindowAttributes          =   function(){
		var prefix  =   'data-bwindow-';
		
		return  {
			params      :   prefix,
			auto		:	prefix+'auto',
			animate		:	prefix+'animate',
			events		:	prefix+'events',
			parse		:	prefix+'parse',
			zindex		:	prefix+'zindex',
			position    :	prefix+'position',
			positionX	:	prefix+'positionx',
			positionY	:	prefix+'positiony',
			spaceX		:	prefix+'spacex',
			spaceY		:	prefix+'spacey',
					
			style		:	prefix+'style',
			unique		:	prefix+'unique',
					
			live		:	prefix+'live',
			one			:	prefix+'one',
			adjust		:	prefix+'adjust',
			lightbox	:	prefix+'lightbox',
			silent		:	prefix+'silent',
			refresh		:	prefix+'refresh',					
			reload		:	prefix+'reload',
			compress	:	prefix+'compress',
			expand		:	prefix+'expand',
			footer		:	prefix+'footer',
			save		:	prefix+'save',

			header		:	prefix+'header',
			title		:	prefix+'title',
			close		:	prefix+'close',
			fixed		:   prefix+'fixed',
			replace		:   prefix+'replace',
			draggable	:	prefix+'draggable',
			resizable	:	prefix+'resizable',
			
			request     :   prefix+'request',
			state       :   prefix+'state',
			multiRefresh:	prefix+'multirefresh',

			classs		:   {
				window	:	prefix+'class-window',
				header	:	prefix+'class-header',
				body	:	prefix+'class-body',
				footer	:	prefix+'class-footer',
				title	:	prefix+'class-title',
				close	:	prefix+'class-close',
				refresh	:	prefix+'class-refresh',
				reload	:	prefix+'class-reload',
				compress:	prefix+'class-compress',
				expand	:	prefix+'class-expand',
				save	:	prefix+'class-save',
			},
			id          :   {
				window  :	prefix+'id-window',
				header	:	prefix+'id-header',
				body	:	prefix+'id-body',
				footer	:	prefix+'id-footer',
				title	:	prefix+'id-title',
				close	:	prefix+'id-close',
				refresh	:	prefix+'id-refresh',
				reload	:	prefix+'id-reload',
				compress:   prefix+'id-compress',
				expand	:   prefix+'id-expand',
				save    :   prefix+'id-save',
			},
			css         :   {
				window	:	prefix+'css-window',
				header	:	prefix+'css-header',
				body	:	prefix+'css-body',
				footer	:	prefix+'css-footer',
				title	:	prefix+'css-title',
				close	:	prefix+'css-close',
				refresh	:	prefix+'css-refresh',
				reload	:	prefix+'css-reload',
				compress:	prefix+'css-compress',
				expand	:	prefix+'css-expand',
				save	:	prefix+'css-save',
			},	
			values      :   {
				window	:	prefix+'values-window',
				header	:	prefix+'values-header',
				body	:	prefix+'values-body',
				footer	:	prefix+'values-footer',
				title	:	prefix+'values-title',
				close	:	prefix+'values-close',
				refresh	:	prefix+'values-refresh',
				reload	:	prefix+'values-reload',
				compress:	prefix+'values-compress',
				expand	:	prefix+'values-expand',
				save	:	prefix+'values-save',
			},
			timer       :   {
				closeWindow		:	'data-btimer-closewindow',
				showWindow		:	'data-btimer-showwindow',
				closeLightbox	:	'data-btimer-closeLightbox',
				showLightbox	:	'data-btimer-showLightbox',
			},
			tags		:	{
				window	:	prefix+'tag-window',
				header	:	prefix+'tag-header',
				body	:	prefix+'tag-body',
				footer	:	prefix+'tag-footer',
				title	:	prefix+'tag-title',
				close	:	prefix+'tag-close',
				refresh	:	prefix+'tag-refresh',
				reload	:	prefix+'tag-reload',
				compress:	prefix+'tag-compress',
				expand	:	prefix+'tag-expand',
				save	:	prefix+'tag-save',
			}
		};
	};
	
	ConfigurationManager.prototype.getTimerConfiguration        =   function(){
		return  {
			Configuration	:	{
				auto			:	false,
				showWindow      :   10,
				closeWindow     :   10,
				showLightbox    :   10,
				closeLightbox   :   10,
				closeLoading    :   10,
				sendAjax		:	10,
			},
			Keys			:	{
				id				:	$.md5(),
			},
		};
	};
	ConfigurationManager.prototype.getTimerAttributes           =   function(){
		var prefix =   'data-btimer-';
		return  {
			auto			:	prefix+'auto',
			closeWindow     :   prefix+'closewindow',
			showWindow      :   prefix+'showwindow',
			closeLightbox   :   prefix+'closelightbox',
			showLightbox    :   prefix+'showlightbox',
			sendAjax		:	prefix+'sendajax',
			keys			:	{
				id	:	prefix+'id',
			}
		};
	};
	
	ConfigurationManager.prototype.getSpinnerConfiguration      =   function(){
		return	{
            lines		:   17,
            length		:   13,         // The length of each line
            width		:   3,          // The line thickness
            radius		:   14,         // The radius of the inner circle
            corners		:   1,          // Corner roundness (0..1)
            rotate		:   0,          // The rotation offset
            direction	:   1,          // 1: clockwise, -1: counterclockwise
            color		:   '#999999',  // #rgb or #rrggbb or array of colors
            speed		:   1,          // Rounds per second
            trail		:   100,        // Afterglow percentage
            shadow		:   true,       // Whether to render a shadow
            hwaccel		:   true,       // Whether to use hardware acceleration
            className	:   'spinner',  // The CSS class to assign to the spinner
            zIndex      :   1,          // The z-index (defaults to 2000000000)
            position	:	'relative',
		};
	};
	ConfigurationManager.prototype.getSpinnerAttribtues         =   function(){
		var prefix	=	'data-bspinner-';
		return	{
			lines		:	prefix+'lines',
			length		:	prefix+'length',
			width		:	prefix+'width',
			radius		:	prefix+'radius',
			corners		:	prefix+'corners',
			rotate		:	prefix+'rotate',
			direction	:	prefix+'direction',
			color		:	prefix+'color',
			speed		:	prefix+'speed',
			trail		:	prefix+'trail',
			shadow		:	prefix+'shadow',
			hwaccel		:	prefix+'hwaccel',
			className	:	prefix+'classname',
			zIndex		:	prefix+'zindex',
			position	:	prefix+'position',
		};
	};
	
	ConfigurationManager.prototype.getLightboxConfiguration     =   function(){
        return  {
			Plugins			:	{},
			Dom				:	{},
			Configuration	:	{
				id			:	null,
				css			:	null,
				classs		:	null,
				zindex		:	0,
				multi		:	true,
				auto		:	false,
				superpose	:	true,
				style		:	null,
				tags		:	{
					lightbox	:	'<div></div>',
				},
				value		:	'',
				connecteurs	:	[],
			},
			Keys			:	{
				id	:	$.md5(),
			},
		};
	};
	ConfigurationManager.prototype.getLightboxAttributes        =   function(){
		var prefix	=	'data-blightbox-';
		return {
			id				:	prefix+'id',
			css				:	prefix+'css',
			classs			:	prefix+'class',
			zindex			:	prefix+'zindex',
			multi			:	prefix+'multi',
			auto			:	prefix+'auto',
			superpose		:	prefix+'superpose',
			style			:	prefix+'style',
			value			:	prefix+'value',
			connecteurs		:	prefix+'connecteurs',
			configuration	:	prefix+'configuration',
			params			:	prefix+'params',
			tags			:	{
				lightbox	:	prefix+'tag-lightbox',
			},
			keys			:	{
				id			:	prefix+'keys-id',
			}
		};
	};
	
	ConfigurationManager.prototype.getDraggableConfiguration    =   function(){
		return {
			addClasses			:	false,
			appendTo			:	'parent',
			axis				:	false,
			cancel				:	'input,textarea,button,select,option',
			connectToSortable	:	false,
			containment			:	false,
			cursor				:	'move',
			cursorAt			:	false,
			delay				:	0,
			disabled			:	false,
			distance			:	1,
			grid				:	false,
			handle				:	'.header:first',
			helper				:	'original',
			iframeFix			:	false,
			opacity				:	false,
			refreshPositions	:	false,
			revert				:	false,
			revertDuration		:	500,
			scope				:	'default',
			scroll				:	true,
			scrollSensitivity	:	0,
			scrollSpeed			:	0,
			snap				:	false,
			snapMode			:	'both',
			snapTolerance		:	0,
			stack				:	false,
			zindex				:	false,
			start				:	function(){},
			drag				:	function(event, ui){
				var $this	=	ui.helper;
				$this		=	$this.data($.getInjecteur('lightbox'));
				if($.isDefined($this)){
					$this.Fx.setParams($this);
					$this.Fx.resize();
				}
			}
		};
	};
	ConfigurationManager.prototype.getDraggableAttributes       =   function(){
		var prefix	=	'data-bdraggable-';
		return {
			addClasses			:	prefix+'addclasses',
			appendTo			:	prefix+'appendto',
			axis				:	prefix+'axis',
			cancel				:	prefix+'cancel',
			connectToSortable	:	prefix+'connecttosortable',
			containment			:	prefix+'containment',
			cursor				:	prefix+'cursor',
			cursorAt			:	prefix+'cursorat',
			delay				:	prefix+'delay',
			disabled			:	prefix+'disabled',
			distance			:	prefix+'distance',
			grid				:	prefix+'grid',
			handle				:	prefix+'handle',
			helper				:	prefix+'helper',
			iframeFix			:	prefix+'iframefix',
			opacity				:	prefix+'opacity',
			refreshPositions	:	prefix+'refreshpositions',
			revert				:	prefix+'revert',
			revertDuration		:	prefix+'revertduration',
			scope				:	prefix+'scope',
			scroll				:	prefix+'scroll',
			scrollSensitivity	:	prefix+'scrollsensitivity',
			scrollSpeed			:	prefix+'scrollspeed',
			snap				:	prefix+'snap',
			snapMode			:	prefix+'snapmode',
			snapTolerance		:	prefix+'snaptolerance',
			stack				:	prefix+'stack',
			zindex				:	prefix+'zindex',
		};
	};
	
	ConfigurationManager.prototype.getResizableConfiguration    =   function(){
		return	{
			alsoResize		:	false,
			animate			:	false,
			animateDuration	:	'slow',
			animateEasing	:	'swing',
			aspectRatio		:	false,
			autoHide		:	false,
			cancel			:	'input, textarea, button, select, option',
			containment		:	false,
			delay			:	0,
			disabled		:	false,
			distance		:	1,
			ghost			:	false,
			grid			:	false,
			handles			:	'e, s, se',
			helper			:	false,
			maxHeight		:	null,
			maxWidth		:	null,
			minHeight		:	null,
			minWidth		:	null,
			stop			:	function(event, ui){}
		};
	};
	ConfigurationManager.prototype.getResizableAttributes       =   function(){
		var prefix	=	'data-bresizable-';
		return	{
			alsoResize		:	prefix+'alsoresize',
			animate			:	prefix+'animate',
			animateDuration	:	prefix+'animateduration',
			animateEasing	:	prefix+'animateeasing',
			aspectRatio		:	prefix+'aspectratio',
			autoHide		:	prefix+'autohide',
			cancel			:	prefix+'cancel',
			containment		:	prefix+'containment',
			delay			:	prefix+'delay',
			disabled		:	prefix+'disabled',
			distance		:	prefix+'distance',
			ghost			:	prefix+'ghost',
			grid			:	prefix+'grid',
			handles			:	prefix+'handles',
			helper			:	prefix+'helper',
			maxHeight		:	prefix+'maxheight',
			maxWidth		:	prefix+'maxwidth',
			minHeight		:	prefix+'minheight',
			minWidth		:	prefix+'minwidth',
		};	
	};
	
	ConfigurationManager.prototype.getAjaxConfiguration         =   function(){
		return	{
			Configuration	:	{
				url			:	null,
				crossDomain	:	false,
				cache		:	true,
				contentType	:	'application/x-www-form-urlencoded; charset=UTF-8',
				async		:	true,
				enctype		:	'multipart/form-data',
				method		:	'get',
				dataType	:	'json',
				processData	:	true,
				data		:	null,
				auto		:	false,
				zindex		:	20,
			},
			Keys			:	{
				id	:	$.md5(),
			}
		};
	};
	ConfigurationManager.prototype.getAjaxAttributes            =   function(){
		var prefix	=	'data-bajax-';
		return	{
			url			:	prefix+'url',
			accepts		:	prefix+'accepts',
			crossDomain	:	prefix+'crossdomain',
			cache		:	prefix+'cache',
			contentType	:	prefix+'contenttype',
			async		:	prefix+'async',
			enctype		:	prefix+'enctype',
			method		:	prefix+'method',
			datatype	:	prefix+'datatype',
			processData	:	prefix+'processdata',
			data		:	prefix+'data',
			beforeSend	:	prefix+'beforesend',
			success		:	prefix+'success',
			error		:	prefix+'error',
			complete	:	prefix+'complete',
			xhr			:	prefix+'xhr',
			auto		:	prefix+'auto',
			dataType	:	prefix+'datatype',
			zindex		:	prefix+'zindex',
			keys		:	{
				id		:	prefix+'keys-id',
			}
		};
	};

	ConfigurationManager.prototype.getFormsConfiguration        =   function(){
		return	{
			Configuration	:	{
				events			:	'click',
				live			:	false,
				one				:	false,
				auto			:	true,
				multiErrorBox	:	false,
				staticControl	:	true,
				sendControl		:	true,
				zindex			:	20,
				onlyVisible		:	false,
				ajax			:	true,
				reloadWindow	:	true,
				fx				:	{
					error		:	null,
					success		:	null,
					complete	:	null,
				},
			},
			Errors			:	{},
			Plugins			:	{
				Validators	:	{
					Configuration	:	{
					}
				}
			}
		};
	};
	ConfigurationManager.prototype.getFormsAttributes           =   function(){
		var prefix	=	'data-bforms-';
		return	{
			events			:	prefix+'events',
			live			:	prefix+'live',
			one				:	prefix+'one',
			auto			:	prefix+'auto',
			reloadWindow	:	prefix+'reloadwindow',
			multiErrorBox	:	prefix+'multierrorbox',
			staticControl	:	prefix+'staticcontrol',
			sendControl		:	prefix+'sendcontrol',
			zindex			:	prefix+'zindex',
			onlyVisible		:	prefix+'onlyvisible',
			ajax			:	prefix+'ajax',
		};
	};

	ConfigurationManager.prototype.getValidatorsConfiguration   =   function(){
		return {
			Configuration	:	{
				defaut	:	{
					Configuration	:	{
						auto		:	true,
						state		:	true,
						sender		:	false,
						style		:	{
							error	:	{
								css		:	{},
								classes	:	'red',	
							},
							valid	:	{
								css		:	{},
								classes	:	'green',
							},
						},
						extentions	:	[],
						errors		:	[],
						error		:	null,
						value		:	null,
						max			:	null,
						min			:	null,
						maxSize		:	null,
						minSize		:	null,
						maxLength	:	null,
						minLength	:	null,
						maxFiles	:	null,
						minFiles	:	null,
						maxWidth	:	null,
						minWidth	:	null,
						maxHeight	:	null,
						minHeight	:	null,
						type		:	null,
						label		:	null,
						recordExists:	null,
						notEmpty	:	null,
						name		:	null,
						noSpace		:	null,
					},
					Attributes		:	this.getValidatorsAttributes(),
				},
			},
			NameSpace		:	null,
			Attributes		:	{},
			Dom				:	{},
		};
	};
	ConfigurationManager.prototype.getValidatorsAttributes      =   function(){
		var prefix	=	'data-bvalidators-';
		return	{
			auto		:	prefix+'auto',
			sender		:	prefix+'sender',
			extentions	:	prefix+'extentions',
			errors		:	prefix+'errors',
			error		:	prefix+'error',
			value		:	prefix+'value',
			max			:	prefix+'max',
			min			:	prefix+'min',
			maxSize		:	prefix+'maxsize',
			minSize		:	prefix+'minsize',
			maxLength	:	prefix+'maxlength',
			minLength	:	prefix+'minlength',
			maxWidth	:	prefix+'maxwidth',
			minWidth	:	prefix+'minwidth',
			maxHeight	:	prefix+'maxheight',
			minHeight	:	prefix+'minheight',
			maxFiles	:	prefix+'maxfiles',
			minFiles	:	prefix+'minfiles',
			type		:	prefix+'type',
			label		:	prefix+'label',
			name		:	prefix+'name',
			recordExists:	prefix+'recordexists',
			notEmpty    :   prefix+'notempty',
			required	:	'required',
			state		:	prefix+'state',
			namespace	:	'name',
		};
	};
}