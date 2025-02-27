<?php

/**
 * Thankyou page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/thankyou.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 8.1.0
 *
 * @var WC_Order $order
 */

defined('ABSPATH') || exit;
?>

<div class="woocommerce-order">

	<?php
	if ($order) :

		do_action('woocommerce_before_thankyou', $order->get_id());
	?>

		<?php if ($order->has_status('failed')) : ?>

			<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed">
				<?php esc_html_e('Unfortunately your order cannot be processed as the originating bank/merchant has declined your transaction. Please attempt your purchase again.', 'woocommerce'); ?></p>

			<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed-actions">
				<a href="<?php echo esc_url($order->get_checkout_payment_url()); ?>" class="button pay"><?php esc_html_e('Pay', 'woocommerce'); ?></a>
				<?php if (is_user_logged_in()) : ?>
					<a href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>" class="button pay"><?php esc_html_e('My account', 'woocommerce'); ?></a>
				<?php endif; ?>
			</p>

		<?php else : ?>

			<?php wc_get_template('checkout/order-received.php', array('order' => $order)); ?>

			<?php

			if (session_status() == PHP_SESSION_NONE) {
				session_start();
			}

			$is_user_reg = 0;
			$new_user_id = '';
			if (!is_user_logged_in() && is_email($order->get_billing_email())) {

				$username = $order->get_billing_first_name();
				$email = $order->get_billing_email();
				$password = wp_generate_password(5, false);

				// Проверка, существует ли пользователь с таким email или именем пользователя
				if (!email_exists($email)) {

					// Создание нового пользователя
					$user_id = wp_create_user(explode('@', $email)[0], $password, $email);

					if (is_wp_error($user_id)) {
						// return 'Error in user creation: ' . $user_id->get_error_message();
					}

					// Установка роли пользователя как "customer" (клиент)
					$user = new WP_User($user_id);
					$user->set_role('customer');

					// Добавление дополнительных мета-данных пользователя, если нужно
					update_user_meta($user_id, 'first_name', $username);
					update_user_meta($user_id, 'billing_address_1', $order->get_billing_address_1());
					update_user_meta($user_id, 'billing_address_2', $order->get_billing_address_2());
					update_user_meta($user_id, 'billing_email', $email);
					update_user_meta($user_id, 'billing_first_name', $username);
					update_user_meta($user_id, 'billing_phone', $order->get_billing_phone());

					if ($order->get_meta('billing_deliverymethod') == 'samovivoz') {
						$percentage_for_pickup_on_thanks = (carbon_get_theme_option('crb_set_percentage_for_pickup')) ? carbon_get_theme_option('crb_set_percentage_for_pickup') : 0;
						update_user_meta($user_id, 'bonuss', ((carbon_get_theme_option('crb_set_registration_bonus')) ? carbon_get_theme_option('crb_set_registration_bonus') : 0) + $percentage_for_pickup_on_thanks / 100 * $order->get_total());
					} else {
						update_user_meta($user_id, 'bonuss', (carbon_get_theme_option('crb_set_registration_bonus')) ? carbon_get_theme_option('crb_set_registration_bonus') : 0);
					}

					update_user_meta($user_id, 'apartment', $order->get_meta('billing_apartment'));
					update_user_meta($user_id, 'floor', $order->get_meta('billing_floor'));
					update_user_meta($user_id, 'entrance', $order->get_meta('billing_entrance'));
					echo get_post_meta($order->get_id(), 'entrance', true);


					// Можно также отправить email пользователю с данными для входа
					// wp_new_user_notification($user_id, $password, 'user');
					wp_mail(
						$email,
						'Добро пожаловать в наш магазин!',
						"Спасибо за регистрацию. Вот ваши данные для входа:\n\nЛогин: " . explode('@', $email)[0] . "\nПароль: $password\n\nВы можете войти здесь: " . get_permalink(get_option('woocommerce_myaccount_page_id'))
					);
					// return 'User registration successful';
					$is_user_reg = 1;
					$new_user_id = $user_id;
					wp_set_current_user($user_id);
					wp_set_auth_cookie($user_id);


					if (!isset($_SESSION['reloaded'])) {
						$_SESSION['reloaded'] = true;
						$_SESSION['message'] = '<div class="thankyou_registr_text">Спасибо за регистрацию, логин и пароль для входа в личный кабинет были отправлены на ваш Email. ' . ((carbon_get_theme_option('crb_set_registration_bonus')) ? '<span class="text_registration_bonus">Вам начислено ' . carbon_get_theme_option('crb_set_registration_bonus') . ' бонусов.</span>' : 0) . '</div>';
					}

					$order->set_customer_id($user_id);
					$order->save();
					wp_safe_redirect(esc_url_raw(add_query_arg([])));
				}
			}

			if ($is_user_reg == 0) {
				if (isset($_SESSION['message'])) {
					// Вывод сообщения
					echo $_SESSION['message'];
					// Удаление сообщения из сессии после отображения
					unset($_SESSION['message']);
					unset($_SESSION['reloaded']);
				}
			}
			?>

		<?php endif; ?>

	<?php else : ?>

		<?php wc_get_template('checkout/order-received.php', array('order' => false)); ?>

	<?php endif; ?>

</div>