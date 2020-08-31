import {storage} from '@core/utils';

function toHTML(key) {
    const table = storage(key)
    const id = key.slice(6)

    return `
        <li class="db__record">
            <a href="#excel/${id}">${table.title}</a>
            <strong>
                ${new Date(table.openedDate).toLocaleDateString()}
                ${new Date(table.openedDate).toLocaleTimeString()}
            </strong>
        </li>
    `
}

function getAllKeys() {
    const keys = []

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)

        if (!key.includes('excel')) {
            continue
        }

        keys.push(key)
    }

    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()

    if (!keys.length) {
        return `<p>There are no tables yet</p>`
    }

    return `
        <div class="db__list-header">
            <span>Назва</span>
            <span>Дата відкриття</span>
        </div>
        <ul class="db__list">
            ${keys.map(toHTML).join('')}
        </ul>
    `
}
