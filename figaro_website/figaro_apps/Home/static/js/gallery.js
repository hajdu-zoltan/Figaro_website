var images = document.getElementsByTagName("img");
		var modal = document.getElementById("myModal");
		var modalImg = document.getElementById("modal-image");
		var currentIndex = 0;

		// Kép megnyitása a modális ablakban
		function openModal(img) {
			modal.style.display = "block";
			modalImg.src = img.src;
			currentIndex = getIndex(img);
		}
	// Modális ablak bezárása
  function closeModal() {
    modal.style.display = "none";
  }

  // Aktuális kép indexének meghatározása
  function getIndex(img) {
    for (var i = 0; i < images.length; i++) {
      if (images[i].src === img.src) {
        return i;
      }
    }
    return -1;
  }

  // Kép megváltoztatása előre vagy hátra lépve
  function changeImage(n) {
    currentIndex += n;
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
      currentIndex = 0;
    }
    modalImg.src = images[currentIndex].src;
  }

  // ESC gombra történő modális ablak bezárása
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      closeModal();
    } else if (evt.keyCode == 37) {
      changeImage(-1); // balra nyíl
    } else if (evt.keyCode == 39) {
      changeImage(1); // jobbra nyíl
    }
   };