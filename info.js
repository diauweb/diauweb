import fetch from 'node-fetch'

async function fetchData () {
    const avatarsDataUrl = "https://www.projectcelestia.com/data/characters-index.json"
    return await (await fetch(avatarsDataUrl)).json()
}

const avatars = await fetchData()

export function gachaUrlOf (avatar) {
    return `https://www.projectcelestia.com/static/images/${avatar.GachaImage}.webp`
}

export function rollDice () {
    const k = avatars[Math.floor(Math.random() * avatars.length)]
    if (k.identifier === 'lumine' || k.identifier === 'aether') return rollDice()
    return k
}
