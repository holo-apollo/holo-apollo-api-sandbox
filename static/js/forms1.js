var textareas = document.getElementsByTagName('textarea');
for (var i = 0; i < textareas.length; i++) {
  textareas[i].setAttribute('style', 'height:' + (textareas[i].scrollHeight - 4) + 'px;');
  textareas[i].addEventListener('input', onInput, false);
}

var filesToUpload = [];

var fileInput = document.getElementById('id_images');
fileInput.addEventListener('change', addPreviews, false);

function onInput() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight - 4) + 'px';

  var currentCounter = this.nextElementSibling.getElementsByClassName('current-count')[0];
  if (currentCounter) {
    currentCounter.innerHTML = this.value.length;
  }
}

function addPreviews() {
  if (!this.files || !this.files.length) return false;

  var input = this;
  var parent = input.closest('p');
  var images = parent.getElementsByClassName('images-preview')[0];
  if (!images) {
    images = document.createElement('span');
    images.className = 'images-preview';
  }

  for (var i = 0; i < input.files.length; i++) {
    var file = input.files[i];
    filesToUpload.push(file);
    var reader = new FileReader();
    reader.onload = function(e) {
      var imageWrapper = document.createElement('span');
      imageWrapper.className = 'image-wrapper';

      var image = document.createElement('img');
      image.setAttribute('src', e.target.result);
      imageWrapper.appendChild(image);

      var close = document.createElement('span');
      close.className = 'close';
      imageWrapper.appendChild(close);
      close.addEventListener('click', removeFile, false);

      images.appendChild(imageWrapper);
    };

    reader.readAsDataURL(file);
  }

  parent.appendChild(images);
}

function removeFile() {
  var imageWrapper = this.parentNode;
  var images = imageWrapper.parentNode;
  images.removeChild(imageWrapper);
}
