/* global $ */

var __bigFT = (function(){

	'use strict';

	const serviceURL = "http://ftlabs-big-ft.herokuapp.com/data/";
	const interstitial = new Interstitial();
	const updateInterval = 60 * 1000;
	const lastUpdated = document.getElementsByClassName('last-updated')[0];

	var newsTicker = undefined;

	var mediaHolder = undefined;
	var mainStoryTransition = undefined;

	function spoofStories(){

		var sets = [
			[
				{
					headline : "Turkey shoots down Russian Fighter Jet",
					url : "https://next.ft.com/content/8e13f7b0-92cd-11e5-bd82-c1fb87bef7af",
					image : "https://next-geebee.ft.com/image/v1/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2F8ad8636a-9296-11e5-bd82-c1fb87bef7af?source=next&fit=scale-down&width=2000"
				},	
				{
					headline : "British university fees more expensive than US on average",
					url : "https://next.ft.com/content/8e13f7b0-92cd-11e5-bd82-c1fb87bef7af",
					image : "https://next-geebee.ft.com/image/v1/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2F251609b6-83e5-11e5-8e80-1574112844fd?source=next&fit=scale-down&width=2000"
				},
				{
					headline : "Rolls-Royce pledges cost cuts in strategic overhaul",
					url : "https://next.ft.com/content/8e13f7b0-92cd-11e5-bd82-c1fb87bef7af",
					image : "https://next-geebee.ft.com/image/v1/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2Fe9afef64-23cb-11e5-bd83-71cb60e8f08c?source=next&fit=scale-down&width=2000"
				},

			],
			[
				{
					headline : "British university fees more expensive than US on average",
					url : "https://next.ft.com/content/8e13f7b0-92cd-11e5-bd82-c1fb87bef7af",
					image : "https://next-geebee.ft.com/image/v1/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2F251609b6-83e5-11e5-8e80-1574112844fd?source=next&fit=scale-down&width=2000"
				},	
				{
					headline : "Rolls-Royce pledges cost cuts in strategic overhaul",
					url : "https://next.ft.com/content/8e13f7b0-92cd-11e5-bd82-c1fb87bef7af",
					image : "https://next-geebee.ft.com/image/v1/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2Fe9afef64-23cb-11e5-bd83-71cb60e8f08c?source=next&fit=scale-down&width=2000"
				},
				{
					headline : "Turkey shoots down Russian Fight",
					url : "https://next.ft.com/content/8e13f7b0-92cd-11e5-bd82-c1fb87bef7af",
					image : "https://next-geebee.ft.com/image/v1/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2F8ad8636a-9296-11e5-bd82-c1fb87bef7af?source=next&fit=scale-down&width=2000"
				},
			],
			[
				{
					headline : "Rolls-Royce pledges cost cuts in strategic overhaul",
					url : "https://next.ft.com/content/8e13f7b0-92cd-11e5-bd82-c1fb87bef7af",
					image : "https://next-geebee.ft.com/image/v1/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2Fe9afef64-23cb-11e5-bd83-71cb60e8f08c?source=next&fit=scale-down&width=2000"
				},	
				{
					headline : "British university fees more expensive than US on average",
					url : "https://next.ft.com/content/8e13f7b0-92cd-11e5-bd82-c1fb87bef7af",
					image : "https://next-geebee.ft.com/image/v1/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2F251609b6-83e5-11e5-8e80-1574112844fd?source=next&fit=scale-down&width=2000"
				},
				{
					headline : "Turkey shoots down Russian Fight",
					url : "https://next.ft.com/content/8e13f7b0-92cd-11e5-bd82-c1fb87bef7af",
					image : "https://next-geebee.ft.com/image/v1/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2F8ad8636a-9296-11e5-bd82-c1fb87bef7af?source=next&fit=scale-down&width=2000"
				},
			]

		];

		return Promise.resolve(sets[Math.random() * 3 | 0]);

	}

	function populateMainStories(stories){

		console.log(stories);

		return new Promise(function(resolve, reject){

			var media = document.createElement('div'),
				headlines = document.createElement('ol'),
				images = [];

			media.setAttribute('class', 'main-stories__media-container');
			headlines.setAttribute('class', 'main-stories__headlines flex-col');

			stories.forEach(function(story, idx){
				console.log(story);

				var img = new Image();
				var text = document.createElement('li');

				var imgClass = "main-stories__media";
				var textClass = "main-stories__story";

				if(idx === 0){
					imgClass += " main-stories__media--current";
					textClass += " main-stories__story--current"
				}

				img.setAttribute('class', imgClass);
				text.setAttribute('class', textClass);

				img.src = story.image;
				images.push(new Promise(function(resolve, reject){
						img.onload = resolve(img);
						img.onerror = reject();
					})
				)

				text.textContent = story.headline;
				headlines.appendChild(text);

			});

			Promise.all(images)
				.then(function(images){

					images.forEach(function(image, idx){

						media.appendChild(image);

					});

					resolve();
					
					mediaHolder.innerHTML = "";

					mediaHolder.appendChild(media);
					mediaHolder.appendChild(headlines);

				})
				.catch(function(err){
					reject();
				})
			;



		});

	}

		function populateTicker(stories){
		
		return new Promise(function(resolve, reject){

			stories.forEach(function(story){

				console.log(story.headline);
				newsTicker.addMsg(story.headline);

			});

			newsTicker.start();

			resolve();

		});

	}

	function getStories(amount){

		var amount = amount || 3;
		
		return fetch(serviceURL + "/top-stories?startFrom=1&numberOfArticles=" + amount)
			.then(response => response.json())
		;

	}

	function nextMainStory() {
		['main-stories__story--current', 'main-stories__media--current'].forEach(function(c) {
			var existing = $('.'+c);
			existing.removeClass(c).next().addClass(c);
			if (!$('.'+c).length) {
				existing.parent().children().eq(0).addClass(c);
			}
		});
	}

	function updateContent(){

		getStories(10)
			.then(stories => {
				console.log(stories);
				interstitial.show();
				
				populateMainStories(stories.slice(0, 3));
				populateTicker(stories.slice(3, stories.length));

			})
			.then(function(){
				interstitial.hide();
				clearTimeout(mainStoryTransition);
				mainStoryTransition = setInterval(nextMainStory, 5000);
				lastUpdated.innerHTML = "Last updated: " + moment().format("h:mm:ss");
				// console.log(moment().format("h:mm"));
			})
			.catch(function(err){
				interstitial.hide();
				console.log(err);
			})
		;


	}

	function initialise(){

		newsTicker = $('.ticker').ticker();

		mediaHolder = document.getElementsByClassName('main-stories')[0];
			
		updateContent();

		setInterval(updateContent, updateInterval);
			
	}

	return {
		init : initialise
	};

})();

$(function() {

	__bigFT.init();

});
