<?php
/*
Template Name: izbrannoe
*/
?>
<?php get_header(); ?>
<!-- <div class="container"> -->
<?php woocommerce_breadcrumb(); ?>
<main id="primary" class="site-main">













<?php
	// <div class="wishlist-container">
	// 	<h1>Избранные товары</h1>
	// 	<div class="wishlist-products"></div>
	// </div>

	// <script>
	// 	document.addEventListener('DOMContentLoaded', function() {
	// 		let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

	// 		function fetchWishlistProducts() {
	// 			let wishlistContainer = document.querySelector('.wishlist-products');
	// 			wishlistContainer.innerHTML = '';

	// 			if (wishlist.length > 0) {
	// 				wishlist.forEach(productId => {
	// 					fetch('/wp-json/wp/v2/product/' + productId)
	// 						.then(response => response.json())
	// 						.then(product => {
	// 							let productElement = document.createElement('div');
	// 							productElement.classList.add('wishlist-product');
	// 							productElement.innerHTML = `
  //                               <h2>${product.title.rendered}</h2>
	// 															<img src="${product.featured_image ? product.featured_image : ''}" alt="${product.title.rendered}" />
  //                               <a href="${product.link}">Перейти к товару</a>
  //                           `;
	// 							console.log(JSON.stringify(product, null, 2));
	// 							console.log(JSON.stringify(product.og_image, null, 2));
	// 							wishlistContainer.appendChild(productElement);
	// 						});
	// 				});
	// 			} else {
	// 				wishlistContainer.innerHTML = '<p>Ваш список избранного пуст.</p>';
	// 			}
	// 		}

	// 		fetchWishlistProducts();
	// 	});
	// </script>
	?>



	<div class="wishlist-container">
		<h1>Избранные товары</h1>
		<ul class="wishlist-products">
			<?php if (isset($_COOKIE['wishlist'])) : ?>
				<?php
				$wishlist = json_decode(stripslashes($_COOKIE['wishlist']), true);
				$wishlist_ids = implode(',', array_map('intval', $wishlist));
				$args = array(
					'post_type' => 'product',
					'post__in' => $wishlist,
					'posts_per_page' => -1,
				);
				$query = new WP_Query($args);

				if ($query->have_posts() && $wishlist) :
					while ($query->have_posts()) : $query->the_post();
						wc_get_template_part('content', 'product');
					endwhile;
					wp_reset_postdata();
				else :
					echo '<p>Ваш список избранного пуст.</p>';
				endif;
				?>
			<?php else : ?>
				<p>Ваш список избранного пуст.</p>
			<?php endif; ?>
		</ul>
	</div>













	<?php
	// while (have_posts()) :
	// 	the_post();

	// 	get_template_part('template-parts/content', 'page');

	// 	// If comments are open or we have at least one comment, load up the comment template.
	// 	if (comments_open() || get_comments_number()) :
	// 		comments_template();
	// 	endif;

	// endwhile; // End of the loop.
	?>

</main><!-- #main -->
<!-- </div> -->
<?php
//get_sidebar();
get_footer();
