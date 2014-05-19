jQuery(document).ready(function($) {
	/*Instafeed*/
	var feed = new Instafeed({
		clientId: '099bce4b6a55418ab65643eee719b1c5',
		get: 'tagged',
		tagName: 'bachelorettesmx',
		sortBy: 'random',
		limit: 15,
		mock: true,
		success: function(res) {
			var data = res.data;
			for (var i = 0; i < data.length; i++) {
				$('.hashtag.instagram_slider').append('<div class="rsContent"><a href="' + data[i].link + '" target="_blank"><img src="' + data[i].images.low_resolution.url + '" /></a></div>');
			}

			$(".hashtag.instagram_slider").royalSlider({
				controlNavigation: 'none',
				keyboardNavEnabled: false,
				loop: true
			});
		}
	});
	feed.run();

	var userFeed = new Instafeed({
		get: 'user',
		userId: 810127905,
		accessToken: '810127905.467ede5.bb2fc78b81e54f7bac45391f46ba8a8d',
		mock: true,
		success: function(res) {
			var data = res.data;
			for (var i = 0; i < data.length; i++) {
				$('.instagram.instagram_slider').append('<div class="rsContent"><a href="' + data[i].link + '" target="_blank"><img src="' + data[i].images.low_resolution.url + '" /></a></div>');
			}

			$(".instagram.instagram_slider").royalSlider({
				controlNavigation: 'none',
				keyboardNavEnabled: false,
				loop: true
			});
		}
	});
	userFeed.run();

	/*Sliders*/
	$(".royalSlider").royalSlider({
		controlNavigation: 'none',
		keyboardNavEnabled: true,
		loop: true,
		autoPlay: {
			enabled: true,
			pauseOnHover: true,
			delay: 3500
		}
	});


	$("#contacto form").on('submit', function(e) {
		e.preventDefault();
		$('#ajax_loader').css('display', 'inline');
		$.ajax({
			type: "POST",
			data: $(e.target).serialize(),
			url: "/contacto",
			success: function(data) {
				if (data === 'success') {
					$("#contacto h1").notify("Message Sent", {
						className: "success",
						autoHideDelay: 6000,
						elementPosition: 'bottom'
					});
					$('#ajax_loader').css('display', 'none');
					e.target.reset();
				}else{
					$("#contacto h1").notify("Error", {
						className: "error",
						autoHideDelay: 6000,
						elementPosition: 'bottom'
					});
				}


			}
		});
	});

});