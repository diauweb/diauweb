const standData = require('./standinfo.json')
const bgData = require('./bginfo.json')

function shuffleStand () {
    const choice1 = Math.random() * standData.length | 0
    const character = standData[choice1]
    const choice2 = Math.random () * character.face.length | 0
    const face = character.face[choice2]

    return {
        key: `${character.key}`,
        type: `${character.name} ${face}`,
        base: `${character.image}-stand-base-10_20.png`,
        face: `${character.image}-stand-${face}-10_20.png`
    }
}


function shuffleBg (){
    const choice1 = Math.random() * bgData.length | 0
    const bg = bgData[choice1]
    const now = new Date().getUTCHours() + 8 % 24

    const bgVarient = 'daytime'
    if (now >= 16 && now < 20) {
        bgVarient = 'evening'
    } else if (now >= 20 || now < 5){
        bgVarient = 'night'
    }

    const pool = Object.keys(bg.timeview).filter(e => e.includes(bgVarient))
    const choice2 = Math.random() * pool.length | 0

    return bg.timeview[pool[choice2]]
}

module.exports = {
    standData, shuffleStand, shuffleBg
}
