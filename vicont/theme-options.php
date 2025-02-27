<?php
if (!defined('ABSPATH')) {
  exit;
}

use Carbon_Fields\Container;
use Carbon_Fields\Field;


$category_options = [];

$categories = get_terms();
foreach ($categories as $category) {
  if ($category->taxonomy == 'product_cat') {
    $category_options[$category->slug] = $category->name;
  }
}
// echo '<pre>';
// var_dump($category_options);
// echo '</pre>';


$employees_labels = array(
  'plural_name' => 'Баннер',
  'singular_name' => 'Баннер',
);

Container::make('theme_options', __('Слайдер'))
  // ->add_tab(__('Баннер'), array(
  ->add_fields(array(
    Field::make('complex', 'crb_slider', __('Слайдер'))
      // ->setup_labels($employees_labels)
      ->set_classes('crb_slider_day_box')
      ->add_fields(array(
        // Field::make('text', 'title', __('Наименование акции'))
        //   ->set_classes('crb_slider_day_box_ittle')
        //   ->set_width(20),
        // Field::make('date', 'crb_event_date', __('Дата'))
        //   ->set_classes('crb_slider_day_box_date')
        //   ->set_attribute('placeholder', __('Укажите дату'))
        //   ->set_storage_format('d.m.Y')
        //   ->set_width(5),
        Field::make('complex', 'crb_slide', __('Слайды'))
          ->set_classes('crb_slider_day_box_complex')
          ->setup_labels($employees_labels)
          ->add_fields(array(
            Field::make('image', 'photo', __('Slide Photo'))
              ->set_classes('crb_slider_day_box_photo')
              ->set_value_type('url')
              ->set_width(50),
            // Field::make('select', 'crb_set_discount_to_term', __('Акция для категории:'))
            //   ->set_options($category_options)
            //   ->set_width(24)
            //   ->set_help_text('Укажите категорию товаров, для которых действует акция'),
            // Field::make('text', 'crb_set_discount_procent', __('Процент:'))
            //   ->set_width(10),
            // Field::make('text', 'link', __('Ссылка на страницу акционной категории'))
            //   ->set_width(24),
          ))
          ->set_width(60),
      )),
  ));
// ->add_tab(__('Общие акции'), array(
// Field::make('text', 'crb_set_registration_bonus', __('Подарочные бонусы за регистрацию'))
//   ->set_width(24),

// Field::make('text', 'crb_set_percentage_for_pickup', __('Процент за самовывоз'))
//   ->set_width(24),
// Field::make('separator', 'crb_separator_quantity', __('Скидка за сет'))
//   ->set_width(49),
// Field::make('text', 'crb_set_percentage_for_birthday', __('Процент за день рождения'))
//   ->set_width(24),
// Field::make('separator', 'crb_separator_bell', __(''))
//   ->set_width(24),

// Field::make('text', 'crb_set_quantity_products', __('Колличество товара'))
//   ->set_width(24),
// Field::make('text', 'crb_set_procent_discount_on_quantity', __('Процент скидки'))
//   ->set_width(24),
// Field::make('separator', 'crb_separator_volume', __('Скидки за объем')),
// Field::make('complex', 'crb_volume', __('Скидки на сумму заказа'))
//   ->add_fields(array(
//     Field::make('text', 'crb_volume_sum', __('Сумма заказа'))
//       ->set_width(24),
//     Field::make('text', 'crb_volume_procent_discount', __('Процент скидки'))
//       ->set_width(24),
//   )),
// ));



Container::make('theme_options', __('Настройки сайта'))
  // ->add_tab(__('Акции'), array(
  // // Field::make('text', 'crb_set_discount_to_term', __('Акция для категорий:'))
  // // ->set_width(50)
  // // ->set_help_text('Укажите ярлык категории товаров, для которых действует скидка 5% (если акция действует для нескольких категорий, укажите их через запятую)'),
  // Field::make('complex', 'crb_slider', __('Slider'))
  // // ->setup_labels($employees_labels)
  // ->add_fields(array(
  // Field::make('date', 'crb_event_date', __('Дата'))
  // ->set_attribute('placeholder', __('Укажите дату'))
  // ->set_storage_format('d.m.Y'),
  // Field::make('complex', 'crb_slide', __('Slides'))
  // // ->setup_labels($employees_labels)
  // ->add_fields(array(
  // // Field::make('text', 'title', __('Заголовок')),
  // Field::make('text', 'link', __('Ссылка на страницу акционной категории')),
  // Field::make('image', 'photo', __('Slide Photo'))
  // ->set_value_type('url')
  // ->set_width(24),
  // Field::make('text', 'crb_set_discount_to_term', __('Акция для категории:'))
  // ->set_width(24)
  // ->set_help_text('Укажите ярлык категории товара, для которого действует скидка'),
  // Field::make('text', 'crb_set_discount_procent', __('Процент:'))
  // ->set_width(24),
  // )),
  // )),

  // ))
  // ->add_tab(__('Основная информация'), array(
  ->add_fields(array(
    Field::make('image', 'crb_logo', __('Логотип'))
      ->set_width(24)
      ->set_value_type('url'),
    Field::make('text', 'crb_phone_number', __('Номер телефона'))
      ->set_attribute('placeholder', '*(***)***-**-**')
      ->set_width(24),
    Field::make('text', 'crb_schedule', __('График работы'))
      ->set_width(24),
    Field::make('text', 'crb_email', __('Email'))
      ->set_width(24),
    Field::make('text', 'crb_address_header', __('Адрес в шапке'))
      ->set_width(50),
    Field::make('text', 'crb_address_footer', __('Адрес в подвале'))
      ->set_width(50),
    Field::make('text', 'crb_address_telegram', __('Telegram'))
      ->set_width(24),
    Field::make('text', 'crb_address_whatsapp', __('WhatsApp'))
      ->set_width(24),
    Field::make('text', 'crb_address_viber', __('Viber'))
      ->set_width(24),
    // Field::make('text', 'crb_home_product', __('Товары на главной странице'))
    // ->set_width(100)
    // ->set_help_text('Укажите ярлык категории товаров, которые необходимо вывести на главной странице'),
    Field::make('text', 'crb_bottom_footer_inn', __('ИНН:'))
      ->set_width(50),
    Field::make('text', 'crb_bottom_footer_ogrn', __('ОГРН:'))
      ->set_width(50),
    Field::make('text', 'crb_bottom_footer_copy', __('Копирайт')),
    Field::make('text', 'crb_bottom_footer_policy', __('Политики конфиденциальности'))
      ->set_width(40)
      ->set_help_text('Укажите ссылку на страницу политики конфиденциальности'),
    Field::make('text', 'crb_bottom_footer_terms', __('Пользовательское соглашение'))
      ->set_width(40)
      ->set_help_text('Укажите ссылку на страницу пользовательского соглашения'),
    // )
  ));


Container::make('post_meta', __('Технические характеристики'))
  ->where('post_type', '=', 'product')
  ->add_fields(array(
    Field::make('complex', 'crb_tth', __('Характеристики'))
      // ->setup_labels($employees_labels)
      ->set_classes('crb_tth_box')
      ->add_fields(array(
        Field::make('text', 'title', __('Наименование характеристики'))
          ->set_classes('crb_tth_title')
          ->set_width(20),
        // Field::make('rich_text', 'crb_tth_vel', __('Информация'))
        Field::make('text', 'crb_tth_vel', __('Информация'))
          ->set_width(80)
        // ->set_rows(4)
      )),
    // ->set_collapsed(true),
  ));

Container::make('post_meta', __('Комплектации'))
  ->where('post_type', '=', 'product')
  ->add_fields(array(
    Field::make('complex', 'crb_options', __('Комплектация'))
      // ->setup_labels($employees_labels)
      ->set_classes('crb_options_box')
      ->add_fields(array(
        Field::make('text', 'crb_options_name', __('Наименование'))
          ->set_classes('crb_options_title')
          ->set_width(20),
        Field::make('text', 'crb_options_link', __('Ссылка на товар'))
          ->set_width(20),
        Field::make('text', 'crb_options_size', __('Размеры'))
          ->set_width(20),
        Field::make('text', 'crb_options_price', __('Цена'))
          ->set_width(20)
      )),
    // ->set_collapsed(true),
  ));

Container::make('post_meta', __('Схема и размеры'))
  ->where('post_type', '=', 'product')
  ->add_fields(array(
    Field::make('image', 'crb_scheme_and_size_image', __('Изображение схемы'))
      ->set_value_type('url')
    // ->set_collapsed(true),
  ));

Container::make('post_meta', __('Фото интерьеров'))
  ->where('post_type', '=', 'product')
  ->set_classes('crb_photos_of_interiors_in_admin')
  ->add_fields(array(
    // Field::make('image', 'crb_photos_of_interiors', __('Фото интерьеров'))
    //   ->set_value_type('url')
    // ->set_collapsed(true),
    Field::make('complex', 'crb_photos_of_interiors', __('Фото интерьеров'))
      ->set_classes('crb_photos_of_interiors_complex')
      // ->setup_labels($employees_labels)
      ->add_fields(array(
        Field::make('image', 'crb_photo', __('Фото'))
          ->set_value_type('url')
          ->set_width(50),
      ))
      ->set_width(60),
    // Field::make('rich_text', 'crb_photos_of_interiors', __('Фото интерьеров'))
    //   ->set_rows(4)
  ));
Container::make('post_meta', __('Рекомендуемые товары'))
  ->where('post_type', '=', 'product')
  ->set_classes('crb_pohozhee_in_admin')
  ->add_fields(array(
    Field::make('complex', 'crb_pohozhee_in_admin', __('Рекомендуемые товары'))
      ->set_classes('crb_pohozhee_in_admin_complex')
      ->add_fields(array(
        Field::make('text', 'crb_options_name', __('Заголовок'))
          ->set_classes('crb_cat_title')
          ->set_width(20),
        Field::make('select', 'crb_set_discount_to_term', __('Рекомендуемые категория:'))
          ->set_options($category_options)
          ->set_width(24)
          ->set_help_text('Укажите категорию товара')
          ->set_width(60),
      ))
  ));









//   ->add_tab(__('Состав'), array(
//     // ->show_on_post_type('product')
//     // ->add_fields(array(
//     Field::make('text', 'crb_product_ccal', ('ККАЛ'))
//       ->set_width(24),
//     Field::make('text', 'crb_product_belki', ('Белки'))
//       ->set_width(24),
//     Field::make('text', 'crb_product_zhiri', ('Жиры'))
//       ->set_width(24),
//     Field::make('text', 'crb_product_uglev', ('Углеводы'))
//       ->set_width(24),
//   ))
//   ->add_tab(__('Слайдер'), array(
//     Field::make('text', 'crb_product_slider_title', ('Заголовок для сдайдера')),
//     // ->set_width(24),
//     Field::make('text', 'crb_product_short_slider', ('Шорткод для сдайдера')),
//     // ->set_width(24),
//   ));
// // ));


// Container::make('term_meta', 'Какие-то настройки таксономии')
// ->add_fields(array(
// Field::make('text', 'crb_set_discount_to_term', __('Акция для категорий:'))
// ->set_width(50),
// ));



// Container::make('post_swioer', __('Слайдер'))
// // ->show_on_post_type('product')
// ->add_fields(array(
// Field::make('text', 'crb_product_short_slider', ('Шорткод для сдайдера'))
// ->set_width(24),
// ));