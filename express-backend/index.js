import express, { json } from 'express';
import { createClient } from 'redis';

const app = express()
const PORT = 3000

app.use(json())

const client = createClient()

startServer()

app.post('/data', async(req, res) => {
    const {userId, problems, content} = req.body

    try {
        await client.lPush("submit", JSON.stringify({userId, problems, content}))
        res.status(200).send('Submitted successfully')
    } catch (error) {
        console.log('Error submiting data')
        res.status(500).send('Failed to submit')
    }
})

async function startServer() {
    try {
        await client.connect().then(() => {
            app.listen(PORT, ()=> {
                console.log(`listening on port ${PORT}`)
            })
        })
    } catch (error) {
        console.log(error || 'something went wrong while connecting')
    }
}

