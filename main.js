require('dotenv').config()

const {app, BrowserWindow, ipcMain} = require("electron")
const tumblr = require('tumblr.js');

const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 800,    
        webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
    })

    win.setMenu(null)
    win.loadFile('index.html')
}


async function getPost(offset) {
    const client = tumblr.createClient({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        token: process.env.TOKEN,
        token_secret: process.env.TOKEN_SECRET
    })

    // only single text posts at a time
    let limit = 1
    let type = 'text'
    try {
        const res = await client.userDashboard({ 
            limit, 
            type,
            offset
        })
        return res
    } catch (error) {
        console.error('Error fetching Tumblr posts:', error)
        return 'Error fetching posts'
    }
}


app.whenReady().then(() => {
    createWindow()

    ipcMain.handle('get-tumblr-post', async (event, offset) => {
        return await getPost(offset)
    })
})
