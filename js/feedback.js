function validateEmail(email) {
	var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(email);
}

$(document).ready(function() {

	$(".fancybox-modal").fancybox({
		autoSize: false,
		autoHeight: true,
		width: 400
	});

	$("#feedback").submit(function() {
		return false;
	});

	$('#send-message').on("click", function() {
		var nameval = $('#user-name').val();
		var emailval = $('#user-email').val();
		// var msgval    = $("#msg").val();
		var namelen    = nameval.length;
		var mailvalid = validateEmail(emailval);
		
		if (mailvalid == false) {
			$('#user-email').addClass('error');
		}
		else if (mailvalid == true) {
			$('#user-email').removeClass('error');
		}
		
		if (namelen < 3) {
			$('#user-name').addClass('error');
		}
		else if (namelen >= 3) {
			$('#user-name').removeClass('error');
		}
		
		if(mailvalid == true && namelen >= 3) {
			// если обе проверки пройдены
			// сначала мы скрываем кнопку отправки
			// $('#send-message').replaceWith("<em>отправка...</em>");
			
			$.ajax({
				type: 'POST',
				url: 'sendmessage.php',
				data: $('#contact').serialize(),
				success: function (data) {
					if (data == 'true') {
						$('#feedback').fadeOut('fast', function () {
							$(this).before('<p><strong>Успешно! Ваше сообщение отправлено  :)</strong></p>');
							setTimeout('$.fancybox.close()', 1000);
							$('#contact')[0].reset();
						});
					}
				}
			});
		}

	});

});