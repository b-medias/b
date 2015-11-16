/* Spanish LANGUAGE 
================================================== */
if(typeof VMM != 'undefined') {
	VMM.Language = {
		lang: "es",
		api: {
			wikipedia: "es"
		},
		date: {
			month: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
			month_abbr: ["Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic."],
			day: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
			day_abbr: ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."]
		}, 
		dateformats: {
			year: "yyyy",
			month_short: "mmm",
			month: "mmmm yyyy",
			full_short: "d mmm",
			full: "d mmmm yyyy",
			time_short: "HH:MM:SS",
			time_no_seconds_short: "HH:MM",
			time_no_seconds_small_date: "'<small>'d mmmm yyyy'</small>' HH:MM",
			full_long: "dddd',' d mmm yyyy HH:MM",
			full_long_small_date: "HH:MM'<br/><small>d mmm yyyy'</small>'"
		},
		messages: {
			loading_timeline: "La cronología esta cargando",
			return_to_title: "Volver al título",
			expand_timeline: "Expandir la cronología",
			contract_timeline: "Reducir la cronología",
			wikipedia: "Desde Wikipedia, la enciclopedia libre",
			loading_content: "cargando",
			loading: "cargando",
			swipe_nav: "Desliza para ver"		}
	}
}