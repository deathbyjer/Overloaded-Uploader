if (typeof(OverloadedUploader) == 'undefined') {

var OverloadedUploader = {};

OverloadedUploader.setup = function(opts) {
  if (typeof(opts) != 'object') opts = {};
  
  opts.setup = true;
  opts.parent = opts.parent || false;
  opts.src = opts.src || false;
  opts.alt = opts.alt || false;
  opts.title = opts.title || false;
  opts.width = opts.width || false;
  opts.height = opts.height || false;
  
  if (opts.bindTo)
    jQuery(opts.bindTo).bind('click', { opts: opts }, OverloadedUploader.bindClick);
    
  return opts;
};

OverloadedUploader.BackToNormal = function() {
	OverloadedUploader.on = false;
	OverloadedUploader.item = false;
  OverloadedUploader.opts = false;
};

OverloadedUploader.bindClick = function(event) {
  var opts = event.data.opts;
  OverloadedUploader.start(opts);
};

OverloadedUploader.start = function(opts) {
  if (typeof(opts) != 'object') opts = {};
  if (!opts.setup)
    opts = OverloadedUploader.setup(opts);
  
	tb_show('Upload', 'media-upload.php?type=image&a.mp;TB_iframe=true');
  
	OverloadedUploader.on = true;
  OverloadedUploader.item = opts.parent || 'body';
	
  if (typeof(opts.onChange) == 'function')
    OverloadedUploader.changeItem = opts.onChange;
    
  OverloadedUploader.opts = opts;
    
	return false;

};

OverloadedUploader.OnLoad = function()
{  
	OverloadedUploader.BackToNormal();	
	jQuery('#TB_window').unload(OverloadedUploader.BackToNormal);
  
	window.original_send_to_editor = window.send_to_editor;
	window.send_to_editor = function(html) {
		if (OverloadedUploader.on) 
		{
      var opts = OverloadedUploader.opts;
      // Values
      var img = jQuery('img',html);
			var imgurl = img.attr('src').replace(/^http:\/\/[^\/]*/, '');
      var img_atts = {};
      img_atts.src = imgurl;
      
      var loop = ['alt', 'title', 'width', 'height']
      for (var i in loop)
        img_atts[loop[i]] = img.attr(loop[i]);
      
      // Set the values
      var item = jQuery(OverloadedUploader.item);
      var loop = ['src', 'title', 'alt', 'width', 'height'];
      for (var i in loop) {
        var key = loop[i]
        if (opts[key] && item.find(opts[key]).length)
          item.find(opts[key]).val(img_atts[key]);
      }
      
      if (typeof(OverloadedUploader.changeItem) == 'function')
        OverloadedUploader.changeItem(img_atts);
        
			tb_remove();
		}
		else
			window.original_send_to_editor(html);
	}
}

jQuery(document).ready(function() {
	OverloadedUploader.OnLoad();
});


}
