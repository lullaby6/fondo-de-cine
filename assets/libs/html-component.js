window.HTMLComponentRender = container => {
    container.querySelectorAll('html-c').forEach(async HTMLComponent => {
        if(HTMLComponent.hasAttribute('rendered')) return

        const srcRes = await fetch(HTMLComponent.getAttribute('src'));
        let srcText = await srcRes.text();

        HTMLComponent.setAttribute('children', HTMLComponent.innerHTML);
        HTMLComponent.innerHTML = '';

        const propsRegex = /\{(\w+)\}/g;

        function loadScripts(scriptElements){
            scriptElements.forEach(async scriptElement => {
                const newScriptElement = document.createElement('script')

                if(scriptElement.hasAttribute('src')) {
                    const scriptRes = await fetch(scriptElement.getAttribute('src'))
                    const scriptText = await scriptRes.text()

                    newScriptElement.innerHTML = scriptText
                }else newScriptElement.innerHTML = scriptElement.innerHTML

                document.getElementsByTagName('head')[0].appendChild(newScriptElement)
                scriptElement.remove()
            })
        }

        if(HTMLComponent.hasAttribute('shadow-dom')) {
            HTMLComponent.attachShadow({mode: "open"});

            HTMLComponent.shadowRoot.innerHTML = srcText.replace(propsRegex, (match, att) => HTMLComponent.getAttribute(att) || '')

            loadScripts(HTMLComponent.shadowRoot.querySelectorAll('script'))
        }else{
            HTMLComponent.innerHTML = srcText.replace(propsRegex, (match, att) => HTMLComponent.getAttribute(att) || '')

            loadScripts(HTMLComponent.querySelectorAll('script'))
        }

        HTMLComponent.setAttribute('rendered', '')
        HTMLComponentRender(HTMLComponent)
    })

    container.querySelectorAll('[listener]').forEach(async listenerElement =>
        listenerElement.getAttribute('listener').split(' ').forEach(listener => {
            const [eventName, methodName] = listener.split('-')
			listenerElement.addEventListener(eventName, event => HTMLComponentProps[methodName](event))
            if(eventName == 'load') HTMLComponentProps[methodName](listenerElement.dispatchEvent(new Event('load')))
        })
    )
}

window.HTMLComponentProps = {}
window.HTMLComponentRender(document)