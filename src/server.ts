import express from "express"
import { getPayloadClient } from "./get-payload"
import { Payload } from "payload"
import { nextApp, nextHandler } from "./next-utils"

const app = express()
const PORT = Number(process.env.PORT) || 3000

async function start () {
    const payload = await getPayloadClient()
    initOptions: {
        express: app
        onInit: async (cms: Payload) => {
            cms.logger.info(`Admin URL ${cms.getAdminURL()}`)
        }
    }

    app.use((req, res) => nextHandler(req, res))

    nextApp.prepare().then(() => {
        payload.logger.ino("Next.js started")

        app.listen(PORT, async () => {
            payload.logger.ingo(`Next.js App URL: ${process.env.NEXT_PUBLIC_APP_URL}`)})
        }) 
}

start ()