import { readFile } from 'node:fs/promises'
import emailExistence from 'email-existence'

let blacklist

const isTemp = async (email) => {

    if (!blacklist) {
        const content = await readFile('validators/TempList.conf', { encoding: 'utf-8' })
        const contentSplitted = content.split('\r\n')
        blacklist = contentSplitted.slice(0, (contentSplitted[contentSplitted.length - 1].trim() ? contentSplitted.length : -1))
    }

    const domain = email.split('@')[1]
    return blacklist.includes(domain)

}


const emailExists = async (req, res) => {
    
    try {
        const email = req.body.email

        const inBlackList = await isTemp(email)
        if (inBlackList) {
            res.status(401).json({ error: 'We could not verify the domain name of this email' })
            return false
        }

        const exists = await new Promise((resolve) => {
            emailExistence.check(email, (err, exists) => {
                if (err) {
                    res.status(400).json({ error: "Error occurred in checking the existence of the email" })
                    return resolve(false)
                }
                if (!exists) {
                    res.status(400).json({ error: "We could not verify the existence of this email" })
                    return resolve(false)
                }
                return resolve(true)
            })
        })

        return exists

    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
        return false
    }

}


export default emailExists