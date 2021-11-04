const mobileNav = document.querySelector('.nav__mobile--menu');
const hamburger = document.querySelector('#hamburger');

hamburger.addEventListener('click', e => {
	hamburger.classList.toggle('animate-nav');
	mobileNav.classList.toggle('show');
});
