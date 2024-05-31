function decodeHtmlEntities(encodedString) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = encodedString;
  return textArea.value;
}

var panorama1, panorama2, panorama3, viewer, container, infospot;

var bar = document.querySelector( '#bar' );

function onProgressUpdate ( event ) {
  var percentage = event.progress.loaded / event.progress.total * 100;
  bar.style.width = percentage + "%";
  if (percentage >= 100){
      bar.classList.add( 'hide' );
      setTimeout(function(){
          bar.style.width = 0;
      }, 1000);
  }
}

container = document.querySelector( '#container' );

panorama1 = new PANOLENS.ImagePanorama( 'https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/tunnel.jpg' );
panorama1.addEventListener( 'progress', onProgressUpdate );

panorama2 = new PANOLENS.ImagePanorama( 'https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/sunset.jpg' );
panorama2.addEventListener( 'progress', onProgressUpdate );

panorama3 = new PANOLENS.ImagePanorama( 'https://pchen66.github.io/Panolens/examples/asset/textures/equirectangular/road.jpg' );
panorama3.addEventListener( 'progress', onProgressUpdate );

infospot = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );

panorama1.add( infospot );

viewer = new PANOLENS.Viewer( { container: container } );
viewer.add( panorama1, panorama2, panorama3 );

// Chuyển đổi linh hoạt giữa các panorama chỉ với một nút "Next"
var panoramaIndex = 0;
var panoramas = [panorama1, panorama2, panorama3];
var nextBtn = document.querySelector( '#nextBtn' );

nextBtn.addEventListener('click', function() {
  bar.classList.remove('hide');
  panoramaIndex = (panoramaIndex + 1) % panoramas.length;
  viewer.setPanorama(panoramas[panoramaIndex]);
});
</script>
</body>
</html>