const scrollRevealElements = document.querySelectorAll('[scroll-reveal]')

const scrollRevealObserver = new IntersectionObserver(entries =>
    entries.forEach(entry => {
        const element = entry.target

        if(entry.isIntersecting){
            if(!element.scrollReveal){
                let startAnimation = {}
                let endAnimation =  {translate: 0}

                const direction = element.getAttribute('scroll-reveal-direction') || 'top'
                const easing = element.getAttribute('scroll-reveal-easing') || 'ease-in-out'
                const duration = Number(element.getAttribute('scroll-reveal-duration')) || 1000
                const distance = Number(element.getAttribute('scroll-reveal-distance')) || 100
                if(element.hasAttribute('scroll-reveal-onetime')) element.scrollReveal = true

                switch (direction) {
                    case 'bottom':
                        startAnimation.translate = `0 -${distance}%`
                        break;
                    case 'top':
                        startAnimation.translate = `0 ${distance}%`
                        break;
                    case 'right':
                        startAnimation.translate = `${distance}% 0`
                        break;
                    case 'left':
                        startAnimation.translate = `-${distance}% 0`
                        break;
                }

                element.animate([
                    startAnimation,
                    endAnimation
                ],
                {
                    duration,
                    easing,
                    fill: 'forwards'
                })
            }
        }else{
            if(!element.scrollReveal){
                const direction = element.getAttribute('scroll-reveal-direction') || 'top'
                const distance = Number(element.getAttribute('scroll-reveal-distance')) || 100

                switch (direction) {
                    case 'bottom':
                        element.style.translate = `0 -${distance}%`
                        break;
                    case 'top':
                        element.style.translate = `0 ${distance}%`
                        break;
                    case 'right':
                        element.style.translate = `${distance}% 0`
                        break;
                    case 'left':
                        element.style.translate = `-${distance}% 0`
                        break;
                }
            }
        }
    })
)

scrollRevealElements.forEach(element => {
    scrollRevealObserver.observe(element)

    const direction = element.getAttribute('scroll-reveal-direction') || 'top'
    const distance = Number(element.getAttribute('scroll-reveal-distance')) || 100

    switch (direction) {
        case 'bottom':
            element.style.translate = `0 -${distance}%`
            break;
        case 'top':
            element.style.translate = `0 ${distance}%`
            break;
        case 'right':
            element.style.translate = `${distance}% 0`
            break;
        case 'left':
            element.style.translate = `-${distance}% 0`
            break;
    }
})