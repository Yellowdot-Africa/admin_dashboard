var button = document.getElementById('three-dots');
var dropdown = document.getElementsByClassName('dropdown-menu');

button.addEventListener('click', (e) => {
    console.log("I AM A BOY")
    dropdown.classList.toggle("active");
})

