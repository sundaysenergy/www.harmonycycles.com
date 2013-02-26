jQuery(document).ready(function($) {

	/* ########## */
	/* NAVIGATION */
	/* ########## */

	// Setup localScrollTo for navigation
	$('.navbar-fixed-top .nav').localScroll({
		queue:true,
		duration:1000,
		hash:true,
		onBefore:function( e, anchor, $target ){
			// The 'this' is the settings object, can be modified
		},
		onAfter:function( anchor, settings ){
			
		}
	});
	
	/* ######### */
	/* PORTFOLIO */
	/* ######### */

	var work_holder = $('.current-work-holder');
	var carousel_navigation = $('.navigation-wraper')

	$('.work-thumbs li').each(function(e) { // for each link-thumb in portfolio

		$(this).on('click', function(e) { 

			e.preventDefault(); // prevent default link behaviour
			var url = $(this).find('a').attr('href'); // find href value
			
			work_holder.fadeOut(400); // fade out current portfolio item

			$.scrollTo('#work', 400, { // scroll window to portfolio-item holder
				onAfter: function() {
					loadPortfolioItem(url); // call function that loads portfolio item
				}
			});

		})
	});
	

  $('#harmony-questions').bind('click', function(e) {
			e.preventDefault(); // prevent default link behaviour

			var url = $(this).attr('href'); // find href value
			
			work_holder.fadeOut(400); // fade out current portfolio item

			$.scrollTo('#work', 400, { // scroll window to portfolio-item holder
				onAfter: function() {
					loadPortfolioItem(url); // call function that loads portfolio item
				}
			});

  });



	function loadPortfolioItem(url) {

		$.ajax({
				url: url,
				dataType: 'html',
				success: function(data) {

					work_holder.html(data); // place hidden html inside work holder

					var imageCount = work_holder.find('img').length; // count images to preload
					

					if (imageCount > 0) { // preload images only if they exist

						var imagesLoaded = 0; // iteration helper
						$(data).find('img') // find images inside loaded content
			                   .load( function() { // w8 for images to load
			                       ++imagesLoaded;
			                       if (imagesLoaded >= imageCount) {
			                       		//when images are loaded, show work_holder
			                            work_holder.fadeIn(400);
			                       }
			                   });

					} else { // if no images, then content is ready to show

						work_holder.fadeIn(400);

					}
					
		            
					// setup carousel navigation (it is outside of the work holder)
					// if it is not displayed yet, then check is there a carousel inside current portfolio item and show it if so.
					if (work_holder.find('.carousel').html() != undefined) {
						carousel_id = "#" + work_holder.find('.carousel').attr('id'); // get carousel #id
						carousel_navigation.find('a').attr('href', carousel_id); // add #id as href to make navigation work with carousel
						carousel_navigation.slideDown(400);
					} else {
						carousel_navigation.slideUp(400);
					}
				}
			});

	} // loadPortfolioItem

	/* ##### */
	/* ABOUT */
	/* ##### */

	var	selectedMember = '';

	$('ul.members').find('a').on('click', function(e) {

		e.preventDefault();
		selectedMember = $(this).attr('href');
		activeMember = "#" + $('.member-holder.active').attr('id');

		if (activeMember == selectedMember ) { // if clicked again on the same member, then just move to it
			$.scrollTo(activeMember, 400, {offset: { top: -80 } });
		} else { //load new member
			$('.member-holder.active').fadeOut(400, function() {
				$(this).removeClass('active');
				$(selectedMember).addClass('active').fadeIn(400);
				$.scrollTo(selectedMember, 400, {offset: { top: -80 } } );
			})
		}

		

	})

});

