var tx = document.getElementsByTagName('textarea');
for (var i = 0; i < tx.length; i++) {
  tx[i].addEventListener('input', OnInput, false);
}

function OnInput() {
  this.style.height = '25px';
  this.style.height = (this.scrollHeight - 4) + 'px';
}
