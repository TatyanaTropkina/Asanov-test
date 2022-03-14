$(function(){
	// hover on card
	$("body").on("mouseover", ".item-product", function(e) {
		e.preventDefault();
		$(this).children('.info').slideDown(500, 'linear');
	});
	$("body").on("mouseleave", ".item-product", function(e) {
		e.preventDefault();
		$(this).children('.info').slideUp(500);
	});
	//  breakpoints
	$(document).ready(function () {
		if($(window).width() < 550 ){
			$('.mobile__btn').on('click', function(){
				$(this).siblings('.mobile__more').slideDown();
				$(this).hide();
			})
		}
		if ($(window).width() < 767) {			
			$('.js-cart-value').html('');
			$('.header__form-select ').insertBefore('.actions__search');
			$('.trends__title').html('Мы рекомендуем');
			$('.item-product__btn').html('');

			$('.menu__item-btn').clone().appendTo('.menu__item-title')
		} else {
		}
		if ($(window).width() < 992) {
			$('.form-select').appendTo('.actions__inner');
			$('.js-account').html('');
			$('.js-phone-link').html('').appendTo('.js-actions-links');
			$('.navbar-toggler').on('click', function(){
				$('.sidebar__inner').toggleClass('active');
			})
		} 

		else {}

	});
});


window.onload = function() {
// load cards
	async function getProducts() {
			
		const file = "json/trends.json";
		let response = await fetch(file, {
		method: 'GET'
		});
		if(response.ok) {
		let result = await response.json();
		loadProducts(result);
		}
		
		function loadProducts(data){
		
		const ProductsItems = document.querySelector('.owl-carousel.trends-slider');
		data.cards.forEach(item => {
		const productId = item.id;
		const productLabel = item.label;
		const productLink = item.link;
		const productImg = item.images;
		const productTitle = item.title;
		const productPriceCurrent = item.priceCurrent;
		const productPriceOld = item.priceOld;
		const productStock = item.available;
		const productInfo1 = item.info1;
		const productInfo2 = item.info2;
		const productInfo3 = item.info3;

				let productStart = `<article data-pid="${productId}" class="products__item item-product">`;
				let productEnd = `</article>`;

				let productLabels = '';
				if (productLabel) {
					let productLabelsStart = `<div class="item-product__labels">`;
					let productLabelsEnd = `</div>`;
					let productLabelsContentStart = '';
					productLabelsContent = ''
					let productLabelsContentEnd = `</div>`;
					let productLabelsIcon = '';
	
					productLabel.forEach(labelItem => {
						productLabelsContentStart += `<div class="item-product__label item-product__label--${labelItem.type}">`;
						if(!`${labelItem.icon}` == "") {
							productLabelsIcon += `
							<span class="__${labelItem.icon}"></span>
							`;
						}
						productLabelsContent += `${labelItem.text}`;
					});
	
				productLabels += productLabelsStart;
				productLabels += productLabelsContentStart;
				productLabels += productLabelsIcon;
				productLabels += productLabelsContent;
				productLabels += productLabelsContentEnd;
				productLabels += productLabelsEnd;
				};

				let productImage = '';
				let productImageStart = '<div class="item-product__images carousel-inner">';
				let productImageEnd = '</div>';
				let productImageContent = '';
			
				let productImage1 = '';
				let productImage2 = '';
				let productImage3 = '';
				
				productImg.forEach(imagesItem => {
					if(!`${imagesItem.image1}` == "") {
						productImage1 += `
						<a class="item-product__link carousel-item active" href="${productLink}">
						<img class="item-product__img" src="images/${imagesItem.image1}" alt='${productTitle}'></a>
						`;
					}
					
					if(!`${imagesItem.image2}` == "") {
						productImage2 += `<a class="item-product__link carousel-item" href="${productLink}">
						<img class="item-product__img" src="images/${imagesItem.image2}" alt='${productTitle}'></a>`;
					}
				
					if(!`${imagesItem.image3}` == "") {
						productImage3 += `<a class="item-product__link carousel-item" href="${productLink}">
						<img class="item-product__img" src="images/${imagesItem.image3}" alt='${productTitle}'></a>`;
					}
					
				});
		
				productImageContent += productImage1;
				productImageContent += productImage2;
				productImageContent += productImage3;
				productImage += productImageStart;
				productImage += productImageContent;
				productImage += productImageEnd;

				let productColors = '';
				let productColorsStart = `<div class="item-product__colors carousel-indicators">`;
				let productColorsEnd = `</div>`;
				let productColorsContent = '';
				let productColors1 = '';
				let productColors2 = '';
				let productColors3 = '';
						productImg.forEach(imagesItem => {
							if(!`${imagesItem.image1}` == "") {
								productColors1 += `<img class="item-product__color active" src="images/${imagesItem.image1}" alt='' data-bs-target="#carouselExampleIndicators${productId}" data-bs-slide-to="0" aria-current="true" aria-label="Slide 1">`;
							} 
							
							if(!`${imagesItem.image2}` == "") {
								productColors2 += `<img class="item-product__color" src="images/${imagesItem.image2}" alt='' data-bs-target="#carouselExampleIndicators${productId}" data-bs-slide-to="1" aria-label="Slide 2">`;
							}
						
							if(!`${imagesItem.image3}` == "") {
								productColors3 += `<img class="item-product__color" src="images/${imagesItem.image3}" alt='' data-bs-target="#carouselExampleIndicators${productId}" data-bs-slide-to="2" aria-label="Slide 3">`;
							}
							
						});
				productColorsContent += productColors1;
				productColorsContent += productColors2;
				productColorsContent += productColors3;
				productColors += productColorsStart;
				productColors += productColorsContent;
				productColors += productColorsEnd;
	// ??
	// ?? Prices
	
				let productPrices = '';
				let productPricesStart = `<div class="item-product__prices">`;
				let productPricesCurrent = `<div class="item-product__price item-product__price-current" data-price="${productPriceCurrent}">${productPriceCurrent} &#8381</div>`;
				let productPricesOld = `<div class="item-product__price item-product__price-old">${productPriceOld} &#8381</div>`;
				let productPricesEnd = `</div>`;
	
				productPrices = productPricesStart;
				if (productPriceOld) {
					productPrices += productPricesOld;
				}
				productPrices += productPricesCurrent;
				productPrices += productPricesEnd;

				let productActions = '';
				let productActionsStart = '<div class="item-product__actions">';
				let productActionsEnd = '</div>';
				let productActionsContent =`
				<div class="item-product__btn-group product-controls">
				<span class="product-controls__icon  btn__minus __minus"></span>
				<span class="product-controls__icon btn__plus __plus"></span>
				<button class="product-controls__btn product-controls__desktop">Купить</button>
				<button class="product-controls__btn product-controls__mob __cart-fill"></button>
				</div>`;
				productActions += productActionsStart;
				productActions += productPrices;
				productActions += productActionsContent;
				productActions += productActionsEnd;
	
	
				let productHead = '';
				let productHeadStart = `<div class="item-product__head carousel slide carousel-fade" id="carouselExampleIndicators${productId}" data-bs-ride="carousel">`;
				let productHeadEnd ='</div>'
	
				productHead += productHeadStart;
				productHead += productLabels;
				productHead += productImage;
				productHead += productColors;
				productHead += productHeadEnd;
	

				let productExtra = '';
				let productExtraStart = '<ul class="item-product__info info">';
				let productExtraEnd = '</ul>';
				let productExtraContent1 = '';
				let productExtraContent2 = '';
				let productExtraContent3 = '';
				productInfo1.forEach(info1Item => {
					productExtraContent1 += `
					<li class="info__item">
					<p class="info__descr">${info1Item.descr}</p>
					<p class="info__text">${info1Item.value}</p>
					</li>`;
				});
				productInfo2.forEach(info2Item => {
					let value1 = `${info2Item.value1}`;
					let value2 = `${info2Item.value2}`;
					let value3 = `${info2Item.value3}`;
				
					if (!value1 == "") {
						value1 += ' &#215; '
					} else {
						value1 += ''
					}
					if (!value2 == "") {
						value2 += ' &#215; '
					} else {
						value2 += '';
						value1 = `${info2Item.value1}`;
					}
					if (!value3 == "") {
						value3 += ''
					} else {
						value3 += '';
						value2 = `${info2Item.value2}`;
					}
					
				productExtraContent2 += `
						<li class="info__item">
						<p class="info__descr">${info2Item.descr}</p>
						<p class="info__text">${value1} ${value2} ${value3}</p>
						</li>`;
				});
				productInfo3.forEach(info3Item => {
					let value1 = `${info3Item.value1}`;
					let value2 = `${info3Item.value2}`;
					let value3 = `${info3Item.value3}`;
				
					if (!value1 == "") {
						value1 += ' &#215; '
					} else {
						value1 += ''
					}
					if (!value2 == "") {
						value2 += ' &#215; '
					} else {
						value2 += '';
						value1 = `${info3Item.value1}`;
					}
					if (!value3 == "") {
						value3 += ''
					} else {
						value3 += '';
						value2 = `${info3Item.value2}`;
					}
					productExtraContent3 += `
					<li class="info__item">
					<p class="info__descr">${info3Item.descr}</p>
					<p class="info__text">${value1} ${value2} ${value3}</p>
					</li>`;
				});
				productExtra += productExtraStart;
				productExtra += productExtraContent1;
				productExtra += productExtraContent2;
				productExtra += productExtraContent3;
				productExtra += productExtraEnd;
				
				let productBodyStart = `<div class="item-product__body">`;
				let productBodyEnd = `</div>`;
				let productBodyContent = `
				<div class="item-product__content">
				<h3 class="item-product__title">${productTitle}</h3>
				</div>`;

				let productAvailable = `<div class="item-product__stock">
				<a class="item-product__stock-link __car-small" href="javascript:void(0);/#">${productStock}</a>
				</div>`;

				let productBody = '';
				productBody += productBodyStart;
				productBody += productBodyContent;
				productBody += productActions;
				productBody += productAvailable;
				productBody += productBodyEnd;
	
				let productTemplate = '';
				productTemplate += productStart;
				productTemplate += productHead;
				productTemplate += productBody;
				productTemplate += productExtra;
				productTemplate += productEnd;
		
// carousel
			$(document).ready(function(){
			$(".owl-carousel").owlCarousel({
				items: 2,
				margin: 8,
				dots: false,
				nav: true,
				navText : ['<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.93019 16.757C10.3207 17.1475 10.9539 17.1475 11.3444 16.757L16.0012 12.1003L11.3444 7.4435C10.9539 7.05298 10.3207 7.05298 9.93019 7.4435C9.53967 7.83402 9.53967 8.46719 9.93019 8.85771L13.1727 12.1003L9.93019 15.3428C9.53967 15.7333 9.53967 16.3665 9.93019 16.757Z" fill="#1A1A1A"/></svg>','<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.93019 16.757C10.3207 17.1475 10.9539 17.1475 11.3444 16.757L16.0012 12.1003L11.3444 7.4435C10.9539 7.05298 10.3207 7.05298 9.93019 7.4435C9.53967 7.83402 9.53967 8.46719 9.93019 8.85771L13.1727 12.1003L9.93019 15.3428C9.53967 15.7333 9.53967 16.3665 9.93019 16.757Z"fill="#1A1A1A" /></svg>'],
				responsive : {
						550 : {
						items: 3,
						},
						900:{
						items: 3
						},
						
						
						1250 : {
						items: 4,
					}
				}
			});
	});
		ProductsItems.insertAdjacentHTML('beforeend', productTemplate);
		})
		}	
	}
		getProducts();

// add to card
		document.addEventListener("click", buttonActions);
		function buttonActions(e) {
		const targetElement = e.target;
	if(window.innerWidth > 786) {
		if(targetElement.classList.contains('product-controls__desktop')){
			const productId = targetElement.closest('.item-product').dataset.pid;
			addToCart(targetElement, productId);
			e.preventDefault();
		}
		} else {
			if(targetElement.classList.contains('product-controls__mob')){
				const productId = targetElement.closest('.item-product').dataset.pid;
				addToCart(targetElement, productId);
				e.preventDefault();
			}
			

		}
		if(targetElement.classList.contains('btn__plus')){
			const productId = targetElement.closest('.item-product').dataset.pid;
			addToCart(targetElement, productId);
			e.preventDefault();
		}
		if(targetElement.classList.contains('btn__minus')){
			const productId = targetElement.closest('.item-product').dataset.pid;
			updateCart(targetElement, productId, false);
			e.preventDefault();
		}

	
	}
	function addToCart(productButton, productId) {
			const product = document.querySelector(`[data-pid="${productId}"]`);
			updateCart(productButton, productId);
		
	}
	function updateCart (productButton, productId, productAdd = true) {
		const cart = document.querySelector('.cart');
		const cartIcon = cart.querySelector('.cart__icon');
		const cartQuantity = cartIcon.querySelector('.cart__quantity');
		const product = document.querySelector(`[data-pid="${productId}"]`);
		const productControls = product.querySelector('.product-controls');
		const buttonQuantity = productControls.querySelector('.button__quantity');
		const buttonOld = product.querySelector('.product-controls__btn')
	
		if(productAdd){
			if(innerWidth > 768) {
				productControls.classList.add('active');
				if(buttonQuantity) {
					buttonQuantity.innerHTML = ++buttonQuantity.innerHTML;
					buttonOld.classList.remove('product-controls__desktop');
				} else {
					
					buttonOld.innerHTML = '';
					buttonOld.insertAdjacentHTML('beforeend', `<span class="button__quantity">1</span>`)
				}	
			} 
		if(cartQuantity) {                                                                                                                                         
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;

			} else {
			cartIcon.insertAdjacentHTML('beforeend', `<span class="cart__quantity">1</span>`)
		}
	
	
	} else {
		if(innerWidth > 768) {
			if(buttonQuantity) {
				buttonQuantity.innerHTML = --buttonQuantity.innerHTML;
				if(buttonQuantity.innerHTML == 0) {
					buttonQuantity.remove( `<span class="button__quantity"></span>`);
					productControls.classList.remove('active');
					buttonOld.classList.add('product-controls__desktop');
					buttonOld.innerHTML = 'Купить';
				}
			} 
		} else {}
		if(cartQuantity) {
			cartQuantity.innerHTML = --cartQuantity.innerHTML;
			if(cartQuantity.innerHTML == 0) {
				cartQuantity.remove( `<span class="cart__quantity"></span>`)
			}
		} else {}
	}
	}
	
}