window.onload = function() {
	var search_results = 20;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		search_results = 10;
	}
	var browserlang = navigator.language || navigator.userLanguage; 
	document.getElementById("search_button").onclick = function() {
		$("form").on("submit", function(event) {
			event.preventDefault();
      var city = $("#input").val(); //Get value from form input
      location = "https://www.google.com/search?as_q=" + city;
  });
	};
	$(function() {
		function log(message) {
			$("<div>")
			.text(message)
			.prependTo("#log");
			$("#log").scrollTop(0);
		}

		$(window).on("resize", function() {
			$("#ui-id-1").css("width", $("#input").width(), "important");
		});

		$("#input").autocomplete({
			width: 780,
			delay: 800,
			source: function(request, response) {
				$.ajax({
					url:
					"http://35.180.182.8/search?keywords=" +
					$("#input").val() +
					"&language=" + browserlang.substring(0, 2) + "&limit=" + search_results,
					dataType: "json",
					data: request,
					success: function(data) {
						response(
							$.map(data.entries, function(value, key) {
								return {
									label: value.name
								};
							})
							);
					}
				});
			},
			minLength: 2,
			open: function() {
				$(this)
				.removeClass("ui-corner-all")
				.addClass("ui-corner-top");
			},
			close: function() {
				$(this)
				.removeClass("ui-corner-top")
				.addClass("ui-corner-all");
			},
			change: function(event, ui) {
				if (ui.item) {
					$('#search_button').attr('disabled',false);
				} else {
					$('#search_button').attr('disabled',true);
				}
			}
		});
	});
};
