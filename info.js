import fetch from 'node-fetch'

async function fetchData () {
    const avatarsDataUrl = "https://api.ambr.top/v2/EN/avatar"
    return Object.values((await (await fetch(avatarsDataUrl)).json()).data.items)
}

const avatars = await fetchData()

export function gachaUrlOf (avatar) {
    return `https://api.ambr.top/assets/UI/${avatar.icon.replace('AvatarIcon', 'Gacha_AvatarImg')}.png`
}

export function rollDice () {
    const k = avatars[Math.floor(Math.random() * avatars.length)]
    // if (k.identifier === 'lumine' || k.identifier === 'aether') return rollDice()
    return k
}
