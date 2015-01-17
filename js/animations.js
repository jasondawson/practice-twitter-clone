$(document).ready(function() {

$('#tweet-submit').hide();
$('#char-count').hide();
//$('.tweet-actions').hide();

var dateFormat = function() {
	var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
	var dt = new Date();
	var amOrPm = 'AM'
	var time = '';

	if (dt.getHours() > 12) {
		amOrPm = 'PM';
	};
	
	time = dt.getHours() + ":" + ('0' + dt.getMinutes()).slice(-2) + " " + amOrPm + " - " +
		dt.getDate() + " " + months[dt.getMonth()] + " " + ('0' + dt.getFullYear()).slice(-2);
	return time.toString();
};

var tweet = function(str) {
	var user = 'Craig Triangle';

	var dt = new Date();
	var amOrPm = 'AM'
	if (dt.getHours > 12) {
	amOrPm = 'PM';
	};
	var time = dt.getHours() + ":" + dt.getMinutes() + " " + amOrPm + " - "
	dt.getDate() + " " + dt.getMonth() + " " + dt.getFullYear();

	$('#stream').prepend(
		'<div class="tweet">' +
		'<div class="content">' +
			'<img class="avatar" src="img/alagoon.jpg" />' +
				'<strong class="fullname"> ' + user + ' </strong>' +
					'<span class="username">@craigtriangle</span>' +
						'<p class="tweet-text">' + str + '</p>' +
						'<div class="tweet-actions">' +
							'<ul>' +
							'<li><span class="icon action-reply"></span> Reply</li>' +
							'<li><span class="icon action-retweet"></span> Retweet</li>' +
							'<li><span class="icon action-favorite"></span> Favorite</li>' +
								'<li><span class="icon action-more"></span> More</li>' +
							'</ul>' +
						'</div>' +
							'<div class="stats">' +
							'<div class="retweets">' +
								'<p class="num-retweets">0</p>' +
								'<p>RETWEETS</p>' +
							'</div>' +
							'<div class="favorites">' +
								'<p class="num-favorites">0</p>' +
								'<p>FAVORITES</p>' +
							'</div>' + 
							'<div class="users-interact">' +
								'<div>' +
								'</div>' +
							'</div>' +
								'<div class="time">' +
								//TODO get real post time
								
								dateFormat() +
							'</div>' +
						'</div>' +
						'<div class="reply">' +
							'<img class="avatar" src="img/alagoon.jpg" />' +
		'<textarea class="tweet-compose" placeholder="Reply to craigtriangle"/></textarea>' +
						'</div>' +
						'</div>' +
						'</div>')
};


//visual changes on clicking input box
$(document).on('click', '#tweet-content > .tweet-compose', function(){
	$('#tweet-submit').show();
	$('#char-count').show();
	var newTxtHeight = '5em';//$('.tweet-compose').height() * 2;
	$(this).css('height', newTxtHeight);
});

/*$('.reply' > '.tweet-compose').on('blur', function(){
	$(this).css('height', '2.5em');
	$(this).val('');
});*/

//update char-count and limit input length to 140 characters
$('.tweet-compose').on('keyup keystroke keydown', function() {
	var maxLength = 140;
	var length = $('.tweet-compose').val().length;
	var newCharCount = (140 - length);
	if (newCharCount < 11) {
		$('#char-count').css('color', 'red');
	} else {
		$('#char-count').css('color', '#999');
	}
	$('#char-count').html(newCharCount.toString());
	
	//refuse input past 140 but allow for backspace
	if (length >= maxLength) {

		//button disable not needed since limiting text input
		//$('#tweet-submit').prop('disabled', true);
		if (event.which != 8) {
			return false;
		}
	} /*else {
		//button disable not needed since limiting text input
		//$('#tweet-submit').prop('disabled', false);
	}*/
});

//post tweet on button click
$('#tweet-submit').on('click', function() {
	var tweetText = $('.tweet-compose').val();
	tweet(tweetText);

	//TODO clear text input box and resize to normal
	$('#tweet-submit').hide();
	$('#char-count').hide();
	var newTxtHeight = '2.5em';//$('.tweet-compose').height() * 2;
	$('.tweet-compose').css('height', newTxtHeight);
	$('.tweet-compose').val('');
	
});


$(document).on('mouseenter', '.content', function(){
	$('.tweet-actions', this).css('visibility', 'visible');
});

$(document).on('mouseleave', '.content', function(){
	$('.tweet-actions', this).css('visibility', 'hidden');
});

$(document).on('click', '.content', function() {
	$('.stats').animate({height:"0px"}, 'fast', 'linear');
	$('.stats').css('visibility', 'hidden');
	$('.stats', this).animate({height:"90px"}, 'fast', 'linear');
	$('.stats', this).css('visibility', 'visible');
});

/*$(document).on('blur', '.tweet > .content', function() {
	$('.stats', this).animate({height:"0px"});
	$('.stats', this).css('visibility', 'hidden');
})*/



});