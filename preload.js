const { ipcRenderer, contextBridge } = require("electron")

contextBridge.exposeInMainWorld("electron", {
    notificationApi : {
        sendNotification(_msg) {
            ipcRenderer.send("notify", _msg)
        }
    }
})