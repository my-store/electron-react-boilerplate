const electron = require("electron")
const path = require("path")
const url = require("url")

let Root = null // Main window
const {app, BrowserWindow, Menu, ipcMain, Notification} = electron

// Production | Development
process.env.NODE_ENV = app.isPackaged ? "production" : "development" // Set production

// Notification
ipcMain.on("notify", (_, _msg) =>
{
    new Notification({title : "Notification", body : _msg}).show()
})

// Pages
const page = 
{
    homepage    : "pages/homepage.html",        // HOME
}

// Window loader
function loadWindow(title, width, height, frame = true)
{
    const window = new BrowserWindow({
        webPreferences : {
            nodeIntegration         : false,
            contextIsolation        : true,
            worldSafeExecuteJavaScript : true,
            preload     : path.join(__dirname, "/preload.js"),
        },
        height      : height,
        width       : width,
        title       : title,
        frame       : frame, // Disable Close & Minimize buton
        resizable   : false,
        // icon        : path.join(__dirname, "./assets/icons/" + icon_path)
    })
    return window
}

// Page loader
function loadPage(GET_WINDOW, getPage)
{
    GET_WINDOW.loadURL(url.format({
        pathname    : path.join(__dirname, getPage),
        protocol    : "file:",
        slashes     : true
    }))
}

// Menu template
const mainMenuTemplate = []
function setMainMenuTemplate()
{
    mainMenuTemplate.push({
        label   : "DevTools",
        submenu : [
            {
                label       : "Tolge DevTools",
                accelerator : process.platform == "darwin" ? "Command+I" : "Ctrl+I",
                click(item, focusedWindow) 
                {
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role : "reload"
            }
        ]
    })
    return mainMenuTemplate
}

// Autoreload in Development
if(process.env.NODE_ENV === "development")
{
    require("electron-reload")(__dirname, {electron : "/usr/local/bin/electron"})
}

// Entry Point
app.whenReady().then(() =>
{
    Root = loadWindow("ROMBAX FAMILY", 1008, 675)

    if (BrowserWindow.getAllWindows().length > 0)
    {
        loadPage(Root, page.homepage)
    }
    // Insert menu template
    if(process.env.NODE_ENV === "production")
    {
        Menu.setApplicationMenu(null)
    }
    else {
        Menu.setApplicationMenu(Menu.buildFromTemplate(setMainMenuTemplate()))
    }
    Root.on("closed", () => 
    {
        Root = null
        closeApp()
    })
})

app.on("window-all-closed", () => closeApp())

function closeApp()
{
    app.quit()
    return
}