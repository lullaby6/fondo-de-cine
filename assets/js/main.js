const presentarRandomColor = document.querySelectorAll('.presentar-random-color')

presentarRandomColor.forEach(e => {
    const colors = ['#FE3030', '#80D3B5', '#DCE3E9', '#C389BC', '#DCE3E9', '#DCE3E9']
    const eColor = extraMethods.random.ItemArray(colors)
    e.style.backgroundColor = eColor

    const afterColors = ['#80D3B5', '#DCE3E9', '#C389BC']

    let afterColor = extraMethods.random.ItemArray(afterColors)

    while(afterColor == eColor){
        afterColor = extraMethods.random.ItemArray(afterColors)
    }
    e.style.setProperty('--presentar-bg', afterColor);
})