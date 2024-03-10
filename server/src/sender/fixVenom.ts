const { readFileSync, writeFileSync } = require('fs');
const path = require('path')
const oldpath = './node_modules/venom-bot/dist/lib/wapi/wapi.js'
const pathSingleton = './node_modules/venom-bot/dist/controllers/browser.js'

let toFix = readFileSync(oldpath);

let toFixSingleton = readFileSync(path.join(__dirname, '/newFileVenomSingleton.js'));
console.log(toFixSingleton)

toFix = toFix.toString().replace(
    `return await n.processAttachments("0.4.613"===Debug.VERSION?t:t.map((e=>({file:e}))),e,1),n}`,
    `return await n.processAttachments("0.4.613"===Debug.VERSION?t:t.map((e=>({file:e}))),e,e),n}`
)

const fix =()=>{
    writeFileSync(oldpath, toFix)
    writeFileSync(pathSingleton, toFixSingleton)
}

export default fix;
