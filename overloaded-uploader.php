<?php
/*
Plugin Name: Overloaded Uploader
Description: A plugin for developers. Provides a simple way to take control of the Wordpress Uploader for your plugnis / themes. May be required
by your other plugins, so deactive carefully.
Version: 0.1
Author: Jeremy Linder & General Things
Author URI: http://www.thedbj.com/
Plugin URI: http://www.generalthings.com/
*/

function overloaded_uploader_scripts() {
  wp_register_script( 'overloaded-uploader', plugins_url('/overloaded-uploader.js', __FILE__), array('jquery', 'thickbox', 'media-upload'), '0.1');
  wp_enqueue_style ("thickbox");
}

add_action('admin_init', 'overloaded_uploader_scripts');