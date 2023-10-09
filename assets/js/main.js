const presentarRandomColor = document.querySelectorAll('.presentar-random-color')

presentarRandomColor.forEach(e => {
    const colors = ['#80D3B5', '#DCE3E9', '#C389BC', '#DCE3E9', '#DCE3E9']
    const eColor = extraMethods.random.ItemArray(colors)
    if(!e.classList.contains('corto-button')) e.style.backgroundColor = eColor

    const afterColors = ['#80D3B5', '#DCE3E9', '#C389BC']

    let afterColor = extraMethods.random.ItemArray(afterColors)

    while(afterColor == eColor){
        afterColor = extraMethods.random.ItemArray(afterColors)
    }
    e.style.setProperty('--presentar-bg', afterColor);

    // e.style.position = 'relative';
    // e.style.left = `${extraMethods.random.FloatInterval(-10, 10)}px`
    // e.style.top = `${extraMethods.random.FloatInterval(-10, 10)}px`
})