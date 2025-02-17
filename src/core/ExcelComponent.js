import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers = []

        this.prepare()
    }

    prepare() {}

    // Return component template
    toHTML() {
        return '<h1></h1>'
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, ...args) {
        const unsub = this.emitter.subscribe(event, ...args)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    init() {
        this.initDOMListeners()
    }

    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    destroy() {
        this.removeDOMListeners()

        this.unsubscribers.forEach(unsub => unsub())
    }
}
