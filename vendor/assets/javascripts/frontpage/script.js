(function($) {
	
	'use strict';
	
	var Wstartup = {
		
		// Initialization the functions
		init: function() {
			Wstartup.AffixMenu();
			Wstartup.MobileMenu();
			Wstartup.ScrollSpy();
			Wstartup.SmoothScroll();
			Wstartup.FitVids();
			Wstartup.PlaceHolder();
			Wstartup.Carousel();
			Wstartup.Lightbox();
			Wstartup.CounterUp();
			Wstartup.Parallax();
			Wstartup.ImgHover();
			Wstartup.Form();
			Wstartup.Animated();
			Wstartup.Customizer();
		},
		
		// Navigation menu affix
		AffixMenu: function() {
			$('body').waypoint(function() {
				$('#navigation, #customize').removeClass('affix');
			}, {
				offset: -49
			});
			
			$('body').waypoint(function() {
				$('#navigation, #customize').addClass('affix');
			}, {
				offset: -50
			});
		},
		
		// Add mobile navigation
		MobileMenu: function() {
			var navMenu	= '<nav id="navigation_mobile">';
			navMenu		+= '<div class="nav-menu-links">';
			navMenu		+= '<ul>';
			navMenu		+= $('#navigation .nav').html();
			navMenu		+= '</ul>';
			navMenu		+= '</div>';
			navMenu		+= '<div class="nav-menu-button">';
			navMenu		+= '<button class="nav-menu-toggle"><i class="fa fa-navicon"></i></button>';
			navMenu		+= '</div>';
			navMenu		+= '</nav>';
			
			$('#header').before(navMenu);
			
			$('.nav-menu-toggle').on('click', function() {
				$(this).parent('.nav-menu-button').prev('.nav-menu-links').slideToggle(300);
			});
		},
		
		// Navigation menu scrollspy to anchor section
		ScrollSpy: function() {
			setTimeout(function() {
				$('body').scrollspy({
					target: '#navigation.scrollspy',
					offset: 71
				});
			}, 100);
		},
		
		// Smooth scrolling to anchor section
		SmoothScroll: function() {
			$('a.smooth-scroll').on('click', function(event) {
				var $anchor		= $(this);
				var offsetTop	= '';
				
				if (window.Response.band(768)) {
					offsetTop = parseInt($($anchor.attr('href')).offset().top - 70, 0);
				} else {
					offsetTop = parseInt($($anchor.attr('href')).offset().top, 0);
				}
				
				$('html, body').stop().animate({
					scrollTop: offsetTop
				}, 1500,'easeInOutExpo');
				
				event.preventDefault();
			});
		},
		
		// Responsive video size
		FitVids: function() {
			$('body').fitVids();
		},
		
		// Placeholder compatibility for IE8
		PlaceHolder: function() {
			$('input, textarea').placeholder();
		},
		
		// Slider with Slick carousel
		Carousel: function() {
			// Portfolios slider
			$('.carousel-slider.affa-portfolios-slider').slick({
				arrows: false,
				dots: true,
				speed: 300,
				draggable: false,
				slidesToShow: 3,
				slidesToScroll: 3,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 768,
						settings: {
							draggable: true,
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 561,
						settings: {
							draggable: true,
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
			
			// Portfolios slider 2
			$('.carousel-slider.affa-portfolios-slider2').slick({
				speed: 300,
				draggable: false,
				autoplay: true,
				autoplaySpeed: 5000,
				responsive: [{
					breakpoint: 768,
					settings: {
						arrows: false,
						dots: true,
						draggable: true
					}
				}]
			});
			
			// Testimonials carousel
			$('.carousel-slider.affa-testimonials-carousel').slick({
				arrows: false,
				dots: true,
				speed: 300,
				fade: true,
				draggable: false,
				autoplay: true,
				autoplaySpeed: 5000,
				infinite: true
			});
			
			// General slider
			$('.carousel-slider.general-slider').each(function() {
				$(this).slick({
					dots: true,
					speed: 300,
					adaptiveHeight: true,
					draggable: false,
					responsive: [{
						breakpoint: 768,
						settings: {
							draggable: true
						}
					}]
				});
			}).on('afterChange', function() {
				$(window).trigger('resize.px.parallax');
			});
		},
		
		// Preview images popup gallery with Fancybox
		Lightbox: function() {
			$('.fancybox').fancybox({
				loop: false
			});
		},
		
		// Number counter ticker animation
		CounterUp: function() {
			$('.affa-counter > h4 > span, .affa-counter2 > h4 > span').counterUp({
				delay: 10,
				time: 3000
			});
		},
		
		// Background with parallax effect
		Parallax: function() {
			$(window).resize(function() {
				setTimeout(function() {
					$(window).trigger('resize.px.parallax');
				}, 200);
			});
			
			$('#navigation_mobile .nav-menu-toggle, .panel-group .panel-title a').on('click', function() {
				setTimeout(function() {
					$(window).trigger('resize.px.parallax');
				}, 300);
			});
		},
		
		// Image on hover animation effect
		ImgHover: function() {
			$('.img-hover2').hover(
				function() {
					var $elem = $(this);
					
					$elem.find('.overlay-masked').fadeIn(300);
					
					setTimeout(function() {
						$elem.find('.overlay-masked .fa').animate({
							right: '30px',
							opacity: 1
						}, 200);
						
						$elem.find('.overlay-masked p').animate({
							left: '30px',
							opacity: 1
						}, 200);
					}, 100);
				},
				function() {
					var $elem = $(this);
					
					$elem.find('.overlay-masked .fa').animate({
						right: '0px',
						opacity: 0
					}, 200);
					
					$elem.find('.overlay-masked p').animate({
						left: '0px',
						opacity: 0
					}, 200).parents('.overlay-masked').fadeOut(300);
				}
			);
			
			$('.affa-team').BlackAndWhite({
				hoverEffect: true,
				webworkerPath: false,
				invertHoverEffect: true,
				intensity: 1,
				speed: {
					fadeIn: 300,
					fadeOut: 300
				}
			});
		},
		
		// Form submit function
		Form: function() {
			var pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
			
			// Checking form input when focus and keypress event
			$('.affa-form-contact input[type="text"], .affa-form-contact input[type="email"], .affa-form-contact textarea').on('focus keypress', function() {
				var $input = $(this);
				
				if ($input.hasClass('error')) {
					$input.removeClass('error');
				}
			});
			
			// Contact form when submit button clicked
			$('.affa-form-contact').submit(function() {
				var $form		= $(this);
				var submitData	= $form.serialize();
				var $name		= $form.find('input[name="name"]');
				var $email		= $form.find('input[name="email"]');
				var $message	= $form.find('textarea[name="message"]');
				var $submit		= $form.find('input[name="submit"]');
				var status		= true;
				
				if ($email.val() === '' || pattern.test($email.val()) === false) {
					$email.addClass('error');
					status = false;
				}
				if ($message.val() === '') {
					$message.addClass('error');
					status = false;
				}
				
				if (status) {
					$name.attr('disabled', 'disabled');
					$email.attr('disabled', 'disabled');
					$message.attr('disabled', 'disabled');
					$submit.attr('disabled', 'disabled');
					
					$.ajax({
						type: 'POST',
						url: 'process-contact.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');
								if (msg_split[0] === 'success') {
									$name.val('').removeAttr('disabled').removeClass('error');
									$email.val('').removeAttr('disabled').removeClass('error');
									$message.val('').removeAttr('disabled').removeClass('error');
									$submit.removeAttr('disabled');
									$form.find('.submit-status').html('<div class="submit-status-text"><span class="success"><i class="fa fa-check-circle"></i> ' + msg_split[1] + '</span></div>').fadeIn(300).delay(3000).fadeOut(300);
								} else {
									$name.removeAttr('disabled').removeClass('error');
									$email.removeAttr('disabled').removeClass('error');
									$message.removeAttr('disabled').removeClass('error');
									$submit.removeAttr('disabled').removeClass('error');
									$form.find('.submit-status').html('<div class="submit-status-text"><span class="error"><i class="fa fa-exclamation-circle"></i> ' + msg_split[1] + '</span></div>').fadeIn(300).delay(3000).fadeOut(300);
								}
							}
						}
					});
				}
				
				status = true;
				
				return false;
			});
		},
		
		// Embed animation effects to HTML elements with CSS3
		Animated: function() {
			$(window).on('load', function() {
				$('img.parallax-slider').imgpreload({
					all: function() {
						$('img.parallax-slider').addClass('loaded');
					}
				});
				
				$('.animation, .animation-visible').each(function() {
					var $element = $(this);
					$element.waypoint(function() {
						var delay = 0;
						if ($element.attr('data-delay')) delay = parseInt($element.attr('data-delay'), 0);
						if (!$element.hasClass('animated')) {
							setTimeout(function() {
								$element.addClass('animated ' + $element.attr('data-animation'));
							}, delay);
						}
						delay = 0;
					}, {
						offset: '90%'
					});
				});
			});
		},
		
		// Customizer to change the template layouts
		Customizer: function() {
			$('#customize .popup-open').click(function() {
				var $parent = $(this).parents('#customize');
				if ($parent.hasClass('in')) {
					$parent.removeClass('in');
				} else {
					$parent.addClass('in');
				}
			});
			
			$('#customize .customize-list-color a').click(function(e) {
				var $color = $(this).attr('class');
				$('head').append('<link rel="stylesheet" type="text/css" href="assets/css/colors/' + $color + '/color.css">');
				e.preventDefault();
			});
		}
		
	};
	
	// Run the main function
	$(function() {
		Wstartup.init();
	});
	
})(window.jQuery);
