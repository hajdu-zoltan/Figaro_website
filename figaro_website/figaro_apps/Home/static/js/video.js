

let allVids = $("#myCarousel").find('.carousel-item');
allVids.each(function(index, el) {
  if (index !== 0) {
    $(this).find('video')[0].pause();
  }
});

$("#myCarousel").on('slide.bs.carousel', function(ev) {
  let slides = $(this).find('.carousel-item');
  let pvid = slides[ev.from].querySelectorAll('video')[0];
  let vid = slides[ev.to].querySelectorAll('video')[0];
  let isPlaying = vid.currentTime > 0 && vid.readyState > 2;
  vid.play();

  if (isPlaying) {
    pvid.pause();
  }
});
function stop_video(){
  var vid = document.getElementById("player");
  var vid1 = document.getElementById("player2");
  var vid2 = document.getElementById("player3");
  vid.pause();
  vid1.pause();
  vid2.pause();
}
$(document).ready(function() {
  // az oszlopokra vonatkozó kiválasztás
  var columns = $('.main_info_container, .myvid');

  // a legnagyobb magasság meghatározása
  var maxHeight = Math.max.apply(
    Math, columns.map(function() {
      return $(this).height();
    }).get()
  );
    console.log(maxHeight)
  // az oszlopok magasságának beállítása a legnagyobb magasságra
  columns.height(maxHeight);
  document.getElementById("_main_info_container").style.maxHeight = ""+maxHeight+"px";
});
