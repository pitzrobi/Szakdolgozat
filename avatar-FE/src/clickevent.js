/**
 * TODO először el kell kérni az összes kiválasztható "darabot"
 * és be kell pakolnunk az oldalba a megfelelő helyre
 * cap-contaner -> cap
 * coat-container -> coat
 * pants-container -> pants
 * és be kell állítanunk a kapott kép url-eket background-image-nek
 * axios.get('/bodypartos-get-url').then(res => {
 *    // itt megyünk végig a kapott adatokon
 * }).catch(err => {
 *    // mutatunk egy errort a usernek (nem sikerült betölteni az adatokat pl.)
 * })
 */

/**
 * Minden jelenleg látható részt lerejtése
 */
function hideAllParts() {
  var el = document.querySelectorAll('#caps, #coats, #pants');
  el.forEach((item) => {
    item.style.display = 'none';
  });
}

function showCaps() {
  hideAllParts();
  var x = document.getElementById('caps');
  x.style.display = 'block';
  // if (x.classList.contains('cap-container')) {
  //   x.style.display = 'block';
  //   x.classList.remove('cap-container');
  // } else {
  //   x.classList.toggle('cap-container');
  // }
}

function showCoats() {
  hideAllParts();
  var x = document.getElementById('coats');
  x.style.display = 'block';
  // if (x.classList.contains('coat-container')) {
  //   x.style.display = 'block';
  //   x.classList.remove('coat-container');
  // } else {
  //   x.classList.toggle('coat-container');
  // }
}

function showPants() {
  hideAllParts();
  var x = document.getElementById('pants');
  x.style.display = 'block';
  // if (x.classList.contains('pants-container')) {
  //   x.style.display = 'block';
  //   x.classList.remove('pants-container');
  // } else {
  //   x.classList.toggle('pants-container');
  // }
}

function selectCap(id) {
  console.log('clicked cap', id);
}

function selectCoat(id) {
  console.log('clicked coat', id);
}

function selectPant(id) {
  console.log('clicked pant', id);
}
