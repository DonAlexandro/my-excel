// Pure functions
export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }

    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
    const arr = []

    if (start > end) {
        [end, start] = [start, end]
    }

    for (let i = start; i <= end; i++) {
        arr.push(i)
    }

    return arr
}
