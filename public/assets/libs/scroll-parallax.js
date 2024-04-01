function scrollParallax(element) {
    if (!element.scrollParallaxPosY) element.scrollParallaxPosY = element.getBoundingClientRect().top

    let parallax = { x: 0, y: 0 }

    if (element.hasAttribute('scroll-parallax-x')) parallax.x = (window.scrollY - element.scrollParallaxPosY) *  Math.min(parseFloat(element.getAttribute('scroll-parallax-x')) || 0.5, 1)

    if (element.hasAttribute('scroll-parallax-y')) parallax.y = (window.scrollY - element.scrollParallaxPosY) * Math.min(parseFloat(element.getAttribute('scroll-parallax-y')) || 0.5, 1)

    if ((element.scrollParallaxPosY - element.getBoundingClientRect().height) - window.scrollY > (element.getBoundingClientRect().height / 10)) parallax = { x: 0, y: 0 }

    element.style.translate = `${parallax.x}px ${parallax.y}px`;
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[scroll-parallax-y], [scroll-parallax-x]').forEach(scrollParallax)

	window.addEventListener('scroll', () => {
		document.querySelectorAll('[scroll-parallax-y], [scroll-parallax-x]').forEach(scrollParallax)
	})
})