const { readFileSync, writeFileSync } = require('fs');

const path = './node_modules/venom-bot/dist/lib/wapi/wapi.js'

let toFix = readFileSync(path);


toFix = toFix.toString().replace(
    `return await n.processAttachments("0.4.613"===Debug.VERSION?t:t.map((e=>({file:e}))),e,1),n}`,
    `return await n.processAttachments("0.4.613"===Debug.VERSION?t:t.map((e=>({file:e}))),e,e),n}`
)

const fix =()=>{
    writeFileSync(path, toFix)
}

export default fix;
