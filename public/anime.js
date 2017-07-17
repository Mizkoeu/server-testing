// var x = document.getElementById('intro');
//
// x.onclick=function() {
//   this.classList.toggle('clicked');
// }


$(document).ready(function() {
  var $image = $('.activation');
  var $profile = $('.header');
  var $win = $(window);

  $win.on('scroll', function() {
    var top = $win.scrollTop();
    top = top / 3 - $win.height() / 5;
    if (top > 0) {
      console.log(top);
      $image.css('transform', 'rotate(' + top + 'deg)');
      $profile.css('transform', 'translate(0, ' + top + 'px)');
    }
  });
});
