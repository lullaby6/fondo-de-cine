const scrollFadeElements = document.querySelectorAll('[scroll-fade]')

const scrollFadeobserver = new IntersectionObserver(entries =>
    entries.forEach(entry => {
        const element = entry.target

        if(entry.isIntersecting){
            if(!element.scrollFade){
                const easing = element.getAttribute('scroll-fade-easing') || 'ease-in-out'
                const duration = Number(element.getAttribute('scroll-fade-duration')) || 1000
                if(element.hasAttribute('scroll-fade-onetime')) element.scrollFade = true

                element.animate([
                    {opacity: 0},
                    {opacity: 1},
                ],
                {
                    duration,
                    easing,
                    fill: 'forwards'
                })
            }
        }else if(!element.scrollFade) element.style.opacity = 0
    })
)

scrollFadeElements.forEach(element => {
    scrollFadeobserver.observe(element)
    element.style.opacity = 0
})