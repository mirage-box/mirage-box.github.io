(function($){
  // Caption
  $('.entry').each(function(i){
    $(this).find('img').each(function(){
      if (!$(this).hasClass('nofancybox')){
        var alt = this.alt;

        if (alt){
          $(this).after('<span class="caption">' + alt + '</span>');
        }

        $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox" rel="gallery' + i + '" />');
      }
    });
  });

  // Gallery
  var play = function(parent, item, callback){
    var width = parent.width();

    item.imagesLoaded(function(){
      var _this = this[0],
        nWidth = _this.naturalWidth,
        nHeight = _this.naturalHeight;

      callback();
      this.animate({opacity: 1}, 500);
      parent.animate({height: width * nHeight / nWidth}, 500);
    });
  };

  $('.gallery').each(function(){
    var $this = $(this),
      current = 0,
      photoset = $this.children('.photoset').children(),
      all = photoset.length,
      loading = true;

    play($this, photoset.eq(0), function(){
      loading = false;
    });

    $this.on('click', '.prev', function(){
      if (!loading){
        var next = (current - 1) % all;
        loading = true;

        play($this, photoset.eq(next), function(){
          photoset.eq(current).animate({opacity: 0}, 500);
          loading = false;
          current = next;
        });
      }
    }).on('click', '.next', function(){
      if (!loading){
        var next = (current + 1) % all;
        loading = true;

        play($this, photoset.eq(next), function(){
          photoset.eq(current).animate({opacity: 0}, 500);
          loading = false;
          current = next;
        });
      }
    });
  });
  // 新增：当超链接url带有“_blank”参数时，跳转打开新窗口
  var aTagArr = [].slice.apply(document.getElementsByTagName("a"));
  aTagArr.forEach(function (e, i) {
    e.href.indexOf("_blank") > -1 ? e.target = "_blank" : null;
  });
})(jQuery);
