$(function() {
	var transitionInterval = 5000; //milliseconds

	var steps = [
		{
			phone: 'assets/img/phoneCloudy.png',
			weather: 'assets/img/bgCloudy.png'
		},
		{
			phone: 'assets/img/phoneSunny.png',
			weather: 'assets/img/bgSunny.png'
		},
		{
			phone: 'assets/img/phoneStormy.png',
			weather: 'assets/img/bgStormy.png'
		}
	];
	var currentStep = 0;
	var manual = false;
	var timeout = null;

	var phone = $('#phone');
	var svg = $('#svgMain').svg({
		onLoad: function(svg) {
			function previousStep() {
				currentStep--;
				if(currentStep < 0) {
					currentStep = steps.length - 1;
				}
				advanceStep();
			}
			
			function nextStep() {
				currentStep++;
				if(currentStep >= steps.length) {
					currentStep = 0;
				}
				
				advanceStep();
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					if(!manual) {
						nextStep();
					}
				},transitionInterval);
			}
			
			function advanceStep() {
				var step = steps[currentStep];
				
				if($('.weather').length > 1) {
					return false;
				}
				
				var weatherBackground = svg.image(0,0,702,702,step.weather,{
					'clip-path': "url(#circleMask)",
					opacity: 0,
					'class': 'weather'
				})
				$(weatherBackground).insertBefore($('.weather').first());
				$('.weather').first().animate({
					svgOpacity: 1
				},1200);
				
				$('.weather').last().animate({
					svgOpacity: 0
				},1200,function() {
					$(this).remove();
				});
				
				phone.animate({
					svgY: 700
				}, 800, function() {
					this.setAttribute('xlink:href',step.phone);
					//$(this).attr('src',step.phone);
					$(this).animate({
						svgY: 107
					},800,function(){
						//setTimeout(advanceStep,2500);
					});
				});
			}
			timeout = setTimeout(nextStep,2500);
			
			$('#stepLeft').click(function() {
				manual = true;
				previousStep();
			});
			
			$('#stepRight').click(function() {
				manual = true;
				nextStep();
			});
		}
	});
	
	var imagesToPreload = [
		'assets/img/phoneCloudy.png',
		'assets/img/bgCloudy.png',
		'assets/img/phoneSunny.png',
		'assets/img/bgSunny.png',
		'assets/img/phoneStormy.png',
		'assets/img/bgStormy.png',
	];
	imageObj = new Image();
	if(imagesToPreload.forEach) { //Just because I can
		imagesToPreload.forEach(function(image){
			imageObj.src = image;
		});
	}
});