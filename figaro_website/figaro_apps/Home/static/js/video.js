let allVids = $("#myCarousel").find('.carousel-item');
console.log('lejatszas');
allVids.each(function(index, el) {
  console.log('lejatszas2');
  if (index !== 0) {
    $(this).find('video')[0].pause();
  }
});

$("#myCarousel").on('slide.bs.carousel', function(ev) {
  let slides = $(this).find('.carousel-item');
  let pvid = slides[ev.from].querySelectorAll('video')[0];
  let vid = slides[ev.to].querySelectorAll('video')[0];
  let isPlaying = vid.currentTime > 0 && vid.readyState > 2;
  console.log('lejatszas3');
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
