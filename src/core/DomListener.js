import {capitalize} from '@core/utils'

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener`)
        }

        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)

            if (!this[method]) {
                // eslint-disable-next-line max-len
                throw new Error(`Method ${method} is not implemented in ${this.name} Component`)
            }

            this[method] = this[method].bind(this)
            // Те ж саме, що і addEventListener
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

// input => onInput
function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}
