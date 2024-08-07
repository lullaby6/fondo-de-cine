function loadScrollParallax() {

}

function scrollParallax(element, reset = false) {
    console.log(element.scrollParallaxPosY);

    if (reset) {
        element.style.translate = '0 0'
    }

    if (!element.scrollParallaxPosY) {
        element.scrollParallaxPosY = element.getBoundingClientRect().top
    }

    let parallax = { x: 0, y: 0 }

    if (element.hasAttribute('scroll-parallax-x')) parallax.x = (window.scrollY - element.scrollParallaxPosY) *  Math.min(parseFloat(element.getAttribute('scroll-parallax-x')) || 0.5, 1)

    if (element.hasAttribute('scroll-parallax-y')) parallax.y = (window.scrollY - element.scrollParallaxPosY) * Math.min(parseFloat(element.getAttribute('scroll-parallax-y')) || 0.5, 1)

    if ((element.scrollParallaxPosY - element.getBoundingClientRect().height) - window.scrollY > (element.getBoundingClientRect().height / 10)) parallax = { x: 0, y: 0 }

    element.animate([
        { translate: `${parallax.x}px ${parallax.y}px` },
    ], { duration: 0, fill: 'forwards' })
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[scroll-parallax-y], [scroll-parallax-x]').forEach(scrollParallax)

	window.addEventListener('scroll', () => {
		document.querySelectorAll('[scroll-parallax-y], [scroll-parallax-x]').forEach(scrollParallax)
	})

	window.addEventListener('resize', () => {
		document.querySelectorAll('[scroll-parallax-y], [scroll-parallax-x]').forEach(element => scrollParallax(element, true))
	})
})