window.HTMLComponentRender = container => {
    container.querySelectorAll('html-component').forEach(async HTMLComponent => {
        if(HTMLComponent.hasAttribute('rendered')) return

        const res = await fetch(HTMLComponent.getAttribute('src'));
        let text = await res.text();

        HTMLComponent.setAttribute('children', HTMLComponent.innerHTML);
        HTMLComponent.innerHTML = '';

        const propsRegex = /\{(\w+)\}/g;

        if(HTMLComponent.hasAttribute('shadow-dom')) {
            HTMLComponent.attachShadow({mode: "open"});

            HTMLComponent.shadowRoot.innerHTML = text.replace(propsRegex, (match, att) =>
            HTMLComponent.getAttribute(att) || ''
            )

            HTMLComponent.shadowRoot.querySelectorAll('script').forEach(async scriptElement => {
                if (scriptElement.hasAttribute('src')) {
                    const scriptRes = await fetch(scriptElement.getAttribute('src'))
                    const scriptText = await scriptRes.text()

                    const newScriptElement = document.createElement('script');
                    newScriptElement.innerHTML = scriptText
                    document.getElementsByTagName('head')[0].appendChild(newScriptElement)
                }else{
                    const newScriptElement = document.createElement('script');
                    newScriptElement.innerHTML = scriptElement.innerHTML
                    document.getElementsByTagName('head')[0].appendChild(newScriptElement)
                }
                scriptElement.remove()
            })

            HTMLComponent.setAttribute('rendered', '')
        }else{
            HTMLComponent.innerHTML = text.replace(propsRegex, (match, att) =>
            HTMLComponent.getAttribute(att) || ''
            )

            HTMLComponent.querySelectorAll('script').forEach(async scriptElement => {
                if (scriptElement.hasAttribute('src')) {
                    const res = await fetch(scriptElement.getAttribute('src'))
                    const data = await res.text()

                    const newScriptElement = document.createElement('script');
                    newScriptElement.innerHTML = data
                    document.getElementsByTagName('head')[0].appendChild(newScriptElement)
                }else{
                    const newScriptElement = document.createElement('script');
                    newScriptElement.innerHTML = scriptElement.innerHTML
                    document.getElementsByTagName('head')[0].appendChild(newScriptElement)
                }
                scriptElement.remove()
            })

            HTMLComponent.setAttribute('rendered', '')

            HTMLComponentRender(HTMLComponent)
        }
    })

    container.querySelectorAll('[listener]').forEach(async listenerElement =>
        listenerElement.getAttribute('listener').split(' ').forEach(listener => {
            const [eventName, methodName] = listener.split('-')
            if(eventName == 'load') {
                listenerMethods[methodName](listenerElement.dispatchEvent(new Event('load')))
            }else{
                listenerElement.addEventListener(eventName, event => listenerMethods[methodName](event))
            }
        })
    )
}

window.listenerMethods = {}
window.HTMLComponentRender(document)