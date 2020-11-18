const childProcess = require('child_process')
const { randomBytes } = require('crypto')

const GET_MAC = `ifconfig en0 ether | grep -i ether`
const SET_MAC = `sudo ifconfig en0 ether`


const resetMacAddress = () => {
    try {
        let r = (randomBytes(100)).toString('hex')
        let newMAC = `${r.substring(0, 2)}:${r.substring(13, 15)}:${r.substring(26, 28)}:${r.substring(39, 41)}:${r.substring(42, 44)}:${r.substring(85, 87)}`

        let old = childProcess.execSync(GET_MAC).toString()

        childProcess.execSync(`${SET_MAC} ${newMAC}`)
        let updated = childProcess.execSync(GET_MAC).toString()

        if(old == updated) {
            resetMacAddress()
            return
        }

        let when = new Date(Date.now())
        console.log(`\nMac-address was successfully changed! \n  \nold: ${old} \nnew: ${updated} \ntime: ${when.toLocaleTimeString()} \n`)

    } catch(err) {
        console.log(`Something was wrong!!!`)
        console.error(err)
    }

}

resetMacAddress()

setInterval(resetMacAddress, 120*60*1000)














