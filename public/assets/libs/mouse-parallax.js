
window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('mousemove', event => {
        document.querySelectorAll('[mouse-parallax]').forEach(element => {
            if (element.mouseParallaxLoaded) return
            element.mouseParallaxLoaded = true

            if (!element.hasAttribute('mouse-parallax-x')) element.setAttribute('mouse-parallax-x', (parseFloat(element.getAttribute('mouse-parallax')) || 2.5))
    
            if (!element.hasAttribute('mouse-parallax-y')) element.setAttribute('mouse-parallax-y', (parseFloat(element.getAttribute('mouse-parallax')) || 2.5))
        })

        document.querySelectorAll('[mouse-parallax-x], [mouse-parallax-y]').forEach(element => {
            const parallax = { x: 0, y: 0 }

            if (element.hasAttribute('mouse-parallax-x')) parallax.x = (event.clientX * (parseFloat(element.getAttribute('mouse-parallax-x')) || 2.5)) / 250
            
            if (element.hasAttribute('mouse-parallax-y')) parallax.y = (event.clientY * (parseFloat(element.getAttribute('mouse-parallax-y')) || 2.5)) / 250

            element.style.translate = `${parallax.x}px ${parallax.y}px`
        })
    })
    
})