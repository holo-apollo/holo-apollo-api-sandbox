var textareas = document.getElementsByTagName('textarea');
for (var i = 0; i < textareas.length; i++) {
  textareas[i].setAttribute('style', 'height:' + (textareas[i].scrollHeight - 4) + 'px;');
  textareas[i].addEventListener('input', OnInput, false);
}

function OnInput() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight - 4) + 'px';

  var currentCounter = this.nextElementSibling.getElementsByClassName('current-count')[0];
  if (currentCounter) {
    currentCounter.innerHTML = this.value.length;
  }
}
