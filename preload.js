const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('tumblr', {
    getPost: (offset) =>  ipcRenderer.invoke('get-tumblr-post', offset)
})
