// JavaScript Document
(function($){
	var Config		=	new Object();
	Config.attr		=	new Object();
	Config.object   =	new Object();
	
	Config.prepare	=	function(o){
		if(!$.isPlainObject(o)){
			o	=	new Object();
		}
		return o;
	}
	Config.setObject	=	function(object){
		Config.object	=	$.extend(true, true, Config.object, object);
      return this;
	}
	Config.getObject	=	function(){
		return Config.object;
	}
	
	Config.addConfig	=	function(type){
		switch(type){
			case 'events':
			Config.object.live		=	false;
			Config.object.events	=	null;
			Config.object.one		=	false;
			Config.object.auto		=	false;
			break;
			
			case 'draggable':
			Config.object.draggable	=	Config.prepare(Config.object.draggable);
			
			Config.object.draggable.draggable	=	true;
			Config.object.draggable.handle		=	'.handler';
			Config.object.draggable.cursor		=	'move';	
			break;
			
			case 'base':		
			Config.object.temp			=	300;
			Config.object.parse			=	'html';
			Config.object.style			=	null;
			Config.object.lightbox		=	false;
			Config.object.silent		=	false;
			Config.object.unique		=	null;
			Config.object.spaceX		=	0;
			Config.object.spaceY		=	0;
			Config.object.positionX		=	0;
			Config.object.positionY		=	0;
			Config.object.position		=	'center';
			Config.object.multiLightbox	=	false;
			Config.object.zindex		=	20;
			Config.object.toFix			=	true;
			Config.object.bodyScroll	=	true;
			Config.object.title			=	true;
			Config.object.close			=	true;
			Config.object.refresh		=	false;
			Config.object.footer		=	false;
			Config.object.replaceTitle	=	true;
			Config.object.autoAdjust	=	false;
			Config.object.trash			=	true;
			Config.object.info			=	true;
			Config.object.show			=	true;
			Config.object.checkbox		=	false;
			Config.object.data			=	new Object();
			Config.object.restruct		=	false;
			break;
			
			case 'base Forms':
			Config.object.multiErrorBox	=	false;
			Config.object.sendControl	=	true;
			Config.object.staticControl	=	true;
			Config.object.windowError	=	new Object();
			break;
			
			case 'base Files':
			Config.object.selectorForAddThumbs	=	null;
			Config.object.mergeThumbs			=	true;
			Config.object.fileSucess			=	new Array();
			Config.object.firstFile				=	null;
			Config.object.filesRemove			=	new Array();
			break;
			
			case 'elements Files':
			Config.object.elements	=	Config.prepare(Config.object.elements);
			Config.object.elements.container	=	'<div></div>';
			Config.object.elements.dropzone		=	'<div></div>';
			Config.object.elements.thumbszone	=	'<div></div>';
			Config.object.elements.thumbs		=	'<div></div>';
			Config.object.elements.show			=	'<button></button>';
			Config.object.elements.trash		=	'<button></button>';
			Config.object.elements.checkbox		=	'<button></button>';
			Config.object.elements.info			=	'<button></button>';
			Config.object.elements.browse		=	'<button></button>';
			Config.object.elements.progress		=	'<div></div>';
			Config.object.elements.progressBar	=	'<div></div>';
			Config.object.elements.progressText	=	'<span></span>';
			Config.object.elements.btnGroup		=	'<div></div>';
			break;
			
			case 'class Files':
			Config.object.classs						=	Config.prepare(Config.object.classs);
			Config.object.classs.container		=	'';
			Config.object.classs.dropzone		=	'';
			Config.object.classs.thumbszone		=	'';
			Config.object.classs.thumbs			=	'';
			Config.object.classs.show			=	'';
			Config.object.classs.trash			=	'';
			Config.object.classs.checkbox		=	'';
			Config.object.classs.info			=	'';
			Config.object.classs.browse			=	'';
			Config.object.classs.progress		=	'';
			Config.object.classs.progressBar	=	'';
			Config.object.classs.progressText	=	'';
			Config.object.classs.btnGroup		=	'';
			break;
			
			case 'css Files':
			Config.object.css				=	Config.prepare(Config.object.css);
			Config.object.css.container		=	new Object();
			Config.object.css.dropzone		=	new Object();
			Config.object.css.thumbszone	=	new Object();
			Config.object.css.thumbs		=	new Object();
			Config.object.css.show			=	new Object();
			Config.object.css.trash			=	new Object();
			Config.object.css.checkbox		=	new Object();
			Config.object.css.info			=	new Object();
			Config.object.css.browse		=	new Object();
			Config.object.css.progress		=	new Object();
			Config.object.css.progressBar	=	new Object();
			Config.object.css.progressText	=	new Object();
			Config.object.css.btnGroup		=	new Object();
			break;
			
			case 'id Files':
			Config.object.id				=	Config.prepare(Config.object.id);
			Config.object.id.container		=	null;
			Config.object.id.dropzone		=	null;
			Config.object.id.thumbszone		=	null;
			Config.object.id.thumbs			=	null;
			Config.object.id.show			=	null;
			Config.object.id.trash			=	null;
			Config.object.id.checkbox		=	null;
			Config.object.id.info			=	null;
			Config.object.id.browse			=	null;
			Config.object.id.progress		=	null;
			Config.object.id.progressBar	=	null;
			Config.object.id.progressText	=	null;
			Config.object.id.btnGroup		=	null;
			break;
			
			case 'value Files':
			Config.object.value					=	Config.prepare(Config.object.value);
			Config.object.value.container		=	'';
			Config.object.value.dropzone		=	'<p>Glisser / Déposer vos fichiers ici</p>';
			Config.object.value.thumbszone		=	'';
			Config.object.value.thumbs			=	'';
			Config.object.value.show			=	'<span class="fa fa-eye"></span>';
			Config.object.value.trash			=	'<span class="fa fa-trash-o"></span>';
			Config.object.value.checkbox		=	'<span class="fa fa-square-o"></span>';
			Config.object.value.info			=	'<span class="fa fa-info-circle"></span>';
			Config.object.value.browse			=	'Parcourir mon disque dur...';
			Config.object.value.progress		=	'';
			Config.object.value.progressBar		=	'';
			Config.object.value.progressText	=	'';
			Config.object.value.btnGroup		=	'';
			break;
			
			case 'spinner':
			Config.object.spinner			=	Config.prepare(Config.object.spinner);
			
			Config.object.spinner.lines		= 	17; 		// The number of lines to draw
			Config.object.spinner.length	=	13; 		// The length of each line
			Config.object.spinner.width		=	3; 			// The line thickness
			Config.object.spinner.radius	= 	14; 		// The radius of the inner circle
			Config.object.spinner.corners	=	1; 			// Corner roundness (0..1)
			Config.object.spinner.rotate	=	0; 			// The rotation offset
			Config.object.spinner.direction	=	1; 			// 1: clockwise, -1: counterclockwise
			Config.object.spinner.color		=	'#999999'; 	// #rgb or #rrggbb or array of colors
			Config.object.spinner.speed		=	1; 			// Rounds per second
			Config.object.spinner.trail		= 	100; 		// Afterglow percentage
			Config.object.spinner.shadow	=	true; 		// Whether to render a shadow
			Config.object.spinner.hwaccel	= 	true; 		// Whether to use hardware acceleration
			Config.object.spinner.className	= 	'spinner'; 	// The CSS class to assign to the spinner
			Config.object.spinner.zIndex	=	1; 			// The z-index (defaults to 2000000000)
			break;
			
			case 'animate':
			Config.object.animate			=	Config.prepare(Config.object.animate);
			Config.object.animate.opacity	=	1;
			break;
									
			case 'class Window':
			Config.object.classs			=	Config.prepare(Config.object.classs);			
			Config.object.classs.title		=	'';
			Config.object.classs.content	=	'';
			Config.object.classs.window		=	'';
			Config.object.classs.lightbox	=	'';
			Config.object.classs.close		=	'';
			Config.object.classs.refresh	=	'';
			Config.object.classs.footer		=	'';
			break;
			
			case 'css Window':
			Config.object.css	=	Config.prepare(Config.object.css);

			Config.object.css.title		=	new Object();
			Config.object.css.content	=	new Object();
			Config.object.css.window	=	new Object();
			Config.object.css.lightbox	=	new Object();
			Config.object.css.close		=	new Object();
			Config.object.css.refresh	=	new Object();
			Config.object.css.footer	=	new Object();
			break;
			
			case 'id Window':
			Config.object.id	=	Config.prepare(Config.object.id);

			Config.object.id.title		=	null;
			Config.object.id.content	=	null;
			Config.object.id.window		=	null;
			Config.object.id.lightbox	=	null;
			Config.object.id.close		=	null;
			Config.object.id.refresh	=	null;
			Config.object.id.footer		=	null;
			break;
			
			case 'elements Window':
			Config.object.elements			=	Config.prepare(Config.object.elements);
			Config.object.elements.title	=	'<h4></h4>';
			Config.object.elements.content	=	'<div></div>';
			Config.object.elements.close	=	'<button></button>';
			Config.object.elements.refresh	=	'<button></button>';
			Config.object.elements.window	=	'<div></div>';
			Config.object.elements.lightbox	=	'<div></div>';
			Config.object.elements.footer	=	'<div></div>';
			Config.object.elements.reload	=	'<button></button>';
			break;
			
			case 'value Window':
			Config.object.value	=	Config.prepare(Config.object.value);
			
			Config.object.value.title	=	'B-window';
			Config.object.value.content	=	'';
			Config.object.value.window	=	'';
			Config.object.value.lightbox=	'';
			Config.object.value.close	=	'<span class="fa fa-times"></span>';
			Config.object.value.refresh	=	'<span class="fa fa-refresh"></span>';
			Config.object.value.footer	=	'powered by Bakar';
			Config.object.value.state	=	true;
			break;
			
			case 'control':
			Config.object.control	=	Config.prepare(Config.object.control);
			break;
			
			case 'loading':
			Config.object.elements 	= 	Config.prepare(Config.object.elements);
			Config.object.css		=	Config.prepare(Config.object.css);
			Config.object.value		=	Config.prepare(Config.object.value);
			Config.object.classs	=	Config.prepare(Config.object.classs);
			Config.object.id		=	Config.prepare(Config.object.id);
			
			Config.object.loading				=	false;
			Config.object.elements.loading		=	'<div></div>';
			Config.object.css.loading			=	new Object();
			Config.object.value.loading			=	'<p>Chargement en cours, veuillez patienter svp...</p>';
			Config.object.classs.loading		=	'';
			Config.object.id.loading			=	null;
			break;
		}
		return this;
	}
	Config.reset		=	function(){
		Config.object	=	new Object();
		Config.attr		=	new Object();
		return this;
	}
	Config.addAttr		=	function(type){
		Config.object.attr = Config.prepare(Config.object.attr);
		switch(type){
			case 'base':
			Config.object.attr.temp			=	'data-temp';
			Config.object.attr.parse		=	'data-parse';
			Config.object.attr.style		=	'data-style';
			Config.object.attr.lightbox		=	'data-lightbox';
			Config.object.attr.silent		=	'data-silent';
			Config.object.attr.unique		=	'data-unique';
			Config.object.attr.spaceX		=	'data-spacex';
			Config.object.attr.spaceY		=	'data-spacey';
			Config.object.attr.positionX	=	'data-positionx';
			Config.object.attr.positionY	=	'data-positiony';
			Config.object.attr.position		=	'data-position';
			Config.object.attr.multiLightbox=	'data-multilightbox';
			Config.object.attr.zindex		=	'data-zindex';
			Config.object.attr.toFix		=	'data-tofix';
			Config.object.attr.bodyScroll	=	'data-bodyscroll';
			Config.object.attr.title		=	'data-title';
			Config.object.attr.close		=	'data-close';
			Config.object.attr.refresh		=	'data-refresh';
			Config.object.attr.footer		=	'data-footer';
			Config.object.attr.replaceTitle	=	'data-replacetitle';
			Config.object.attr.autoAdjust	=	'data-autoadjust';
			Config.object.attr.trash		=	'data-trash';
			Config.object.attr.info			=	'data-info';
			Config.object.attr.show			=	'data-show';
			Config.object.attr.checkbox		=	'data-checkbox';
			break;
			
			case 'base Forms':
			Config.object.attr.staticControl=	'data-staticcontrol';
			Config.object.attr.sendControl	=	'data-sendcontrol';
			Config.object.attr.multiErrorBox=	'data-multierrorbox';
			break;
			
			case 'base Files':
			Config.object.attr.selectorForAddThumbs	=	'data-selectorforaddthumbs';
			Config.object.attr.mergeThumbs			=	'data-mergetthumbs';
			break;
			
			case 'id Files':
			Config.object.attr.id				=	Config.prepare(Config.object.attr.id);
			Config.object.attr.id.container		=	'data-id-container';
			Config.object.attr.id.dropzone		=	'data-id-dropzone';
			Config.object.attr.id.thumbszone	=	'data-id-thumbszone';
			Config.object.attr.id.thumbs		=	'data-id-thumbs';
			Config.object.attr.id.show			=	'data-id-show';
			Config.object.attr.id.trash			=	'data-id-trash';
			Config.object.attr.id.checkbox		=	'data-id-checkbox';
			Config.object.attr.id.browse		=	'data-id-browse';
			Config.object.attr.id.progress		=	'data-id-progress';
			Config.object.attr.id.progressBar	=	'data-id-progressbar';
			Config.object.attr.id.progressText	=	'data-id-progresstext';
			Config.object.attr.id.btnGroup		=	'data-id-btngroup';
			Config.object.attr.id.info			=	'data-id-info';
			break;
			
			case 'css Files':
			Config.object.attr.css				=	Config.prepare(Config.object.attr.css);
			Config.object.attr.css.container	=	'data-css-container';
			Config.object.attr.css.dropzone		=	'data-css-dropzone';
			Config.object.attr.css.thumbszone	=	'data-css-thumbszone';
			Config.object.attr.css.thumbs		=	'data-css-thumbs';
			Config.object.attr.css.show			=	'data-css-show';
			Config.object.attr.css.trash		=	'data-css-trash';
			Config.object.attr.css.checkbox		=	'data-css-checkbox';
			Config.object.attr.css.browse		=	'data-css-browse';
			Config.object.attr.css.progress		=	'data-css-progress';
			Config.object.attr.css.progressBar	=	'data-css-progressbar';
			Config.object.attr.css.progressText	=	'data-css-progresstext';
			Config.object.attr.css.btnGroup		=	'data-css-btngroup';
			Config.object.attr.css.info			=	'data-css-info';
			break;
			
			case 'class Files':
			Config.object.attr.classs				=	Config.prepare(Config.object.attr.classs);
			Config.object.attr.classs.container		=	'data-classs-container';
			Config.object.attr.classs.dropzone		=	'data-classs-dropzone';
			Config.object.attr.classs.thumbszone	=	'data-classs-thumbszone';
			Config.object.attr.classs.thumbs		=	'data-classs-thumbs';
			Config.object.attr.classs.show			=	'data-classs-show';
			Config.object.attr.classs.trash			=	'data-classs-trash';
			Config.object.attr.classs.checkbox		=	'data-classs-checkbox';
			Config.object.attr.classs.browse		=	'data-classs-browse';
			Config.object.attr.classs.progress		=	'data-classs-progress';
			Config.object.attr.classs.progressBar	=	'data-classs-progressbar';
			Config.object.attr.classs.progressText	=	'data-classs-progresstext';
			Config.object.attr.classs.btnGroup		=	'data-classs-btngroup';
			Config.object.attr.classs.info			=	'data-classs-info';
			break;
			
			case 'value Files':
			Config.object.attr.value				=	Config.prepare(Config.object.attr.value);
			Config.object.attr.value.container		=	'data-value-container';
			Config.object.attr.value.dropzone		=	'data-value-dropzone';
			Config.object.attr.value.thumbszone		=	'data-value-thumbszone';
			Config.object.attr.value.thumbs			=	'data-value-thumbs';
			Config.object.attr.value.show			=	'data-value-show';
			Config.object.attr.value.trash			=	'data-value-trash';
			Config.object.attr.value.checkbox		=	'data-value-checkbox';
			Config.object.attr.value.browse			=	'data-value-browse';
			Config.object.attr.value.progress		=	'data-value-progress';
			Config.object.attr.value.progressBar	=	'data-value-progressbar';
			Config.object.attr.value.progressText	=	'data-value-progresstext';
			Config.object.attr.value.btnGroup		=	'data-value-btngroup';
			Config.object.attr.value.info			=	'data-value-info';
			break;
			
			case 'events':
			Config.object.attr.live		=	'data-live';
			Config.object.attr.events	=	'data-events';
			Config.object.attr.one		=	'data-one';
			break;
			
			case 'ajax':
			Config.prepare(Config.object.ajax);
			
			Config.object.attr.ajax	=	$.Ajax.getAttr();
			break;
			
			case 'spinner':
			Config.object.attr.spinner			=	Config.prepare(Config.object.attr.spinner);
			
			Config.object.attr.spinner.lines	=	'data-spinner-lines';
			Config.object.attr.spinner.length	=	'data-spinner-length';
			Config.object.attr.spinner.width	=	'data-spinner-width';
			Config.object.attr.spinner.radius	=	'data-spinner-radius';
			Config.object.attr.spinner.corners	=	'data-spinner-corners';
			Config.object.attr.spinner.rotate	=	'data-spinner-rotate';
			Config.object.attr.spinner.direction=	'data-spinner-direction';
			Config.object.attr.spinner.color	=	'data-spinner-color';
			Config.object.attr.spinner.speed	=	'data-spinner-speed';
			Config.object.attr.spinner.trail	=	'data-spinner-trail';
			Config.object.attr.spinner.shadow	=	'data-spinner-shadow';
			Config.object.attr.spinner.hawaccel	=	'data-spinner-hawaccel';
			Config.object.attr.spinner.className=	'data-spinner-classname';
			Config.object.attr.spinner.zIndex	=	'data-spinner-zindex';
			break;
			
			case 'class Window':
			Config.object.attr.classs			=	Config.prepare(Config.object.attr.classs);

			Config.object.attr.classs.title		=	'data-class-title';
			Config.object.attr.classs.content	=	'data-class-content';
			Config.object.attr.classs.window	=	'data-class-window';
			Config.object.attr.classs.lightbox	=	'data-class-lightbox';
			Config.object.attr.classs.close		=	'data-class-close';
			Config.object.attr.classs.refresh	=	'data-class-refresh';
			Config.object.attr.classs.footer	=	'data-class-footer';
			break;
			
			case 'loading':
			Config.object.attr.classs			=	Config.prepare(Config.object.attr.classs);
			Config.object.attr.id				=	Config.prepare(Config.object.attr.id);
			Config.object.attr.css				=	Config.prepare(Config.object.attr.css);
			Config.object.attr.value			=	Config.prepare(Config.object.attr.value);
			
			Config.object.attr.classs.loading	=	'data-classs-loading';
			Config.object.attr.id.loading		=	'data-id-loading';
			Config.object.attr.css.loading		=	'data-css-loading';
			Config.object.attr.value.loading	=	'data-value-loading';
			break;
			
			case 'css Window':
			Config.object.attr.css			=	Config.prepare(Config.object.attr.css);

			Config.object.attr.css.title	=	'data-css-title';
			Config.object.attr.css.content	=	'data-css-content';
			Config.object.attr.css.window	=	'data-css-window';
			Config.object.attr.css.lightbox	=	'data-css-lightbox';
			Config.object.attr.css.close	=	'data-css-close';
			Config.object.attr.css.refresh	=	'data-css-refresh';
			Config.object.attr.css.footer	=	'data-css-footer';
			break;
			
			case 'id Window':
			Config.object.attr.id			=	Config.prepare(Config.object.attr.id);
			
			Config.object.attr.id.title		=	'data-id-title';
			Config.object.attr.id.content	=	'data-id-content';
			Config.object.attr.id.window	=	'data-id-window';
			Config.object.attr.id.lightbox	=	'data-id-lightbox';
			Config.object.attr.id.close		=	'data-id-close';
			Config.object.attr.id.refresh	=	'data-id-refresh';
			Config.object.attr.id.footer	=	'data-id-footer';
			break;
			
			case 'value Window':
			Config.object.attr.value			=	Config.prepare(Config.object.attr.value);
			
			Config.object.attr.value.title		=	'data-value-title';
			Config.object.attr.value.content	=	'data-value-content';
			Config.object.attr.value.window		=	'data-value-window';
			Config.object.attr.value.lightbox	=	'data-value-lightbox';
			Config.object.attr.value.close		=	'data-value-close';
			Config.object.attr.value.refresh	=	'data-value-refresh';
			Config.object.attr.value.footer		=	'data-value-footer';
			break;
			
			case 'control':
			Config.object.attr.control					=	Config.prepare(Config.object.attr.control);
			Config.object.attr.control.notEmpty			=	'data-control-notempty';
			Config.object.attr.control.type				=	'data-control-type';
			Config.object.attr.control.notNull			=	'data-control-notnull';
			Config.object.attr.control.max				=	'data-control-max';
			Config.object.attr.control.min				=	'data-control-min';
			Config.object.attr.control.maxLength		=	'data-control-maxlength';
			Config.object.attr.control.minLength		=	'data-control-minlength';
			Config.object.attr.control.maxFiles			=	'data-control-maxfiles';
			Config.object.attr.control.minFiles			=	'data-control-minfiles';
			Config.object.attr.control.notSpecialChars	=	'data-control-notspecialchars';
			Config.object.attr.control.maxSize			=	'data-control-maxsize';
			Config.object.attr.control.minSize			=	'data-control-minsize';
			Config.object.attr.control.required			=	'required';
			Config.object.attr.control.maxWidth			=	'data-control-maxwidth';
			Config.object.attr.control.minWidth			=	'data-control-minwidth';
			break;
		}
		return this;
	}
	Config.generateOne	=	function(type, element){
		var object	=	new Object();
		switch(type){
			case 'control':		
			object.type 			= 	element.attr(Config.object.attr.control.type);
			object.notNull			=	element.attr(Config.object.attr.control.notNull);
			object.max				=	element.attr(Config.object.attr.control.max);
			object.min				=	element.attr(Config.object.attr.control.min);
			object.maxLength		=	element.attr(Config.object.attr.control.maxLength);
			object.minLength		=	element.attr(Config.object.attr.control.minLength);
			object.maxFiles			=	element.attr(Config.object.attr.control.maxFiles);
			object.minFiles			=	element.attr(Config.object.attr.control.minFiles);
			object.notSpecialChars	=	element.attr(Config.object.attr.control.notSpecialChars);
			object.required			=	element.attr(Config.object.attr.control.required);
			break;
			
			case 'events':
			object.live				=	element.attr(Config.object.attr.live);
			object.events			=	element.attr(Config.object.attr.events);
			object.one				=	element.attr(Config.object.attr.one);
			break;
			
			case 'base Forms':
			object.staticControl	=	element.attr(Config.object.attr.staticControl);
			object.sendControl		=	element.attr(Config.object.attr.sendControl);
			object.multiErrorBox	=	element.attr(Config.object.attr.multiErrorBox);
			break;
			
			case 'base Files':
			object.mergeThumbs			=	element.attr(Config.object.attr.mergeThumbs);
			object.selectorForAddThumbs	=	element.attr(Config.object.attr.selectorForAddThumbs);
			break;
			
			case 'id Files':
			object.container	=	element.attr(Config.object.attr.id.container);
			object.dropzone		=	element.attr(Config.object.attr.id.dropzone);
			object.thumbszone	=	element.attr(Config.object.attr.id.thumbszone);
			object.thumbs		=	element.attr(Config.object.attr.id.thumbs);
			object.show			=	element.attr(Config.object.attr.id.show);
			object.trash		=	element.attr(Config.object.attr.id.trash);
			object.checkbox		=	element.attr(Config.object.attr.id.checkbox);
			object.info			=	element.attr(Config.object.attr.id.info);
			object.browse		=	element.attr(Config.object.attr.id.browse);
			object.progress		=	element.attr(Config.object.attr.id.progress);
			object.progressBar	=	element.attr(Config.object.attr.id.progressBar);
			object.progressText	=	element.attr(Config.object.attr.id.progressText);
			object.btnGroup		=	element.attr(Config.object.attr.id.btnGroup);
			break;
			
			case 'class Files':
			object.container	=	element.attr(Config.object.attr.classs.container);
			object.dropzone		=	element.attr(Config.object.attr.classs.dropzone);
			object.thumbszone	=	element.attr(Config.object.attr.classs.thumbszone);
			object.thumbs		=	element.attr(Config.object.attr.classs.thumbs);
			object.show			=	element.attr(Config.object.attr.classs.show);
			object.trash		=	element.attr(Config.object.attr.classs.trash);
			object.checkbox		=	element.attr(Config.object.attr.classs.checkbox);
			object.info			=	element.attr(Config.object.attr.classs.info);
			object.browse		=	element.attr(Config.object.attr.classs.browse);
			object.progress		=	element.attr(Config.object.attr.classs.progress);
			object.progressBar	=	element.attr(Config.object.attr.classs.progressBar);
			object.progressText	=	element.attr(Config.object.attr.classs.progressText);
			object.btnGroup		=	element.attr(Config.object.attr.classs.btnGroup);
			break;
			
			case 'css Files':
			object.container	=	element.attr(Config.object.attr.css.container);
			object.dropzone		=	element.attr(Config.object.attr.css.dropzone);
			object.thumbszone	=	element.attr(Config.object.attr.css.thumbszone);
			object.thumbs		=	element.attr(Config.object.attr.css.thumbs);
			object.show			=	element.attr(Config.object.attr.css.show);
			object.trash		=	element.attr(Config.object.attr.css.trash);
			object.checkbox		=	element.attr(Config.object.attr.css.checkbox);
			object.info			=	element.attr(Config.object.attr.css.info);
			object.browse		=	element.attr(Config.object.attr.css.browse);
			object.progress		=	element.attr(Config.object.attr.css.progress);
			object.progressBar	=	element.attr(Config.object.attr.css.progressBar);
			object.progressText	=	element.attr(Config.object.attr.css.progressText);
			object.btnGroup		=	element.attr(Config.object.attr.css.btnGroup);
			break;
			
			case 'value Files':
			object.container	=	element.attr(Config.object.attr.value.container);
			object.dropzone		=	element.attr(Config.object.attr.value.dropzone);
			object.thumbszone	=	element.attr(Config.object.attr.value.thumbszone);
			object.thumbs		=	element.attr(Config.object.attr.value.thumbs);
			object.show			=	element.attr(Config.object.attr.value.show);
			object.trash		=	element.attr(Config.object.attr.value.trash);
			object.checkbox		=	element.attr(Config.object.attr.value.checkbox);
			object.info			=	element.attr(Config.object.attr.value.info);
			object.browse		=	element.attr(Config.object.attr.value.browse);
			object.progress		=	element.attr(Config.object.attr.value.progress);
			object.progressBar	=	element.attr(Config.object.attr.value.progressBar);
			object.progressText	=	element.attr(Config.object.attr.value.progressText);
			object.btnGroup		=	element.attr(Config.object.attr.value.btnGroup);
			break;
			
			case 'loading':
			object.classs	=	element.attr(Config.object.attr.classs.loading);
			object.id		=	element.attr(Config.object.attr.id.loading);
			object.css		=	element.attr(Config.object.attr.css.loading);
			object.value	=	element.attr(Config.object.attr.value.loading);
			break;
			
			case 'ajax':
			object					=	$.Ajax
									 	 .setAttr(Config.object.attr.ajax)
									 	 .generate(element)
									  	 .getConfig();
			object					=	$.extend(true, true, object.ajax, Config.object.ajax);
			break;
			
			case 'spinner':
			object.lines	=	element.attr(Config.object.attr.spinner.lines);
			object.length	=	element.attr(Config.object.attr.spinner.length);
			object.width	=	element.attr(Config.object.attr.spinner.width);
			object.radius	=	element.attr(Config.object.attr.spinner.radius);
			object.corners	=	element.attr(Config.object.attr.spinner.corners);
			object.rotate	=	element.attr(Config.object.attr.spinner.rotate);
			object.direction=	element.attr(Config.object.attr.spinner.direction);
			object.color	=	element.attr(Config.object.attr.spinner.color);
			object.speed	=	element.attr(Config.object.attr.spinner.speed);
			object.trail	=	element.attr(Config.object.attr.spinner.trail);
			object.shadow	=	element.attr(Config.object.attr.spinner.shadow);
			object.hawaccel	=	element.attr(Config.object.attr.spinner.hawaccel);
			object.className=	element.attr(Config.object.attr.spinner.className);
			object.zindex	=	element.attr(Config.object.attr.spinner.zIndex);
			break;
		}
		return object;
	}
	Config.generate		=	function(element){
		var object		=	new Object();
		object.classs	=	new Object();
		object.css		=	new Object();
		object.id		=	new Object();
		object.value	=	new Object();
		object.attr		=	new Object();
		object.base		=	new Object();
		object.ajax		=	new Object();
		
		object.classs.title		=	element.attr(Config.object.attr.classs.title);
		object.classs.window	=	element.attr(Config.object.attr.classs.window);
		object.classs.content	=	element.attr(Config.object.attr.classs.content);
		object.classs.loading	=	element.attr(Config.object.attr.classs.loading);
		object.classs.close		=	element.attr(Config.object.attr.classs.close);
		object.classs.refresh	=	element.attr(Config.object.attr.classs.refresh);
		object.classs.lightbox	=	element.attr(Config.object.attr.classs.lightbox);
		object.classs.footer	=	element.attr(Config.object.attr.classs.footer);
		
		object.id.title			=	element.attr(Config.object.attr.id.title);
		object.id.window		=	element.attr(Config.object.attr.id.window);
		object.id.content		=	element.attr(Config.object.attr.id.content);
		object.id.loading		=	element.attr(Config.object.attr.id.loading);
		object.id.close			=	element.attr(Config.object.attr.id.close);
		object.id.refresh		=	element.attr(Config.object.attr.id.refresh);
		object.id.lightbox		=	element.attr(Config.object.attr.id.lightbox);
		object.id.footer		=	element.attr(Config.object.attr.id.footer);
		
		object.css.title		=	element.attr(Config.object.attr.css.title);
		object.css.window		=	element.attr(Config.object.attr.css.window);
		object.css.content		=	element.attr(Config.object.attr.css.content);
		object.css.loading		=	element.attr(Config.object.attr.css.loading);
		object.css.close		=	element.attr(Config.object.attr.css.close);
		object.css.refresh		=	element.attr(Config.object.attr.css.refresh);
		object.css.lightbox		=	element.attr(Config.object.attr.css.lightbox);
		object.css.footer		=	element.attr(Config.object.attr.css.footer);

		object.ajax				=	$.Ajax
									 .setAttr(Config.object.attr.ajax)
									 .generate(element)
									 .getConfig();
		
		object.ajax				=	$.extend(true, true, Config.object.ajax, object.ajax);
				
		object.value.title		=	element.attr(Config.object.attr.value.title);
		object.value.window		=	element.attr(Config.object.attr.value.window);
		object.value.content	=	element.attr(Config.object.attr.value.content);
		object.value.loading	=	element.attr(Config.object.attr.value.loading);
		object.value.close		=	element.attr(Config.object.attr.value.close);
		object.value.refresh	=	element.attr(Config.object.attr.value.refresh);
		object.value.lightbox	=	element.attr(Config.object.attr.value.lightbox);
		object.value.footer		=	element.attr(Config.object.attr.value.footer);
		
		object.live				=	element.attr(Config.object.attr.live);
		object.events			=	element.attr(Config.object.attr.events);
		object.one				=	element.attr(Config.object.attr.one);
		object.temp				=	element.attr(Config.object.attr.temp);
		object.parse			=	element.attr(Config.object.attr.parse);
		object.style			=	element.attr(Config.object.attr.style);
		object.lightbox			=	element.attr(Config.object.attr.lightbox);
		object.silent			=	element.attr(Config.object.attr.silent);
		object.unique			=	element.attr(Config.object.attr.unique);
		object.spaceX			=	element.attr(Config.object.attr.spaceX);
		object.spaceY			=	element.attr(Config.object.attr.spaceY);
		object.positionX		=	element.attr(Config.object.attr.positionX);
		object.positionY		=	element.attr(Config.object.attr.positionY);
		object.position			=	element.attr(Config.object.attr.position);
		object.multiLightbox	=	element.attr(Config.object.attr.multiLightbox);
		object.zindex			=	element.attr(Config.object.attr.zindex);
		object.toFix			=	element.attr(Config.object.attr.toFix);
		object.bodyScroll		=	element.attr(Config.object.attr.bodyScroll);
		object.title			=	element.attr(Config.object.attr.title);
		object.close			=	element.attr(Config.object.attr.close);
		object.refresh			=	element.attr(Config.object.attr.refresh);
		object.footer			=	element.attr(Config.object.attr.footer);
		object.replaceTitle		=	element.attr(Config.object.attr.replaceTitle);
		object.autoAdjust		=	element.attr(Config.object.attr.autoAdjust);
		object.trash			=	element.attr(Config.object.attr.trash);
		object.info				=	element.attr(Config.object.attr.info);
		object.show				=	element.attr(Config.object.attr.show);
		object.checkbox			=	element.attr(Config.object.attr.checkbox);		
		Config.object	=	$.extend(true, true, Config.object, object);
		return this;
	}
	
	var extend		=	new Object();
	extend.Config	=	Config;
	jQuery.extend(extend);
	
})(jQuery);