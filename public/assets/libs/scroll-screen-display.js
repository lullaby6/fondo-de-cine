
function scrollScreenDisplay() {
    const screenNumber = Math.floor(window.scrollY / window.innerHeight)

    const scrollScreenDisplayElements = document.querySelectorAll('[scroll-screen-display]')

    scrollScreenDisplayElements.forEach((scrollScreenDisplayElement, scrollScreenDisplayElementIndex) => {
        if (screenNumber == scrollScreenDisplayElementIndex || (screenNumber > scrollScreenDisplayElements.length && scrollScreenDisplayElementIndex == scrollScreenDisplayElements.length - 1)) {
            scrollScreenDisplayElement.style.display = scrollScreenDisplayElement.scrollScreenDisplayOriginalDisplay || 'block'

            return;
        }

        scrollScreenDisplayElement.style.display = 'none'
    })
}

function scrollScreenDisplayLoad() {
    const scrollScreenDisplayElements = document.querySelectorAll('[scroll-screen-display]')

    scrollScreenDisplayElements.forEach((element, index) => {
        const currentDisplay = window.getComputedStyle(element).display
        element.scrollScreenDisplayOriginalDisplay = currentDisplay == 'none' ? 'block' : currentDisplay
        element.setAttribute('scroll-screen-display', index)
    })

    scrollScreenDisplay()
}

window.addEventListener('scroll', scrollScreenDisplay)

window.addEventListener('DOMContentLoaded', scrollScreenDisplayLoad)