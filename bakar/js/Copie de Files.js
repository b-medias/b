/**
* 	Bakar (http://www.bakar.be)
*
*	B-Files
*	update	04/03/2014 
* 		-	Correction pour le calcul total des thumbs
*	update 	03/03/2014
*		-	Correction pour la suppression des thumbs
*
* 	@link      http://www.bakar.be
* 	@copyright Copyright (c) 2005-2013 Bakar. (http://www.bakar.be)
* 	@version 1.0.1	
*/

(function($){
	var FilesParams	=	new Object();
	$.fn.Files		=	function(params){
		var current			=	new Object();
		var elements		=	$(this);
		var params			=	$.extend(true, true, new Object(), params);
		
		var form			=	null;
		var id				=	0;
		var iterator		=	0;
		var filesSuccess	=	new Array();
		var filesSuccessAdd	=	new Array();
		var filesRemove		=	new Array();
		var label			=	null;
		var files			=	null;
		var input			=	null;	
		
		initialize();
		
		function initialize(){	
			setTrigger('FilesInitializeStart');		
			if(!$.isUndefined(window.FileReader)){
				$('body').data('events',false);
				current = $.extend(true, true, current, getParams());		
				if($.isTrue(current.auto)){
					if(elements.length == 0 && $.isTrue(current.live)){			
						$('body').on(current.events, elements.selector, begin);
					}	
					elements.each(function(){
						current.target	=	$(this);
						current 		= 	$.extend(true, true, current, getParams(true));			
						construct();
						var bFiles		=	$.extend(true, true, new Object(), current);
						current.target.data('b-files', bFiles);
						initEvents();
						addSelectorThumbs();
					});
				}
				else{
					elements.each(function(){
						current.target	=	$(this);
						current 		= 	$.extend(true, true, current, getParams(true));	
						construct();		
						var bFiles		=	$.extend(true, true, new Object(), current);
						current.target.data('b-files', bFiles);
						initEvents();
						addSelectorThumbs();
					});
				}
				
				$('body').data('events',null);
			}
			setTrigger('FilesInitializeEnd');		
		}
	
		function addSelectorThumbs(){
			if($.isNotNull(current.selectorForAddThumbs)){
				current.thumbsAdded	=	$(current.selectorForAddThumbs);
				current.thumbsAdded.each(function(){				
					var WindowShow;
					var WindowTrash;
					var WindowInfo;
					var btnTrash;
					var btnShow;
					var btnCheckbox;
					
					var file		=	$(this);
					file.css('opacity', 1);
					var fileThumbs	=	file.clone();					
					file.addClass('center block b-adjust');
						
					var identifier	=	file.attr('data-identifier');
					var name		=	file.attr('title');
					var label		=	current.target.prevAll('label').text();
					var size		=	file.attr('data-size');
					if($.isUndefined(size)){size = 0;}
					var sizeKo		=	size / 1024;
					var view		=	file.attr('data-view');
					var thumbs		=	current.elements.thumbs.clone();
					var btnGroup	=	current.elements.btnGroup.clone();
					var helper		=	new Object();
					var src			=	file.attr('src');
					src				=	src.substr(src.lastIndexOf('/')+1);
					var type		=	src.substr(src.lastIndexOf('.')+1);
										
					var validator	=	$.extend(true, true, new Object(), $.Validator.getDefault());
					validator		=	$.extend(true, true, validator, current.control);
					if($.isFalse(current.mergeThumbs)){validator.values = 0;}
					else{validator.values	=	Object.keys(filesSuccess).length	+	Object.keys(filesSuccessAdd).length;}
					validator.file		=	file;
					validator.label		=	label;
					validator			=	$.extend(true, validator, $.Validator.byType(validator));
					validator.filePath	=	src;
					validator			=	$.Validator.isValid(validator);

					if($.isTrue(validator.state)){	
						thumbs.attr('data-identifier', 'id-'+identifier+'-added');
						thumbsContent	=	fileThumbs;
						helper.name		=	name;
									
						WindowShow	=	getWindowParams();
						WindowTrash	=	getWindowParams();
						WindowInfo	=	getWindowParams();
						
						var div	=	$('<div></div>');
						div.append(file);
						
						WindowShow.value.content	=	div;				
						WindowShow.value.title		=	name;
						
						btnShow	= btnGroup.children('.b-show');
						btnShow.attr('title',	$.Languages.getHelper(3, helper));
						btnShow.attr('data-restruct', true);
						btnShow.attr('data-autoadjust', true);
						btnShow.attr('data-value-title', name);
						btnShow.attr('data-ajax', false);
						btnShow.addClass('window-json');
										
						WindowInfo.style			=	'info';
						WindowInfo.value.content	=	'<p>Name: '+name+'</p><p>Size byte: '+size+' byte</p><p>Size Ko: '+sizeKo+' Ko<p>Type: '+type+'</p>';
						WindowInfo.value.title		=	name;
						btnInfo	= btnGroup.children('.b-info');
						btnInfo.attr('title', $.Languages.getHelper(2, helper));
						btnInfo.data('b-Window', WindowInfo).addClass('window-json');
						
						var trashMessage			=	$('<p>'+$.Languages.getHelper(4, helper)+'</p>'+
														  '<p>'+
															'<button title="'+$.Languages.getHelper(5)+'" data-identifier="'+identifier+'" class="b-btn b-yes remove-add-thumbs alphared">Oui</button>'+
															'&nbsp;'+
															'<button title="'+$.Languages.getHelper(6)+'" class="b-btn b-close alphagray">'+$.Languages.getHelper(6)+'</button>'+
														  '</p>');
						
						$(document).on('windowShowCompleted', function(evt){
							var object	=	evt.object;
							if(object.elements.content.find('.b-yes.remove-add-thumbs')){
								if(object.elements.content.find('.b-yes').data('event') != true){
									object.elements.content.find('.b-yes').on('click', function(evt){
										$.event.trigger({type : 'B-FilesRemove', event : evt});
										var target		=	$(evt.currentTarget);
										var	identifier	=	target.attr('data-identifier');
										var bWindow		=	target.parents('.b-window');
										bWindow			=	bWindow.data('b-Window');
										var close		=	bWindow.elements.close;
										delete filesSuccessAdd['added-'+identifier];
										current.filesRemove.push(identifier);
										removeThumbs(identifier+'-added');
										close.click();
									}).data('event', true);	
								}
							}
							return object;
						});
				  
						WindowTrash.style			=	'warning';
						WindowTrash.value.content	=	trashMessage;
						WindowTrash.value.title		=	name;
						WindowTrash.ajax.ajax		=	false;
						btnTrash = btnGroup.children('.b-trash');
						btnTrash.attr('title', $.Languages.getHelper(1, helper));
						btnTrash.data('b-Window', WindowTrash).addClass('window-json');
						
						btnCheckbox	=	btnGroup.children('.b-checkbox');
						btnCheckbox.attr('title', $.Languages.getHelper(0, helper));
						btnCheckbox.data('b-files', current).on('click', checked);
						
						filesSuccessAdd['added-'+identifier]	=	identifier;
												
						thumbs.append(btnGroup);
						link	=	$('<a></a>');
						link.addClass('b-btn alphagray b-thumbnail');
						link.attr('title', name);
						link.attr('href', '#');
						link.append(thumbsContent);
						thumbs.prepend(link);
						current.elements.thumbszone.prepend(thumbs);
						current.filesSuccessAdd	=	filesSuccessAdd;
						current.target.data('b-files', current);
					}
					else{
						file.remove();
						if($.isTrue(current.multiErrorBox)){
							var WindowParams			=	getWindowParams();
							WindowParams.events			=	null;
							WindowParams.multiLightbox	=	false;
							WindowParams.spaceX			=	10;
							WindowParams.spaceY			=	10;
							WindowParams.style			=	validator.style;
							WindowParams.value.content	=	validator.error;						
							WindowParams				=	$.extend(true, WindowParams, current.windowError);
							$('body').Window(WindowParams);
							$.Validator.resetErrors();
						}
						else{
							globalWindowError();
						}
					}
				});
			}
		}
		
		function initEvents(){
			setTrigger('FilesInitEventsStart');
			if($.isTrue(current.one)){current.live = false;};
			
			if($.isNull(current.events)){
				begin();
			}
			else{
				if($.isTrue(current.live)){
					if($('body').data('events') != true){
						$('body').data('events', true);
						$('body').on(current.events, elements.selector, begin);
						elements.data('event', current.events);
					}
					
					if(current.target.data('event') != current.events){
						$('body').delegate(current.target, current.events, begin);
						current.target.data('event', current.events);
					}
				}
				else if($.isTrue(current.one)){
					$('body').off(current.events, elements.selector, begin);
					current.target.one(current.events, begin);
					current.target.attr('data-one','true');
					$('body').on(current.events, elements.selector+'[data-one!="true"][data-bind!="true"]', begin);
				}
				else{
					if(elements.selector != ''){
						$('body').off(current.events, elements.selector, begin);
					}
					current.target.on(current.events, begin);
					current.target.attr('data-bind','true');
					if(elements.selector != ''){
						$('body').on(current.events, elements.selector+'[data-bind!="true"][data-one!="true"]', begin);
					}
				}
			}
			setTrigger('FilesInitEventsEnd');
		}
		
		function getParams(type){
			setTrigger('FilesGetParamsStart');
			var object		=	new Object();
			if($.isNull(params)){params	=	new Object();}
			if($.isNull(type)){
				setTrigger('FilesGetParamsNotAutoStart');
				object	=	$.Config
							 .reset()
							 .setObject(current)
							 .addConfig('events')
							 .addConfig('base Forms')
							 .addConfig('base Files')
							 .addConfig('class Files')
							 .addConfig('css Files')
							 .addConfig('id Files')
							 .addConfig('value Files')
							 .addConfig('elements Files')
							 .addConfig('loading')	
							 .addConfig('spinner')	
							 .addConfig('control')	 
							 .getObject();

				

				$.Ajax.setConfig(params.ajax);
				object.ajax		=	$.Ajax.getConfig();
				
				object			=	$.extend(true, true, object, FilesParams);
				object			=	$.extend(true, true, object, params);
			
				setTrigger('FilesGetParamsNotAutoEnd');			
			}
			else{
				setTrigger('FilesGetParamsAutoStart');
				object	=	$.Config
							 .reset()
							 .setObject(current)
							 .addAttr('events')
							 .addAttr('base Forms')
							 .addAttr('base Files')
							 .addAttr('class Files')
							 .addAttr('css Files')
							 .addAttr('id Files')
							 .addAttr('value Files')
							 .addAttr('loading')
				 			 .addAttr('control')
							 .addAttr('spinner')
				 			 .getObject();
			
				var events				=	$.Config.setObject(current).generateOne('events', current.target);
				var loading				=	$.Config.setObject(current).generateOne('loading', current.target);
							
				object.live				=	events.live;
				object.events			=	events.events;
				object.auto				=	events.auto;				
				object					=	$.Config.setObject(current).generateOne('base Forms', current.target);
				object					=	$.Config.setObject(current).generateOne('base Files', current.target);
				object.value			=	$.Config.setObject(current).generateOne('value Files', current.target);
				object.id				=	$.Config.setObject(current).generateOne('id Files', current.target);
				object.classs			=	$.Config.setObject(current).generateOne('class Files', current.target);
				object.css				=	$.Config.setObject(current).generateOne('css Files', current.target);
				object.control			=	$.Config.setObject(current).generateOne('control', current.target);
				object.spinner			=	$.Config.setObject(current).generateOne('spinner', current.target);
				object.value.loading	=	loading.value;
				object.id.loading		=	loading.id;
				object.css.loading		=	loading.css;
				object.classs.loading	=	loading.classs;	
						
				object					=	$.extend(true, true, object, FilesParams);
				object					=	$.extend(true, true, object, params);
				
				setTrigger('FilesGetParamsAutoEnd');				
			}
			setTrigger('FilesGetParamsEnd');
			return object;
		}
		
		function begin(evt){
			setTrigger('FilesBeginStart');
			if($.isNull(evt)){
				current.target	=	elements;
			}
			else{
				$.stopped(evt);
				current.target	=	$(evt.currentTarget);
			}

			current = current.target.data('b-files');
			appendTo();
			setTrigger('FilesBeginEnd');
			setTrigger('FilesBeginFullEnd');
		};
		
		function setTrigger(type){
			var object	=	new Object();
			object.type		=	type;
			object.object	=	current;
			object.jQuery	=	this;
		
			var returne = $.event.trigger(object);
			if($.isNotNull(returne)){
				current	=	returne;
			}
		}
		
		function construct(){
			setTrigger('FilesConstructStart');
			if($.isUndefined(current.tags)){
				current.tags	=	$.extend(true, true, new Object(), current.elements);
			}
			
			current.elements.container		=	$(current.tags.container);
			current.elements.dropzone		=	$(current.tags.dropzone);
			current.elements.thumbszone		=	$(current.tags.thumbszone);
			current.elements.thumbs			=	$(current.tags.thumbs);
			current.elements.show			=	$(current.tags.show);
			current.elements.trash			=	$(current.tags.trash);
			current.elements.info			=	$(current.tags.info);
			current.elements.browse			=	$(current.tags.browse);
			current.elements.checkbox		=	$(current.tags.checkbox);
			current.elements.btnGroup		=	$(current.tags.btnGroup);
			current.elements.progress		=	$(current.tags.progress);
			current.elements.progressBar	=	$(current.tags.progressBar);
			current.elements.progressText	=	$(current.tags.progressText);
			current.elements.loading		=	$(current.tags.loading);
			
			current.elements.container.addClass('b-files');	
			current.elements.dropzone.addClass('dropzone');
			current.elements.thumbszone.addClass('thumbszone');
			current.elements.thumbs.addClass('thumbs');
			current.elements.show.addClass('b-show b-btn');
			current.elements.trash.addClass('b-trash b-btn');
			current.elements.info.addClass('b-info b-btn');
			current.elements.browse.addClass('browse b-btn');
			current.elements.checkbox.addClass('b-checkbox b-btn');
			current.elements.btnGroup.addClass('b-group');
			current.elements.progress.addClass('');	
			current.elements.progressBar.addClass('');
			current.elements.progressText.addClass('');
			current.elements.loading.addClass('loading');
			
			current.elements.container.addClass(current.classs.container);	
			current.elements.dropzone.addClass(current.classs.dropzone);
			current.elements.thumbszone.addClass(current.classs.thumbszone);
			current.elements.thumbs.addClass(current.classs.thumbs);
			current.elements.show.addClass(current.classs.show);
			current.elements.trash.addClass(current.classs.trash);
			current.elements.info.addClass(current.classs.info);
			current.elements.browse.addClass(current.classs.browse);
			current.elements.checkbox.addClass(current.classs.checkbox);
			current.elements.btnGroup.addClass(current.classs.btnGroup);
			current.elements.progress.addClass(current.classs.progress);	
			current.elements.progressBar.addClass(current.classs.progressBar);
			current.elements.progressText.addClass(current.classs.progressText);
			current.elements.loading.addClass(current.classs.loading);
			
			current.elements.container.css(current.css.container);	
			current.elements.dropzone.css(current.css.dropzone);
			current.elements.thumbszone.css(current.css.thumbszone);
			current.elements.thumbs.css(current.css.thumbs);
			current.elements.show.css(current.css.show);
			current.elements.trash.css(current.css.trash);
			current.elements.info.css(current.css.info);
			current.elements.browse.css(current.css.browse);
			current.elements.checkbox.css(current.css.checkbox);
			current.elements.btnGroup.css(current.css.btnGroup);
			current.elements.progress.css(current.css.progress);	
			current.elements.progressBar.css(current.css.progressBar);
			current.elements.progressText.css(current.css.progressText);
			current.elements.loading.css(current.css.loading);

			current.elements.container.attr('id', current.id.container);	
			current.elements.dropzone.attr('id', current.id.dropzone);
			current.elements.thumbszone.attr('id', current.id.thumbszone);
			current.elements.thumbs.attr('id', current.id.thumbs);
			current.elements.show.attr('id', current.id.show);
			current.elements.trash.attr('id', current.id.trash);
			current.elements.info.attr('id', current.id.info);
			current.elements.browse.attr('id', current.id.browse);
			current.elements.checkbox.attr('id', current.id.checkbox);
			current.elements.btnGroup.attr('id', current.id.btnGroup);
			current.elements.progress.attr('id', current.id.progress);	
			current.elements.progressBar.attr('id', current.id.progressBar);
			current.elements.progressText.attr('id', current.id.progressText);
			current.elements.loading.attr('id', current.id.loading);	
						
			setTrigger('FilesConstructEnd');
		}
		
		function appendTo(){
			form	=	current.target.parents('form');
			if($.isNotNull(current.selectorForAddThumbs)){
				//add thumbs
			}
			
			current.elements.show.html(current.value.show);
			current.elements.trash.html(current.value.trash);
			current.elements.info.html(current.value.info);
			current.elements.checkbox.html(current.value.checkbox);
			current.elements.browse.html(current.value.browse);
			current.elements.progress.html(current.value.progress);
			current.elements.progressBar.html(current.value.progressBar);
			current.elements.progressText.html(current.value.progressText);
			current.elements.btnGroup.html(current.value.btnGroup);
			current.elements.dropzone.html(current.value.dropzone);
			if($.isTrue(current.show)){
				current.elements.btnGroup.append(current.elements.show);
			}
			current.elements.btnGroup.append(current.elements.trash);
			if($.isTrue(current.info)){
				current.elements.btnGroup.append(current.elements.info);
			}
			if($.isTrue(current.checkbox)){
				current.elements.btnGroup.append(current.elements.checkbox);
			}
			current.elements.progressBar.append(current.elements.progressText);
			current.elements.progress.append(current.elements.progressBar);
			current.elements.container.append(current.elements.thumbszone);
			current.elements.container.append(current.elements.dropzone);
			current.elements.container.append(current.elements.browse);
			
			current.elements.container.insertBefore(current.target);
			current.target.css('display','none');
			addEvents();				 
		}
		
		function addEvents(){
			current.elements.browse.on('click', browserFiles);
			current.elements.dropzone.on('dragover dragenter dragleave drop', dragdrop);
		}
		
		function browserFiles(evt){
			$.stopped(evt);
			current.elements.browse = $(evt.currentTarget);
			if(current.target.data('event') != true){
				current.target.on('change', browserChange).data('event',true);
			}
			current.target.click();
		}
		
		function browserChange(evt){
			input	=	$(evt.currentTarget);
			files	=	evt.target.files;
			label	=	input.prevAll('label').text();
			$.Validator.resetErrors();
			loadFiles();
		}	
		
		function dragdrop(evt){
			$.stopped(evt);
			$.Validator.resetErrors();
			current.elements.dropzone 					= 	$(evt.currentTarget);
			evt.originalEvent.dataTransfer.dropEffect	=	'copy';
			switch(evt.type){
				case 'dragover':
				current.elements.dropzone.addClass('dragover');
				current.elements.dropzone.removeClass('dragenter');
				current.elements.dropzone.removeClass('dragleave');
				current.elements.dropzone.removeClass('drop');
				break;
					
				case 'dragenter':
				current.elements.dropzone.addClass('dragenter');
				current.elements.dropzone.removeClass('dragover');
				current.elements.dropzone.removeClass('dragleave');
				current.elements.dropzone.removeClass('drop');
				break;
					
				case 'dragleave':
				current.elements.dropzone.addClass('dragleave');
				current.elements.dropzone.removeClass('dragover');
				current.elements.dropzone.removeClass('dragenter');
				current.elements.dropzone.removeClass('drop');
				break;
				
				case 'drop':
				current.elements.dropzone.addClass('drop');
				current.elements.dropzone.removeClass('dragenter');
				current.elements.dropzone.removeClass('dragleave');
				current.elements.dropzone.removeClass('dragover');
				drop(evt);
				break;
			}
		}
		
		function drop(evt){
			files	=	evt.originalEvent.dataTransfer.files;
			loadFiles();
		}
		
		function loadFiles(){				
			var validator	=	$.extend(true, true, new Object(), $.Validator.getDefault());
			validator		=	$.extend(true, true, validator, current.control);
			validator.values=	Object.keys(filesSuccess).length;
			
			if($.isTrue(current.mergeThumbs)){
				validator.values += Object.keys(filesSuccessAdd).length;	
			}
			validator.label	=	label;
			validator		=	$.extend(true, validator, $.Validator.byType(validator));	
			
			if(files.length > 0 && files.length > iterator){		
				var file			=	files[iterator];			
				var fr				=	new FileReader();
				validator.file		=	file;
				validator			=	$.Validator.isValid(validator);
				if($.isTrue(validator.state)){	
					$(fr).data('identifier',id);
					$(fr).on('loadstart', startFileReader);
					$(fr).on('progress', function(evt){progressFileReader(evt, file)});
					$(fr).on('load', function(evt){loadFileReader(evt, file)});
					$(fr).on('loadend', function(evt){endFileReader(evt, file)});
					$(fr).on('error', errorFileReader);
					fr.readAsDataURL(file);
				}
				else{
					iterator	+= 	1;
					if($.isTrue(current.multiErrorBox)){
						var WindowParams			=	getWindowParams();
						WindowParams.events			=	null;
						WindowParams.multiLightbox	=	false;
						WindowParams.spaceX			=	10;
						WindowParams.spaceY			=	10;
						WindowParams.style			=	validator.style;
						WindowParams.value.content	=	validator.error;						
						WindowParams				=	$.extend(true, WindowParams, current.windowError);
						$('body').Window(WindowParams);
						$.Validator.resetErrors();
					}
					
					loadFiles();
				}
			}
			else{
				iterator	=	0;
				globalWindowError();
			}
		}
		
		function globalWindowError(){
			if($.Validator.getErrors(true) !== '' && !$.isTrue(current.multiErroBox)){
				var WindowParams			=	getWindowParams();
				WindowParams.events			=	null;
				WindowParams.style			=	'error';
				WindowParams.value.content	=	$.Validator.getErrors(true);
				
				$(document).on('end', function(){
					$.Validator.resetErrors();
				});
				$('body').Window(WindowParams);
			}
		}
		
		function startFileReader(evt){
			if($.isTrue(current.loading)){
				addThumbs('loading', $(evt.currentTarget).data('identifier'));
			}
		}
		
		function loadFileReader(evt, file){
			var identifier	=	$(evt.currentTarget).data('identifier');
			setProgress(identifier, 100);
			addThumbs(evt, $(evt.currentTarget).data('identifier'), file);
		}
		
		function errorFileReader(evt){
			console.log('errorFileReader');
		}
		
		function endFileReader(evt){
			id 		= 	id+1;
			iterator=	iterator+1;
			loadFiles();
		}
		
		function progressFileReader(evt, file){
			var originalEvent	=	evt.originalEvent;
			var identifier		=	$(evt.currentTarget).data('identifier');	
			var loaded			=	originalEvent.loaded;
			var total			=	originalEvent.total;
			var pcLoaded		=	(loaded / total) * 100;		
			setProgress(identifier, pcLoaded);
		}
		
		function getWindowParams(){
			var WindowParams				=	new Object();
				WindowParams.zindex			=	current.zindex;
				WindowParams.parse			=	'json';
				WindowParams.events			=	'click';
				WindowParams.lightbox		=	true;
				WindowParams.multiLightbox	=	true;
				WindowParams.restruct		=	true;
				WindowParams.classs			=	new Object();
				WindowParams.value			=	new Object();
				WindowParams.classs.window	=	'alphagray';
				WindowParams.classs.lightbox=	'iphone';
				WindowParams.ajax			=	new Object();
				WindowParams.ajax.ajax		=	false;
				
			return WindowParams;	
		}
		
		function addThumbs(evt, identifier, file){
			var thumbs;
			var thumbsContent;
			var link;
			var name;
	
			if($('.thumbs[data-identifier="id-'+identifier+'"]').length === 0){
				thumbs	=	current.elements.thumbs.clone();
				thumbs.attr('data-identifier', 'id-'+identifier);
				
				if(evt	===	'loading'){
					thumbsContent	=	getProgress();
					name			=	'Loading';	
					thumbsContent.attr('id', 'progress-'+identifier);
				}				
			}
			else{
				var size;
				var sizeKo;
				var type;
				var url64;
				var btnGroup;
				var btnShow;
				var btnTrash;
				var btnInfo;
				var btnCheckbox;
				var helper;
				var WindowShow;
				var WindowTrash;
				var WindowInfo;

				thumbs						=	$('.thumbs[data-identifier="id-'+identifier+'"]');
				filesSuccess[identifier]	=	file;
				name						=	file.name;
				size						=	file.size;
				sizeKo						=	Math.round(size/1024);
				type						=	file.type;
				url64						=	evt.target.result;
				thumbsContent				=	$('<img class="b-adjust" src="'+url64+'" title="'+name+'" alt="'+name+'" />');
				btnGroup					=	current.elements.btnGroup.clone();
				helper						=	new Object();
				helper.name					=	name;
								
				WindowShow					=	getWindowParams();
				WindowTrash					=	getWindowParams();
				WindowInfo					=	getWindowParams();
				
				WindowShow.value.content	=	'<div><img class="b-adjust center block" src="'+url64+'" title="'+name+'" alt="'+name+'" /></div>';				
				WindowShow.value.title		=	name;
				WindowShow.autoAdjust		=	true;
				btnShow						= 	btnGroup.children('.b-show');
				btnShow.attr('title',	$.Languages.getHelper(3, helper));
				btnShow.data('b-Window', WindowShow).addClass('window-json');
								
				WindowInfo.style			=	'info';
				WindowInfo.value.content	=	'<p>Name: '+name+'</p><p>Size byte: '+size+' byte</p><p>Size Ko:	'+sizeKo+' Ko<p>Type: '+type+'</p>';
				WindowInfo.value.title		=	name;
				btnInfo	= btnGroup.children('.b-info');
				btnInfo.attr('title', $.Languages.getHelper(2, helper));
				btnInfo.data('b-Window', WindowInfo).addClass('window-json');
				
				
				var trashMessage			=	$('<p>'+$.Languages.getHelper(4, helper)+'</p>'+
												  '<p>'+
												  	'<button title="'+$.Languages.getHelper(5)+'" data-identifier="'+identifier+'" class="b-btn b-yes remove-thumbs alphared">Oui</button>'+
												  	'&nbsp;'+
												  	'<button title="'+$.Languages.getHelper(6)+'" class="b-btn b-close alphagray">'+$.Languages.getHelper(6)+'</button>'+
												  '</p>');
				
				$(document).on('windowShowCompleted', function(evt){
					var object	=	evt.object;
					if(object.elements.content.find('.b-yes.remove-thumbs')){
						if(object.elements.content.find('.b-yes').data('event-remove') != true){
							object.elements.content.find('.b-yes').on('click', function(evt){
								var target		=	$(evt.currentTarget);
								var	identifier	=	target.attr('data-identifier');
								var bWindow		=	target.parents('.b-window');
								bWindow			=	bWindow.data('b-Window');
								var close		=	bWindow.elements.close;
								delete filesSuccess[identifier];
								removeThumbs(identifier);
								close.click();
							}).data('event-remove', true);
						}
					}
					return object;
				});
				
				
				WindowTrash.style			=	'warning';
				WindowTrash.value.content	=	trashMessage
				WindowTrash.value.title		=	name;
				btnTrash = btnGroup.children('.b-trash');
				btnTrash.attr('title', $.Languages.getHelper(1, helper));
				btnTrash.data('b-Window', WindowTrash).addClass('window-json');
				
				btnCheckbox	=	btnGroup.children('.b-checkbox');
				btnCheckbox.attr('title', $.Languages.getHelper(0, helper));
				btnCheckbox.on('click', checked);
				
				
				thumbs.empty();
				thumbs.append(btnGroup);
				current.filesSuccess	=	filesSuccess;
				current.target.data('b-files', current);
				btnCheckbox.data('b-files', current);
			}
			
			
			
			link	=	$('<a></a>');
			link.addClass('b-btn alphagray b-thumbnail');
			link.attr('title', name);
			link.attr('href', '#');
			link.append(thumbsContent);
			thumbs.prepend(link);
			current.elements.thumbszone.prepend(thumbs);
		}
		
		function removeThumbs(identifier){
			$('.thumbs[data-identifier="id-'+identifier+'"]').fadeOut(function(){
				$(this).remove();
			});
			return this;
		}
		
		function setProgress(identifier, pcLoaded){
			var progress		=	$('#progress-'+identifier);
			var progressBar		=	progress.children('div.b-progressbar');
			var progressText	=	progressBar.children('span');
			
			pcLoaded	=	Math.round(pcLoaded);
						
			progressBar.attr('aria-valuenow', pcLoaded);
			progressBar.animate({'width' : pcLoaded+'%'});
			progressText.html(pcLoaded+'%');
		}
		
		function getProgress(){
			var progress	=	current.elements.progress.clone();
			var progressBar	=	progress.children('div');
			var progressText=	progress.children('span');
			progress.addClass('b-progress');
			progressBar.addClass('b-progressbar alphagray animate');
			progressBar.attr('role', 'progressbar');
			progressBar.attr('aria-valuenow', 0);
			progressBar.attr('aria-valuemin', 0);
			progressBar.attr('aria-valuemax', 100);
			progressText.addClass('sr-only');
			
			return progress;
		}
		
		function getLoading(){
			if(current.elements.loading.children().length == 0){
				var spinner 		= new Spinner(current.spinner).spin();
				var p				=	$(current.value.loading);
				var containerSpinner=	$('<div class="container-spinner"></div>');
				containerSpinner.append(spinner.el);
				current.elements.loading.append(p);
				current.elements.loading.append(containerSpinner);
			}
			return current.elements.loading.clone();
		}
		
		function checked(evt){
			$.stopped(evt);
			var target		=	$(evt.currentTarget);
			var ico			=	target.children('span');
			var	thumbszone	=	target.parents('.thumbszone');
			
			if(ico.hasClass('fa-square-o')){
				thumbszone.find('span.fa-check-square-o').each(function(){
					var elem	=	$(this);
					elem.removeClass('fa-check-square-o').addClass('fa-square-o');
				});
				ico.removeClass('fa-square-o')
				   .addClass('fa-check-square-o');
				  
				$.event.trigger({type : 'B-FilesChecked', event : evt});
			}
			else{
				ico.removeClass('fa-check-square-o')
				   .addClass('fa-square-o');
				$.event.trigger({type : 'B-FilesUnchecked', event : evt});
			}
		}
		
		return this;
	}
})(jQuery);