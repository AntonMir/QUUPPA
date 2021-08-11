const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const chalk = require('chalk')
require('module-alias/register')

const app = express()

const PORT = process.env.PORT || config.get('port') || 8000

app.use(express.json({ extended: true }))

app.use('/api/auth', require('@routes/auth.routes.js'))

async function start() {
    try {
        // if connect to MongoDB success, run server
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => console.log(chalk.magenta(`>>> AUTH server listen http://localhost:${PORT}`)))
    } catch (e) {
        console.log('Server Error:', e.message)
        process.exit(1)
    }
}

start()
