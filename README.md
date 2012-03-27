Overloaded Uploader
===================

Take control of Wordpress's installed uploader. (Tested on Wordpress 3)

### Introduction

A problem I've come across when dealing with wordpress custom posts is when I need to upload
binary content (particularly images) to the item. Often, I will write (or I have seen written)
a <INPUT /> type="file" inside a multipart/form-data. The page then takes the item from the
server request and saves it as it sees fit.

Two problems with this: 
  1. Why do it when it's already implemented in WP
  2. Wordpress won't put these in its files list for you to
      make use of at other times.
      
The Overloaded Uploader lets you take advantage of WordPress's built in uploader (called media-upload) 
to do this.

Installation
------------

Copy from here and place under your wp-content/plugins directory. Then activate it on the plugins
screen. 

Usage
-----

To make use of the Overloaded Uploader, you only need add one function:

    OverloadedUploader.start()
    
This function will open the Wordpress Uploader and allow the user to upload a file. However, this
is not the most useful function without being able to take control of what the user selects. For that,
we can pass a function to OverloadedUploader.start

    OverloadedUploader.start( onChange: function(att) { } )
    
This will send an anonymous function to be fired when when the user chooses a value in the wordpress
uploader. This function will make the values available to you in the att object. The att object 
contains values (if entered in the uploaded field) as follows.

    att.src
    att.alt
    att.title
    att.width
    att.height
    
The most important thing to note about the above is that the src is *relative* and not absolute. This
was done to carry files over easily from development to product, as the values are generally saved in
the database. You can use wordpress functions in your save_post action to prepend the domain before save
or you can use the appropriate get_bloginfo for the wordpress web root on output. I mention this, as it is
important for CDN.

### Additionally...

There are more ways to gather the data, but they must be tested before being formally released. However, they are
already built into the code (which is not so complex), so feel free to test them out for yourself if you want.


Credits
-------

by Jeremy Linder at General Things, Inc.

