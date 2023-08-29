const magicHeaderElements = document.querySelectorAll('[magic-header]')

magicHeaderElements.forEach(element => {
    element.magicHeader = {}

    element.magicHeader.revealOnStopDelay = parseInt(element.getAttribute('magic-header-delay')) || 1500

    element.magicHeader.showAnimationDuration = parseInt(element.getAttribute('magic-header-show-duration')) || 250
    element.magicHeader.showAnimationDelay = parseInt(element.getAttribute('magic-header-show-delay')) || 125

    element.magicHeader.hideAnimationDuration = parseInt(element.getAttribute('magic-header-hide-duration')) || 250
    element.magicHeader.hideAnimationDelay = parseInt(element.getAttribute('magic-header-hide-delay')) || 250

    element.magicHeader.state = 'visible'

    element.magicHeader.showAnimationMethod = () => {
        element.magicHeader.showAnimation = element.animate([
            {transform: "translateY(-100%)"},
            {transform: "translateY(0)"}
        ],{
            duration: element.magicHeader.showAnimationDuration,
            delay: element.magicHeader.showAnimationDelay,
            fill: 'forwards'
        })
        element.magicHeader.state = 'visible'
    }

    element.magicHeader.hideAnimationMethod = () => {
        element.magicHeader.hideAnimation = element.animate([
            {transform: "translateY(0)"},
            {transform: "translateY(-100%)"}
        ],{
            duration: element.magicHeader.hideAnimationDuration,
            delay: element.magicHeader.hideAnimationDelay,
            fill: 'forwards'
        })
        element.magicHeader.state = 'hidden'
    }
})

window.addEventListener('scroll', () => {
    magicHeaderElements.forEach(element => {
        clearTimeout(element.magicHeader.timer)

        element.magicHeader.timer = setTimeout(() => {
            //stop scrolling
            if(element.magicHeader.state == 'hidden'){
                element.magicHeader.showAnimationMethod()
            }
        }, element.magicHeader.revealOnStopDelay);

        if(window.oldScroll > window.scrollY){
            //scrolling up
            if(element.magicHeader.state == 'hidden'){
                if(element.magicHeader.showAnimation != null){
                    if(element.magicHeader.showAnimation.playState == 'finished'){
                        element.magicHeader.showAnimationMethod()
                    }
                }else{
                    element.magicHeader.showAnimationMethod()
                }
            }
        }else if (element.magicHeader.state == 'visible'){
            //scrolling down
            if(element.magicHeader.hideAnimation != null) {
                if(element.magicHeader.hideAnimation.playState == 'finished'){
                    element.magicHeader.hideAnimationMethod()
                }
            }else{
                element.magicHeader.hideAnimationMethod()
            }
        }
    })

    window.oldScroll = window.scrollY
})