const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('tumblr', {
    getPost: (limit, offset, type) => ipcRenderer.invoke('get-tumblr-post', limit, offset, type)
})
