const sliderElements = document.querySelectorAll('[slider]')

document.head.innerHTML += `
    <style>
        [slider] {
            position: relative;
        }

        [slider-item] {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
        }
    </style>
`

sliderElements.forEach(element => {
    element.index = Number(element.getAttribute('slider-index')) || 0
    element.lastIndex = element.index

    element.style.aspectRatio = element.getAttribute('slider-aspect-ration') || '16/9'
    element.style.overflow = element.getAttribute('slider-overflow') || 'hidden'

    element.animation = element.getAttribute('slider-animation') || 'slide'
    element.animationDuration = Number(element.getAttribute('slider-duration')) || 1000
    element.animationEasing = element.getAttribute('slider-easing') || 'ease-in-out'
    element.animationTimeout = null

    element.sliderItems = element.querySelectorAll('[slider-item]')
    element.sliderItems.forEach((sliderItem, index) => {
        // sliderItem.style.width = getComputedStyle(element).width
        if(element.index != index){
            switch(element.animation){
                case 'slide':
                    sliderItem.style.left = `${getComputedStyle(element).width}`
                    break
                case 'fade':
                    sliderItem.style.opacity = `0`
                    break
                case 'pull':
                    sliderItem.style.zIndex = 0
                    break
                case 'push':
                    sliderItem.style.left = `${getComputedStyle(element).width}`
                    sliderItem.style.zIndex = '0'
                    break
                case 'scale':
                    sliderItem.style.scale = '0'
                    sliderItem.style.zIndex = '0'
                    break
            }
        }else{
            switch(element.animation){
                case 'pull':
                    sliderItem.style.zIndex = 10
                    break
                case 'pull':
                    sliderItem.style.zIndex = 10
                    break
                case 'scale':
                    sliderItem.style.zIndex = 10
                    break
            }
        }
    })

    element.next = () => {
        if(element.animationTimeout == null){
            element.lastIndex = element.index
            element.index += 1
            if(element.index >= element.sliderItems.length) element.index = 0

            switch(element.animation){
                case 'slide':
                    element.lastIndexAnimation = [
                        {left: `0`},
                        {left: `-${getComputedStyle(element).width}`}
                    ]
                    element.indexAnimation = [
                        {left: `${getComputedStyle(element).width}`},
                        {left: '0'}
                    ]
                    break
                case 'fade':
                    element.lastIndexAnimation = [
                        {opacity: '1'},
                        {opacity: '0'}
                    ]
                    element.indexAnimation = [
                        {opacity: '0'},
                        {opacity: '1'}
                    ]
                    break
                case 'pull':
                    element.lastIndexAnimation = [
                        {left: `0`},
                        {left: `-${getComputedStyle(element).width}`}
                    ]
                    element.indexAnimation = [
                        {left: '0', zIndex: 0},
                        {left: '0', zIndex: 10}
                    ]
                    break
                case 'push':
                    element.lastIndexAnimation = [
                        {zIndex: 0},
                        {zIndex: 0}
                    ]
                    element.indexAnimation = [
                        {left: `${getComputedStyle(element).width}`, zIndex: 0},
                        {left: '0', zIndex: 10}
                    ]
                    break
                case 'scale':
                    element.lastIndexAnimation = [
                        {zIndex: 10},
                        {zIndex: 0}
                    ]
                    element.indexAnimation = [
                        {scale: 0, zIndex: 0},
                        {scale: 1, zIndex: 10}
                    ]
                    break
            }
            element.runAnimation()
        }
    }

    element.previous = () => {
        if(element.animationTimeout == null){
            element.lastIndex = element.index
            element.index -= 1
            if(element.index < 0) element.index = element.sliderItems.length-1

            switch(element.animation){
                case 'slide':
                    element.lastIndexAnimation = [
                        {left: `0`},
                        {left: `${getComputedStyle(element).width}`}
                    ]
                    element.indexAnimation = [
                        {left: `-${getComputedStyle(element).width}`},
                        {left: '0'}
                    ]
                    break
                case 'fade':
                    element.lastIndexAnimation = [
                        {opacity: '1'},
                        {opacity: '0'}
                    ]
                    element.indexAnimation = [
                        {opacity: '0'},
                        {opacity: '1'}
                    ]
                    break
                case 'pull':
                    element.lastIndexAnimation = [
                        {left: `0`},
                        {left: `${getComputedStyle(element).width}`}
                    ]
                    element.indexAnimation = [
                        {left: '0', zIndex: 0},
                        {left: '0', zIndex: 10}
                    ]
                    break
                case 'push':
                    element.lastIndexAnimation = [
                        {zIndex: 0},
                        {zIndex: 0}
                    ]
                    element.indexAnimation = [
                        {left: `-${getComputedStyle(element).width}`, zIndex: 0},
                        {left: '0', zIndex: 10}
                    ]
                    break
                case 'scale':
                    element.lastIndexAnimation = [
                        {scale: 1},
                        {scale: 0}
                    ]
                    element.indexAnimation = [
                        {scale: 0},
                        {scale: 1}
                    ]
                    break
            }
            element.runAnimation()
        }
    }

    element.runAnimation = () => {
        element.sliderItems[element.lastIndex].animate(
            element.lastIndexAnimation ,{
            duration: element.animationDuration,
            easing: element.animationEasing,
            fill: 'forwards'
        })

        element.sliderItems[element.index].animate(
            element.indexAnimation, {
            duration: element.animationDuration,
            easing: element.animationEasing,
            fill: 'forwards'
        })

        element.animationTimeout = setTimeout(() => {
            element.animationTimeout = null
        }, element.animationDuration)
    }

    //autoplay
    element.autoplayDelay = Number(element.getAttribute('slider-autoplay-delay')) || 2000

    element.autoplay = () => {
        element.autoplayTimeout = setTimeout(() => {
            element.next()

            element.autoplay()

        }, element.autoplayDelay)
    }
    if(element.hasAttribute('slider-autoplay')) element.autoplay()

    //click
    if(element.hasAttribute('slider-click')) {
        element.style.cursor = 'pointer';
        element.addEventListener('click', () => {
            element.next()
            clearTimeout(element.autoplayTimeout)
            if(element.hasAttribute('slider-autoplay')) element.autoplay()
        })
}
})