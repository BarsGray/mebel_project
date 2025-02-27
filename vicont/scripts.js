$(document).ready(function () {
	let winSize = $(window).width();
	let referrerUrl = document.referrer;

	// hamburger
	$(".hamburger").on("click", function (e) {
		e.preventDefault();
		$(".header_top_box").addClass("active");
	});

	$(".close").on("click", function (e) {
		e.preventDefault();
		$(".header_top_box").removeClass("active");
	});

	// swiper
	var swiper = new Swiper(".mySwiper", {
		slidesPerView: 1,
		centeredSlides: true,
		spaceBetween: 20,
		loop: true,
		loopedSlides: 2,
		watchOverflow: true,
		autoplay: {
			delay: 3000,
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	$(".product_size").eq(0).on('click', function (e) {
		e.preventDefault();
		if ($(".product_size.active").eq(1)) {
			$(".product_prev_price").text('880 ₽')
			$(".product_currently_price").text('770 ₽')
			$(".product_size").eq(1).removeClass('active')
			$(".product_size").eq(0).addClass('active')
		}
	});
	$(".product_size").eq(1).on('click', function (e) {
		e.preventDefault();
		$(".product_prev_price").text('750 ₽')
		$(".product_currently_price").text('660 ₽')
		if ($(".product_size.active").eq(0)) {
			$(".product_size").eq(0).removeClass('active')
			$(".product_size").eq(1).addClass('active')
		}
	});


	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	$('img[data-enlargeable]').addClass('img-enlargeable').click(function () {
		if (winSize > 768) {
			var src = $(this).attr('src');
			var ul_img_arr = $('.product_display_left ul img');
			var ul_img_arr_li_items = [];
			var ul_img_arr_src = [];
			var ul_img_arr_src_id = 0;
			var arrows_for_modal = [];
			var modal;

			for (var i = 0; i < ul_img_arr.length; i++) {
				ul_img_arr_li_items += '<li><img src="' + ul_img_arr[i].src + '"></li>';
				ul_img_arr_src.push(ul_img_arr[i].src);
			}

			function removeModal() {
				modal.remove();
				$('body').off('keyup.modal-close');
			}

			if (ul_img_arr.length != 0) {
				arrows_for_modal.push('<div class="swiper-button-prev"></div>', '<div class="swiper-button-next"></div>');
			}

			modal = $('<div>')
				.css({
					background: 'RGBA(0,0,0,.5)',
					backgroundSize: 'contain',
					width: '100%',
					height: '100%',
					position: 'fixed',
					zIndex: '10000',
					top: '0',
					left: '0',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				})
				.addClass('gallery_popup_sin')
				.html('<div class="container_gallery">'
					+ ((arrows_for_modal[0]) ? arrows_for_modal[0] : '')
					+ '<div class="gallery_image_box"><div class="gallery_general_img"><img class="" data-enlargeable="" src="'
					+ src + '" alt=""></div></div><div class="gallery_close_btn"><span></span><span></span></div>'
					+ ((arrows_for_modal[1]) ? arrows_for_modal[1] : '') + '</div>')
				.appendTo('body');

			$('.gallery_close_btn, .gallery_popup_sin').click(function (e) {
				if (e.target.classList.contains('gallery_popup_sin') || e.currentTarget.classList.contains('gallery_close_btn')) {
					removeModal();
				}
			});

			for (var i = 0; i < ul_img_arr_src.length; i++) {
				if (ul_img_arr_src[i] == src) {
					ul_img_arr_src_id = i;
				}
			}

			$('.swiper-button-prev, .swiper-button-next').click(function (e) {
				if (e.currentTarget.classList.contains('swiper-button-prev')) {
					if (ul_img_arr_src_id > 0) {
						ul_img_arr_src_id--;
					} else {
						ul_img_arr_src_id = ul_img_arr_src.length - 1;
					}
					$('.gallery_general_img img').attr('src', ul_img_arr_src[ul_img_arr_src_id]);
				} else if (e.currentTarget.classList.contains('swiper-button-next')) {
					if (ul_img_arr_src_id < ul_img_arr_src.length - 1) {
						ul_img_arr_src_id++;
					} else {
						ul_img_arr_src_id = 0;
					}
					$('.gallery_general_img img').attr('src', ul_img_arr_src[ul_img_arr_src_id]);
				}
			});
			//handling ESC
			$('body').on('keyup.modal-close', function (e) {
				if (e.key === 'Escape') {
					removeModal();
				}
			});
		}
	});


	let mobile_src;

	function gallery_mobile() {
		if ($('.product_display_left ul img').length != 0) {

			mobile_src = $('.img-enlargeable').attr('src');
			let mobile_ul_img_arr = $('.product_display_left ul img');
			let mobile_ul_img_arr_src = [];
			let mobile_ul_img_arr_src_id = 0;

			function gallery_mobile_btn_prev() {
				if (mobile_ul_img_arr_src_id > 0) {
					mobile_ul_img_arr_src_id--;
				} else {
					mobile_ul_img_arr_src_id = mobile_ul_img_arr.length - 1;
				}
				$('img.img-enlargeable').attr('src', mobile_ul_img_arr_src[mobile_ul_img_arr_src_id]);
				mobile_src = mobile_ul_img_arr_src[mobile_ul_img_arr_src_id];
				mobile_ul_img_arr[mobile_ul_img_arr_src_id].parentElement.classList.add('active');
			}

			function gallery_mobile_btn_next() {
				if (mobile_ul_img_arr_src_id < mobile_ul_img_arr.length - 1) {
					mobile_ul_img_arr_src_id++;
				} else {
					mobile_ul_img_arr_src_id = 0;
				}
				$('img.img-enlargeable').attr('src', mobile_ul_img_arr_src[mobile_ul_img_arr_src_id]);
				mobile_src = mobile_ul_img_arr_src[mobile_ul_img_arr_src_id];
				mobile_ul_img_arr[mobile_ul_img_arr_src_id].parentElement.classList.add('active');
			}

			function mobile_gallery_start_src_and_id() {
				for (let i = 0; i < mobile_ul_img_arr.length; i++) {
					mobile_ul_img_arr_src.push(mobile_ul_img_arr[i].src);
					if (mobile_ul_img_arr_src[i] == mobile_src) {
						mobile_ul_img_arr_src_id = i;
					}
				}
			}

			function mobile_gallery_remove_li_active() {
				for (let i = 0; i < mobile_ul_img_arr.length; i++) {
					mobile_ul_img_arr[i].parentElement.classList.remove('active');
				}
			}




			// $('.gallery_mobile_btn_prev, .gallery_mobile_btn_next').click(function (e) {

			// 	mobile_gallery_start_src_and_id();
			// 	mobile_gallery_remove_li_active();

			// 	if (e.currentTarget.classList.contains('gallery_mobile_btn_prev')) {
			// 		gallery_mobile_btn_prev();
			// 	} else if (e.currentTarget.classList.contains('gallery_mobile_btn_next')) {
			// 		gallery_mobile_btn_next();
			// 	}
			// });


			let swipeArea = document.querySelector('.product_display>.product_display_left>.product_main_img img');
			let startX, startY, endX, endY, diffX, diffY;


			swipeArea.addEventListener('touchstart', function (event) {
				startX = event.touches[0].clientX;
				startY = event.touches[0].clientY;
				mobile_gallery_start_src_and_id();
			});

			swipeArea.addEventListener('touchmove', function (event) {

				mobile_gallery_remove_li_active();

				endX = event.changedTouches[0].clientX;
				endY = event.changedTouches[0].clientY;
				diffX = endX - startX;
				diffY = endY - startY;

				// Если движение было вертикальным, разрешаем прокрутку
				if (Math.abs(diffY) > Math.abs(diffX)) {
				} else {
					event.preventDefault(); // Предотвращаем горизонтальную прокрутку
				}
			});

			swipeArea.addEventListener('touchend', function (event) {
				// Определяем направление свайпа
				if (Math.abs(diffX) > Math.abs(diffY)) {
					if (diffX > 0) {
						gallery_mobile_btn_prev();
					} else {
						gallery_mobile_btn_next();
					}
					diffX = 0;
				}
			});
		}
	}


	if (winSize < 768) {
		gallery_mobile();
	}


	function gallery_mobile_btn_visibility() {
		if (winSize < 768) {
			gallery_mobile();
		} else {
			$('.gallery_mobile_btn_prev, .gallery_mobile_btn_next').remove();
		}
	}


	let linkImgGalleryBuf = $('.product_main_img img').attr('src');
	let listImgGallery = $(".product_display_left li");
	let itemGalCount = 0;
	while (listImgGallery.length > itemGalCount) {
		if (listImgGallery[itemGalCount].firstChild.src == linkImgGalleryBuf) {
			listImgGallery[itemGalCount].classList.add("active");
		}
		itemGalCount++;
	}

	$(".product_display_left li img").on("click", function (e) {
		let linkImgGallery = e.currentTarget.src;
		mobile_src = e.currentTarget.src;
		$('.product_main_img img').attr('src', linkImgGallery);

		$(".product_display_left li").removeClass("active");
		e.currentTarget.parentElement.classList.add("active");
	});

	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


	$('.interiors_img_box img').addClass('img-enlargeable_ii').click(function () {
		var src = $(this).attr('src');
		var ul_img_arr = $('.interiors_img_box img');
		var ul_img_arr_src = [];
		var ul_img_arr_src_id = 0;
		var arrows_for_modal = [];
		var modal;

			for (let i = 0; i < ul_img_arr.length; i++) {
				console.log('ok');
				ul_img_arr_src.push(ul_img_arr[i].src);
				if (ul_img_arr_src[i] == src) {
					ul_img_arr_src_id = i;
				}
			}

		function removeModal() {
			modal.remove();
			$('body').off('keyup.modal-close');
		}

		if (ul_img_arr.length > 1) {
			arrows_for_modal.push('<div class="swiper-button-prev"></div>', '<div class="swiper-button-next"></div>');
		}

		modal = $('<div>')
			.css({
				background: 'RGBA(0,0,0,.5)',
				backgroundSize: 'contain',
				width: '100%',
				height: '100%',
				position: 'fixed',
				zIndex: '10000',
				top: '0',
				left: '0',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			})
			.addClass('gallery_popup_sin gallery_popup_sin_int')
			.html('<div class="container_gallery">'
				+ ((arrows_for_modal[0]) ? arrows_for_modal[0] : '')
				+ '<div class="gallery_image_box"><div class="gallery_general_img"><img class="" data-enlargeable="" src="'
				+ src + '" alt=""></div></div><div class="gallery_close_btn"><span></span><span></span></div>'
				+ ((arrows_for_modal[1]) ? arrows_for_modal[1] : '') + '</div>')
			.appendTo('body');

		$('.gallery_close_btn, .gallery_popup_sin').click(function (e) {
			if (e.target.classList.contains('gallery_popup_sin') || e.currentTarget.classList.contains('gallery_close_btn')) {
				removeModal();
			}
		});

		for (var i = 0; i < ul_img_arr_src.length; i++) {
			if (ul_img_arr_src[i] == src) {
				ul_img_arr_src_id = i;
			}
		}

		$('.swiper-button-prev, .swiper-button-next').click(function (e) {
			if (e.currentTarget.classList.contains('swiper-button-prev')) {
				if (ul_img_arr_src_id > 0) {
					ul_img_arr_src_id--;
				} else {
					ul_img_arr_src_id = ul_img_arr_src.length - 1;
				}
				$('.gallery_general_img img').attr('src', ul_img_arr_src[ul_img_arr_src_id]);
			} else if (e.currentTarget.classList.contains('swiper-button-next')) {
				if (ul_img_arr_src_id < ul_img_arr_src.length - 1) {
					ul_img_arr_src_id++;
				} else {
					ul_img_arr_src_id = 0;
				}
				$('.gallery_general_img img').attr('src', ul_img_arr_src[ul_img_arr_src_id]);
			}
		});
		//handling ESC
		$('body').on('keyup.modal-close', function (e) {
			if (e.key === 'Escape') {
				removeModal();
			}
		});
		touch_int();
	});




	function touch_int() {
		let mobile_src_int;

		function gallery_mobile_int() {
			if ($('.interiors_img_box .img-enlargeable_ii').length != 0) {

				mobile_src_int = $('.interiors_img_box .img-enlargeable_ii').attr('src');
				let mobile_ul_img_arr = $('.interiors_img_box .img-enlargeable_ii');
				let mobile_ul_img_arr_src = [];
				let mobile_ul_img_arr_src_id = 0;


				function mobile_gallery_start_src_and_id_int() {
					mobile_ul_img_arr_src = [];
					for (let i = 0; i < mobile_ul_img_arr.length; i++) {
						mobile_ul_img_arr_src.push(mobile_ul_img_arr[i].src);
						if (mobile_ul_img_arr_src[i] == mobile_src_int) {
							mobile_ul_img_arr_src_id = i;
						}
					}
				}

				// function mobile_gallery_remove_li_active_int() {
				// 	for (let i = 0; i < mobile_ul_img_arr.length; i++) {
				// 		mobile_ul_img_arr[i].parentElement.classList.remove('active');
				// 	}
				// }

				function gallery_mobile_btn_prev_int() {
					if (mobile_ul_img_arr_src_id > 0) {
						mobile_ul_img_arr_src_id--;
					} else {
						mobile_ul_img_arr_src_id = mobile_ul_img_arr.length - 1;
					}
					// console.log(mobile_ul_img_arr_src[mobile_ul_img_arr_src_id]);
					// console.log($('.gallery_general_img img.img-enlargeable_ii'));
					$('.gallery_general_img img').attr('src', mobile_ul_img_arr_src[mobile_ul_img_arr_src_id]);
					mobile_src_int = mobile_ul_img_arr_src[mobile_ul_img_arr_src_id];
					// mobile_ul_img_arr[mobile_ul_img_arr_src_id].parentElement.classList.add('active');
				}

				function gallery_mobile_btn_next_int() {
					if (mobile_ul_img_arr_src_id < mobile_ul_img_arr.length - 1) {
						mobile_ul_img_arr_src_id++;
					} else {
						mobile_ul_img_arr_src_id = 0;
					}
					// console.log(mobile_ul_img_arr_src[mobile_ul_img_arr_src_id]);
					// console.log($('.gallery_general_img img.img-enlargeable_ii'));
					$('.gallery_general_img img').attr('src', mobile_ul_img_arr_src[mobile_ul_img_arr_src_id]);
					mobile_src_int = mobile_ul_img_arr_src[mobile_ul_img_arr_src_id];
					// mobile_ul_img_arr[mobile_ul_img_arr_src_id].parentElement.classList.add('active');
				}





				let swipeArea_int = document.querySelector('.gallery_popup_sin_int .gallery_general_img');
				let start_intX, start_intY, end_intX, end_intY, diff_intX, diff_intY;

				swipeArea_int.addEventListener('touchstart', function (event) {
					start_intX = event.touches[0].clientX;
					start_intY = event.touches[0].clientY;
					mobile_gallery_start_src_and_id_int();
				});

				swipeArea_int.addEventListener('touchmove', function (event) {

					// mobile_gallery_remove_li_active_int();

					end_intX = event.changedTouches[0].clientX;
					end_intY = event.changedTouches[0].clientY;
					diff_intX = end_intX - start_intX;
					diff_intY = end_intY - start_intY;

					// Если движение было вертикальным, разрешаем прокрутку
					if (Math.abs(diff_intY) > Math.abs(diff_intX)) {
					} else {
						event.preventDefault(); // Предотвращаем горизонтальную прокрутку
					}
				});

				swipeArea_int.addEventListener('touchend', function (event) {
					// Определяем направление свайпа
					if (Math.abs(diff_intX) > Math.abs(diff_intY)) {
						if (diff_intX > 0) {
							gallery_mobile_btn_prev_int();
						} else {
							gallery_mobile_btn_next_int();
						}
						diff_intX = 0;
					}
				});
			}
		}
		gallery_mobile_int();
	}

	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



	$('#billing_address_1').attr('required');
	$('#billing_address_1_field, #billing_address_2_field, #billing_apartment_field, #billing_floor_field, #billing_entrance_field, #billing_wooccm12_field').addClass('validate-required wooccm-required-field');
	$('#billing_address_1').attr('data-required', '1');
	bonus_start = parseInt($('.bonus_sum').text().match(/\d+/));
	total_price_start = parseInt($('.woocommerce_total_price bdi').text().match(/\d+/));

	$('#billing_deliverymethod_kurer').prop('checked', true);
	$('#date_check').prop('checked', true);
	$('#billing_deliverymethod_field .woocommerce-radio-wrapper').click(function () {

		if ($('#billing_deliverymethod_kurer').is(':checked')) {
			$('#billing_address_1_field, #billing_address_2_field, #billing_apartment_field, #billing_floor_field, #billing_entrance_field, #billing_wooccm12_field').attr('style', '');
			$('#billing_address_1_field, #billing_address_2_field, #billing_apartment_field, #billing_floor_field, #billing_entrance_field, #billing_wooccm12_field').addClass('validate-required wooccm-required-field');
			$('.woocommerce_checkout_our_address').attr('style', 'display: none;');

			$('#billing_wooccm11').removeAttr('disabled');
			$('#billing_wooccm12').prop('checked', false);
			$('#billing_address_1').attr('data-required', '1');

			$('.select_date_wrapper').attr('style', '');
			$('.box_date_check_wrapper h5').html('Время доставки');
			$('#billing_deliverymethod_time_field label').html('Время доставки');
			$('.deliverymethod_time span').html('Время доставки');
		} else {
			$('#billing_address_1_field, #billing_address_2_field, #billing_apartment_field, #billing_floor_field, #billing_entrance_field, #billing_wooccm12_field').attr('style', 'display: none !important;');
			$('#billing_address_1_field, #billing_address_2_field, #billing_apartment_field, #billing_floor_field, #billing_entrance_field, #billing_wooccm12_field').removeClass('validate-required wooccm-required-field');

			$('.woocommerce_checkout_our_address').attr('style', 'display: flex;');
			$('#billing_address_1').attr('data-required', '0');

			$('.select_date_wrapper').attr('style', 'padding-top: 0;');


			$('.box_date_check_wrapper h5').html('Время самовывоза');
			$('#billing_deliverymethod_time_field label').html('Время самовывоза');
			$('.deliverymethod_time span').html('Время самовывоза');
		}

		if ($('#billing_deliverymethod_samovivoz').is(':checked')) {

			$('.bonus_sum').text(Math.round(bonus_start + $('.info_on_bonuss_box').attr("data-samovivoz") / 100 * total_price_start) + ' \u20bd');
		} else {
			$('.bonus_sum').text(bonus_start + ' \u20bd');
		}
	});


	$('#billing_deliverymethod_date_field, #billing_deliverymethod_time_field').attr('style', 'display: none !important;');
	$('#billing_deliverymethod_date_field, #billing_deliverymethod_time_field').removeClass('validate-required');
	// $(".select_date_wrapper_items").attr('style', 'grid-template-rows: 70px 40px 1fr 1fr;');
	$("#date_check").parent().attr('style', 'background-color: rgb(255, 255, 255);');

	function createNewElemTimeNow() {
		if ($('#billing_deliverymethod_samovivoz').is(':checked')) {
			return '<span class="deliverymethod_time"><span calss="deliverymethod_time_title">Время самовывоза</span>: ' + $('#billing_deliverymethod_time').find('option:first-child').html() + '</span>';
			// let newElemTimeNowSamovivoz = '<span class="deliverymethod_time">Время самовывоза: ' + $('#billing_deliverymethod_time').find('option:first-child').html() + '</span>';
		} else {
			return '<span class="deliverymethod_time"><span calss="deliverymethod_time_title">Время доставки</span>: ' + $('#billing_deliverymethod_time').find('option:first-child').html() + '</span>';
			// let newElemTimeNow = '<span class="deliverymethod_time">Время доставки: ' + $('#billing_deliverymethod_time').find('option:first-child').html() + '</span>';
		}

	}
	$('.select_date_wrapper_items').append(createNewElemTimeNow());


	$('.select_date_wrapper').click(function () {
		if ($('#date_check').is(':checked')) {
			$('#billing_deliverymethod_date_field, #billing_deliverymethod_time_field').attr('style', 'display: none !important;');
			$('#billing_deliverymethod_date_field, #billing_deliverymethod_time_field').removeClass('validate-required');

			$("#billing_deliverymethod_time option:first-child").prop('selected', true);
			$("#billing_deliverymethod_date_field option:first-child").prop('selected', true);
			// $(".select_date_wrapper_items").attr('style', 'grid-template-rows: 70px 40px 1fr 1fr;');
			$("#date_check").parent().attr('style', 'background-color: rgb(255, 255, 255);');
			$("#date_check_to_time").parent().attr('style', '');

			if ($('.deliverymethod_time').length == 0) {
				$('.select_date_wrapper_items').append(createNewElemTimeNow());
			}
		} else {
			$('#billing_deliverymethod_date_field, #billing_deliverymethod_time_field').attr('style', '');
			$('#billing_deliverymethod_date_field, #billing_deliverymethod_time_field').addClass('validate-required');
			$(".select_date_wrapper_items").attr('style', '');

			$("#date_check").parent().attr('style', '');
			$("#date_check_to_time").parent().attr('style', 'background-color: rgb(255, 255, 255);');

			$('.deliverymethod_time').remove();
		}
	});

	$('#billing_wooccm12_field span').click(function () {
		if ($('#billing_wooccm12').is(':checked')) {
			$('#billing_apartment_field, #billing_floor_field, #billing_entrance_field').attr('style', 'display: none !important;');
			$('.select_date_wrapper').attr('style', 'padding-top: 0;');
		} else {
			$('#billing_apartment_field, #billing_floor_field, #billing_entrance_field').attr('style', '');
			$('.select_date_wrapper').attr('style', '');
		}
	});


	// if (referrerUrl.includes('ohpirogi.ru')) {
	// 	if (winSize < 767) {
	// 		let offsetVel = $(".entry-header").offset().top - 55;
	// 		window.scrollTo(0, offsetVel);
	// 	}
	// }

	// console.log($('section.product'));
	if (referrerUrl.includes('ohpirogi.ru')) {
		if (winSize < 767) {
			if ($('section.product').length > 0) {
				let offsetVel = $('section.product').offset().top - 45;
				window.scrollTo(0, offsetVel);
			} else {
				let offsetVel = $(".entry-header").offset().top - 55;
				window.scrollTo(0, offsetVel);
			}
		}
	}


	$("#mobile_menu_top_btn").on("click", function (e) {
		e.preventDefault();

		var get_id = $(this).attr("data-skr");
		var target = $("#" + get_id).offset().top;
		$("html, body").animate({ scrollTop: target }, 800);
	});

	$("#billing_phone").mask("+7 (***) ***-**-**");



	let timeToday = $('#billing_deliverymethod_time').html();

	$("#billing_deliverymethod_date").on("click", function (e) {

		if (e.target.tagName == 'OPTION') {


			if ($('#billing_deliverymethod_date')[0].selectedIndex !== 0) {
				let hPrev = 10;
				let hNext = 11;
				let arr_time;
				for (i = 0; i < 12; i++) {
					arr_time += '<option value="' + (((String(hPrev).length) == 1) ? '0' + hPrev : hPrev) + ':00 - ' + hNext + ':00">' + (((String(hPrev).length) == 1) ? '0' + hPrev : hPrev) + ':00 - ' + hNext + ':00</option>';
					hNext++;
					hPrev++;
				}

				$('#billing_deliverymethod_time')
					.find('option')
					.remove()
					.end()
					.append(arr_time);
			} else {
				$('#billing_deliverymethod_time')
					.find('option')
					.remove()
					.end()
					.append(timeToday);
			}
		}
	});


	$('body').on("click", function (e) {
		try {
			if (!window.location.href.includes('/cart')) {
				if (e.target.parentElement.classList.contains('add_to_cart_button') || e.target.parentElement.classList.contains('single_add_to_cart_button') || e.target.classList.contains('add_to_cart_button') || e.target.classList.contains('single_add_to_cart_button')) {

					let targetElement;
					if (e.target.parentElement.classList.contains('add_to_cart_button') || e.target.parentElement.classList.contains('single_add_to_cart_button')) {
						targetElement = e.target.parentElement;
					} else if (e.target.classList.contains('add_to_cart_button') || e.target.classList.contains('single_add_to_cart_button')) {
						targetElement = e.target;
					}

					setTimeout(() => {
						if (targetElement.querySelector('.item_count_vip')) {
							let prod_coun = targetElement.querySelector('.item_count_vip').innerHTML;
							targetElement.querySelector('.item_count_vip').innerHTML = +prod_coun + 1;
						} else {
							targetElement.innerHTML += '<span class="item_count_vip">1</span>';
						}
						if (targetElement.classList.contains('single_add_to_cart_button')) {
							targetElement.setAttribute('disabled', true);
						}
					}, 100);

					if (targetElement.classList.contains('single_add_to_cart_button')) {
						setTimeout(() => {
							targetElement.removeAttribute('disabled');
						}, 200);
					}

					if (!targetElement.classList.contains('prod_btn')) {
						targetElement.querySelector(".add_to_cart_btn_text").innerHTML = 'Товар в корзине';
						targetElement.classList.add('in_basket');
						var newUrlImgBtn = targetElement.querySelector('img').getAttribute('src');
						newUrlImgBtn = newUrlImgBtn.replace('shopping-cart.svg', 'shopping-cart-black.png');
						targetElement.querySelector('img').setAttribute('src', newUrlImgBtn);
					}
				}
			}
		} catch (arr) { }
	});

	let select = document.querySelectorAll('li.variable-item');
	if (referrerUrl.includes('/mini-pirogi')) {
		setTimeout(() => {
			select[1].click();
		}, 300);
	}

	$('.add_basket.button.add_to_cart_button').on('click', function (e) {
		$('add_basket.button.add_to_cart_button').addClass('.add_show');
		setTimeout(() => {
			$('.add_basket.button.add_to_cart_button').removeClass('.add_show');
		}, 1000);
	});


	let nav = $('.submenu');
	// let headerBlok = $('#header');
	// let navHeight = nav.height();
	let wpadminbar = ($('#wpadminbar').innerHeight()) ? $('#wpadminbar').innerHeight() : 0;

	let h = nav.offset().top;

	function wpadminbarAdaptive() {
		navHeight = nav.height();
		h = nav.offset().top;

		wpadminbar = ($('#wpadminbar').innerHeight()) ? $('#wpadminbar').innerHeight() : 0;
	}



	function navFixedDesk() {
		if (winSize > 992) {
			if ($(window).scrollTop() > (nav.offset().top - wpadminbar)) {
				$('.submenu').addClass('fixed');
			} else {
				$('.submenu').removeClass('fixed');
			}
		} else {
			$('.submenu').removeClass('fixed');
		}
	}

	$(window).scroll(function () {
		navFixedDesk();
	});


	$('form.variations_form').on('submit', function (e) {
		e.preventDefault();

		var $form = $(this),
			product_id = $form.find('input[name="product_id"]').val(),
			quantity = $form.find('input[name="quantity"]').val() || 1,
			variation_id = $form.find('input[name="variation_id"]').val() || 0,
			variation = $form.serializeArray().reduce(function (obj, item) {
				if (item.name.startsWith('attribute_')) {
					obj[item.name] = item.value;
				}
				return obj;
			}, {});

		var data = {
			action: 'custom_add_to_cart',
			product_id: product_id,
			quantity: quantity,
			variation_id: variation_id,
			variation: variation
		};

		$.ajax({
			type: 'POST',
			url: wc_add_to_cart_params.ajax_url,
			data: data,
			beforeSend: function (response) {
				$form.find('.single_add_to_cart_button').removeClass('added').addClass('loading');
			},
			complete: function (response) {
				$form.find('.single_add_to_cart_button').removeClass('loading').addClass('added');
			},
			success: function (response) {
				if (response.error && response.product_url) {
					window.location = response.product_url;
					return;
				} else {
					$(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, $form]);
				}
			}
		});

		return false;
	});


	if ($('.simple_price_dont_sale').length != 0) {
		if ($('.simple_price_dont_sale span').text()) {
			$('.simple_price_dont_sale').attr('style', 'display: flex');
		}
	}

	function price_dont_sale_hide() {
		if ($('.price_dont_sale .price del').length != 0) {
			$('.price_dont_sale').attr('style', 'display: flex');
		} else {
			$('.price_dont_sale').attr('style', '');
		}
	}

	setTimeout(() => {
		price_dont_sale_hide();
	}, 300);

	if ($('.price_dont_sale').length != 0) {
		$('.variable-items-wrapper li').on('click', function (e) {
			setTimeout(() => {
				price_dont_sale_hide();
			}, 5);
		});
	}

	$('.mobile_search_btn').on('click', function (e) {
		e.preventDefault();

		if ($('.mobile_appear .search_form').hasClass('active')) {
			$('.search_form').attr('style', 'bottom: 0');
			$('.mobile_appear .search_form').removeClass('active');
		} else {
			var heaightMobileForm = $('.mobile_appear .search_form').outerHeight();
			var heaightMobileAppear = $('footer .mobile_appear .mobile_footer_block').outerHeight();
			$('.search_form').attr('style', 'bottom: ' + heaightMobileAppear + 'px;');
			$('.mobile_appear .search_form').addClass('active');
		}
	});


	let alertNonData = '<p class="alert_pay">Заполните поле</p>';
	let alertPay = '<p class="alert_pay">Выберите способ оплаты</p>';
	$('#billing_deliverymethod_date_pay1_field').append(alertPay);
	$('#billing_first_name_field, #billing_phone_field, #billing_address_1_field, #billing_address_2_field').append(alertNonData);

	$('#billing_deliverymethod_date_pay1_cash, #billing_deliverymethod_date_pay1_pay').on('click', function () {
		if ($('#billing_deliverymethod_date_pay1_cash').is(':checked') || $('#billing_deliverymethod_date_pay1_pay').is(':checked')) {
			$('#billing_deliverymethod_date_pay1_field .alert_pay').remove();
		}
	});

	// $('#billing_first_name_field input, #billing_phone_field input, #billing_address_1_field input, #billing_address_2_field input').on('click', function (e) {
	// 	$(this).parent().parent().find('.alert_pay').remove();
	// });

	$("form.woocommerce-checkout").on('checkout_place_order', function (e) {
		let checkedinp = 0;
		// if (!($('#billing_deliverymethod_date_pay1_cash').is(':checked') || $('#billing_deliverymethod_date_pay1_pay').is(':checked'))) {
		// 	$('#billing_deliverymethod_date_pay1_field .alert_pay').addClass('alert_pay_active');
		// 	checkedinp = 1;
		// }
		if ($('#billing_first_name').val() < 3) {
			$('#billing_first_name_field .alert_pay').addClass('alert_pay_active');
			checkedinp = 1;
		} else {
			$('#billing_first_name_field .alert_pay').removeClass('alert_pay_active');
		}
		if ($('#billing_phone').val() < 3) {
			$('#billing_phone_field .alert_pay').addClass('alert_pay_active');
			checkedinp = 1;
		} else {
			$('#billing_phone_field .alert_pay').removeClass('alert_pay_active');
		}
		// if ($('#billing_address_1').val() < 3 && $('#billing_deliverymethod_kurer').is(':checked')) {
		// 	$('#billing_address_1_field .alert_pay').addClass('alert_pay_active');
		// 	checkedinp = 1;
		// } else {
		// 	$('#billing_address_1_field .alert_pay').removeClass('alert_pay_active');
		// }
		// if ($('#billing_address_2').val() == 0 && $('#billing_deliverymethod_kurer').is(':checked')) {
		// 	$('#billing_address_2_field .alert_pay').addClass('alert_pay_active');
		// 	checkedinp = 1;
		// } else {
		// 	$('#billing_address_2_field .alert_pay').removeClass('alert_pay_active');
		// }
		// if ($('#billing_wooccm11').val() == 0 && $('#billing_deliverymethod_kurer').is(':checked') && !$('#billing_wooccm12').is(':checked')) {
		// 	$('#billing_wooccm11_field .alert_pay').addClass('alert_pay_active');
		// 	checkedinp = 1;
		// } else {
		// 	$('#billing_wooccm11_field .alert_pay').removeClass('alert_pay_active');
		// }
		if (checkedinp == 1) {
			return false;
		}
	});











	total_price = parseInt($('.woocommerce_total_price bdi').text().match(/\d+/));
	bonuss_field_cesh = $('.info_on_bonuss_box');
	// console.log(total_priceInt);

	// function total_price_with_discount_samovivoz(vel) {
	// 	return ($('#billing_deliverymethod_samovivoz').is(':checked')) ? total_price - 10 / 100 * total_price : total_price;
	// }

	$('#billing_bonuss').on('input', function () {
		// console.log($('#billing_bonuss').val() > 0);

		if ($('#billing_bonuss').val() == 0 || $('#billing_bonuss').val() == '') {
			$('#customer_details').append(bonuss_field_cesh);
		}
		// else if ($('#billing_bonuss').val() > 0) {
		// 	$('.info_on_bonuss_box').remove();
		// 	// if ($('.info_on_bonuss_box')) {
		// 	// }
		// }
	});

	$('#billing_bonuss').on('click', function () {
		$('#billing_bonuss').val('');
		$('.woocommerce_total_price bdi').text(total_price + ' \u20bd');
		// $('.woocommerce_total_price bdi').text(total_price_with_discount_samovivoz(total_price) + ' \u20bd');
		$('#customer_details').append(bonuss_field_cesh);
	});

	$('.bonuss_field_button').on('click', function () {
		if ($('#billing_bonuss').val() != 0) {
			total_price_res = total_price - $('#billing_bonuss').val();
			// total_price_res = total_price_with_discount_samovivoz(total_price) - $('#billing_bonuss').val();
			// bonuss_field_cesh = $('.info_on_bonuss_box');
			$('.info_on_bonuss_box').remove();

			if (total_price_res >= 50 / 100 * total_price) {
				// if (total_price_res >= 50 / 100 * total_price_with_discount_samovivoz(total_price)) {
				$('.woocommerce_total_price bdi').text(((total_price_res < 0) ? 0 : total_price_res) + ' \u20bd');
			} else {
				$('.woocommerce_total_price bdi').text((50 / 100 * total_price) + ' \u20bd');
				// $('.woocommerce_total_price bdi').text((50 / 100 * total_price_with_discount_samovivoz(total_price)) + ' \u20bd');
			}
			// console.log();
		} else {
			// (($('#billing_deliverymethod_samovivoz').is(':checked')) ? 10 / 100 * total_price : 0)

			$('.woocommerce_total_price bdi').text(total_price + ' \u20bd');
			// $('.woocommerce_total_price bdi').text(total_price_with_discount_samovivoz(total_price) + ' \u20bd');
		}

	});








	function updateCartButton() {
		$.ajax({
			url: woocommerce_params.ajax_url,
			type: 'POST',
			data: {
				action: 'update_cart_button'
			},
			success: function (response) {
				// Обновление кнопки корзины
				$('.card_btn .amount').html(response.cart_total);
				$('.card_btn .count').html(response.cart_count);
			}
		});
	}

	let changeTimeout;

	$('body').on('click', 'a.remove', function () {
		setTimeout(() => {
			updateCartButton();
		}, 500);
	});
	$('body').on('click', '.plus, .minus', function (e) {
		e.preventDefault();
		// $(".card_btn .amount").html('test');

		let input = this.parentElement.querySelector('.qty');
		let inputChange = $(e.currentTarget.parentElement).find('.qty');

		if (e.currentTarget.classList.contains('plus')) {
			input.stepUp();
			inputChange.val(inputChange.val()).change();

		} else if (e.currentTarget.classList.contains('minus')) {
			input.stepDown();
			inputChange.val(inputChange.val()).change();

		}

		clearTimeout(changeTimeout);

		changeTimeout = setTimeout(() => {
			$('[name="update_cart"]').trigger('click');
			setTimeout(() => {
				updateCartButton();
			}, 500);
		}, 400);
	});

	$('body').on('change', '.qty', function () { // поле с количеством имеет класс .qty
		clearTimeout(changeTimeout);

		changeTimeout = setTimeout(() => {
			$('[name="update_cart"]').trigger('click');
			setTimeout(() => {
				updateCartButton();
			}, 500);
		}, 400);
	});

	if (window.location.href.includes('/checkout')) {
		document.getElementById("billing_apartment").addEventListener('input', restrictToInteger);
		document.getElementById("billing_floor").addEventListener('input', restrictToInteger);
		document.getElementById("billing_entrance").addEventListener('input', restrictToInteger);
		document.getElementById("billing_bonuss").addEventListener('input', restrictToInteger);
		document.getElementById("billing_address_2").addEventListener('input', restricInputtHome);
	}

	if (window.location.href.includes('/my-account/edit-address/billing')) {
		document.getElementById("billing_apartment").addEventListener('input', restrictToInteger);
		document.getElementById("billing_floor").addEventListener('input', restrictToInteger);
		document.getElementById("billing_entrance").addEventListener('input', restrictToInteger);
		document.getElementById("billing_address_2").addEventListener('input', restricInputtHome);
		// document.getElementById("date_of_birth").addEventListener('input', restricInputtDate);
	}

	function restrictToInteger() {
		this.value = this.value.replace(/[^\d.]/g, '');
	}
	function restricInputtHome() {
		this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9/]/g, '');
	}
	function restricInputtDate() {
		this.value = this.value.replace(/[^\d.]/g, '');
	}

	if (window.location.href.includes('/my-account/edit-address/billing')) {
		document.getElementById('date_of_birth').addEventListener('input', function (e) {
			let value = e.target.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
			let formattedValue = '';


			if (value.length > 8) {
				value = value.substr(0, 8);
			}

			if (value.length > 2) {
				formattedValue += value.substr(0, 2) + '.';
				value = value.substr(2);
			}
			if (value.length > 2) {
				formattedValue += value.substr(0, 2) + '.';
				value = value.substr(2);
			}
			formattedValue += value;

			e.target.value = formattedValue;
		});
	}






	$('.woocommerce-form-login').on('submit', function (e) {
		e.preventDefault(); // Предотвращаем отправку формы по умолчанию

		var email = $('#username').val();
		var password = $('#password').val();

		$.ajax({
			url: wc_login_params.ajax_url,
			type: 'POST',
			data: {
				action: 'custom_login_check',
				email: email,
				password: password
			},
			success: function (response) {
				if (response.success) {
					window.location.href = response.data.redirect_url; // Перенаправление при успешном входе
				} else {
					$('.alert_pay').addClass('alert_pay_active');
					// $('#password').html(response.data.error_message); // Вывод сообщения об ошибке
				}
			}
		});
	});




	$(window).resize(function () {
		winSize = $(window).width();
		gallery_mobile_btn_visibility();
		wpadminbarAdaptive();
		navFixedDesk();
	});



















});