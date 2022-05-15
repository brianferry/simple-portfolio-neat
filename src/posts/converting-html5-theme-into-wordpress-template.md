---
title: Converting HTML5 Theme Into Wordpress Template
description: Taking a HTML5 Theme and putting into a wordpress website
author: Brian Ferry
date: 2022-05-15T18:03:34.200Z
prism: true
tags:
  - HTML5
  - WordPress
---
With this overhaul I wanted to take an existing template and go through the process of converting an HTML5 Template into a WordPress Template.

I picked out my theme from https://html5up.net to get started.  I had a fairly high level overview of how WordPress templates worked and the process for converting it was simple yet you can see where there is a lot of room for customization. 

For this article I will be using the theme found at https://html5up.net/future-imperfect 

BASICS OF WORDPRESS

So I first began by looking at what the basic components of a Wordpress theme were and what I would need to achieve my goal of converting my HTML5 Template into a WordPress Theme.  I quickly found that at the bare minimum you only need a index.php and index.css file to make a site actually work on WordPress. 

Now of course, this doesn’t take us very far, so we’ll break it out into more (general) pieces that seem to be the core for most scalable WordPress templates. 

They are:

    Style.css - Contains the themes css, provided by https://html5up.net

    Index.php - Home page template,

    Sidebar.php - Sidebar template, mostly widgets in my case,

    Header.php - Header template,

    Footer.php - Footer template,

    Post-Template.php - Includes references to the style, header, and footer components.

    Contact-Us-Template.php - Special use-case not outlined above, creating a custom page to house my contact page,

    Functions.php - Includes all the back-end functions for the website, including widget creation.

With these I will be able to take the Future Imperfect theme and make it into a scalable and customizable template for this website. 

SERVER ENVIRONMENT

I’m running a $5 digital ocean droplet which can be found at https://marketplace.digitalocean.com/apps/openlitespeed-wordpress 

THEME OUTLINE 

Future Imperfect Outline 

From the outline above, the theme fits fairly neatly into my schema.  The colors fit neatly as follows: 

    Yellow - Header Section

    Red - Sidebar section

    Purple - Card section (reusable for post-template)

    Black - Footer Section

All except for the sidebar section will be reused on the posts and contact page of my final design. The main difference between this and the post page itself will be the lack of sidebar and the full text of the post being shown at the full width of the page, rather in the format it is currently being shown at. 

Outside of this basic theme, I will be creating a contact page using Contact Form 7 which will be in and of itself its own theme located at contact.php. 

WHAT NEEDS TO BE CUSTOMIZABLE

I will be bringing out certain sections into their own widgets, such as everything in the sidebar and the header menu navigation.  This is so that I can quickly update the text / content without having to edit the templates themselves. 

As outline above, I will need the Title and Subtitle editable on my website (Provided by WordPress), the About section, and the footer social links / text on display. I will need two widgets for this, a widget for the about me and the widget for the intro section. </p> <b>WHAT THE CODE LOOKS LIKE</b> <p> For the widgets themselves, the code is fairly straightforward. 

My Intro Widget class 

```php
bf_fi_intro_widget extends WP_Widget{
    function __construct() {
        $widget_options = array(
            'classname' => 'introduction',
            'description' => 'Custom Built Widget for Home Page Future Imperfect Intro Section'
        );
        parent::__construct( 'bf_fi_intro_widget', 'Intro Widget [FI]', 'wpb_widget_domain', $widget_options);
    }
    function widget( $args, $instance ) {
        if ( ! isset ( $args['widget_id'] ) ){
      $args['widget_id'] = $this->id;
    }
        $widget_id = 'widget_'.$args['widget_id'];
        $logo_image = get_field('logo', $widget_id) ? get_field('logo', $widget_id) : '';
        $full_name = get_field('full_name', $widget_id) ? get_field('full_name', $widget_id) : '';
        $title = get_field('title', $widget_id) ? get_field('title', $widget_id) : '';
        $location = get_field('location', $widget_id) ? get_field('location', $widget_id) : '';
        echo '<section id="intro">';
        echo '<a href="#" class="logo"><img src="'.$logo_image.'" alt="" /></a>';
        echo '<header>';
        echo '<h2>'.$full_name.'</h2>';
        echo '<p>'.$title.' | '.$location.'</p>';
        echo '</header>';
        echo '</section>';
        echo $args['after_title'] . $args['after_widget'];
    }
}
```

My About Me Widget

```php
class bf_fi_about_me_widget extends WP_Widget{
    function __construct() {
        $widget_options = array(
            'classname' => 'about-me',
            'description' => 'Custom Built Widget for Future Imperfect About Me Section'
        );
        parent::__construct( 'bf_fi_about_me_widget', 'About Me Widget [FI]', 'wpb_widget_domain', $widget_options);
    }
    function widget( $args, $instance ) {
        if ( ! isset ( $args['widget_id'] ) ){
      $args['widget_id'] = $this->id;
    }
        $widget_id = 'widget_'.$args['widget_id'];
        $about_me_blurb = get_field('about_me_blurb', $widget_id) ? get_field('about_me_blurb', $widget_id) : '';
        echo '<section id="about" class="blurb">';
        echo '<h2>About Me</h2>';
        echo '<p>';
        echo $about_me_blurb;
        echo '</p>';
        echo '<ul class="actions">';
        echo '<li><a href="https://brianzferry.com/home/resume-cv/" target="_blank" class="button">Resume</a></li>';
        echo '</ul>';
        echo '</section>';
        echo $args['after_title'] . $args['after_widget'];
    }
}
```

As you can see the widgets are fairly straightforward, with a constructor which defines for WordPress the name, the description, and the shortcode for the Widget.

Below this you see where we are getting the Contact Form 7 variables passed into the widget and echo-ing out the resulting HTML.

This provides me with a way to quickly update the HTML if I need to and also be able to control the flow of the text on the page.

GOING FORWARD

Going forward I would like to add a lot more functionality to the website, including more page types, a more wiki-like search function for myself as well as a more robust system for putting applications out there with actual server-side code rather than having to rely on primarily client side code for the time being.>