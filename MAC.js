const childProcess = require('child_process')
const { randomBytes } = require('crypto')

const GET_MAC = `ifconfig en0 ether | grep -i ether`
const SET_MAC = `sudo ifconfig en0 ether`


function resetMacAddress() {
    try {
        let random = (randomBytes(6)).toString('hex').split('')

        let i = 2
        function setMAC() {
            random.splice(i, 0, ':')
            i = i + 3
            random.length < 17 ? setMAC() : null
        } setMAC()

        let newMAC = random.join('')

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

} resetMacAddress()


/** Mac address will be changing every 2 hours, automatically */
setInterval(resetMacAddress, 120*60*1000)