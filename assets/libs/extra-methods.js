const extraMethods = {
	getCookie: name => {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(';').shift()
    },

    getCookies: () => {
        var pairs = document.cookie.split(";");
        var cookies = {};
        for (var i=0; i<pairs.length; i++){
            var pair = pairs[i].split("=");
            cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
        }
        return cookies;
    },

    setFullscreen: element => {
        if (element.requestFullscreen) {
            element.requestFullscreen()
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen()
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen()
        }
    },

    getElement: element => document.querySelector(element),

    getElements: element => document.querySelectorAll(element),

    getElementByXpath: path => document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue,

    ObjectforEach: (object, callback) => {
        Object.entries(object).forEach(([key, value]) => callback(key, value))
    },

    fetchJson: async (url, options) => {
        const res = await fetch(url, options)
        const data = await res.json()
        return data
    },

    delay: ms => new Promise(res => setTimeout(res, ms)),

    repeat: async (times, callback) => {for (let e = 0; e < times; e++) await callback()},

    random: {
        FloatInterval: (min, max) => Math.random() * (max - min) + min,

        IntInterval: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),

        ItemArray: array => array[Math.floor(Math.random() * array.length)],
    },

    uuidv4: () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)),

    validateEmail: email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),

    validatePassword: password => {
        array = [];
        array[0] = password.match(/[A-Z]/)
        array[1] = password.match(/[a-z]/)
        array[2] = password.match(/\d/)
        array[3] = password.match(/[!_.-]/)

        sum = 0;
        array.forEach(el => {
            sum += el ? 1 : 0
        })

        switch (sum) {
            case 0: return("very weak"); break;
            case 1: return("weak"); break;
            case 2: return("medium"); break;
            case 3: return("strong"); break;
            case 4: return("very strong"); break;
            default: return("very weak"); break;
        }
    },

    randomPassword: ({min, max = min, specialChars}) => {
        const length = Math.floor(Math.random() * (max - min + 1) + min)
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' + (specialChars && '!#$%&()*+,-./:;=?@[\]^_{|}~')
        return Array(length).fill('').map(() => chars.charAt(Math.floor(Math.random() * (chars.length + 1)))).join('')
    },

    isEventFronHuman: e => e.isTrusted ? false : true,

    copyToClipboard: text => navigator.clipboard.writeText(text),

    cloneObjectWithoutReference: objectInstance => {
        let clone = {}
        Object.entries(objectInstance).forEach(([key, value]) => {
            clone[key] = Object.assign(Object.create(Object.getPrototypeOf(objectInstance[key])), objectInstance[key])
        })
        return clone
    }
}

HTMLElement.prototype.on = (event, callback) => this.addEventListener(event, e => callback(e))