import React from "react"

export default function App()
{
    return(
        <>
            <h1>App</h1>
            <button onClick={() => electron.notificationApi.sendNotification("Halo Rombax Family")}>Show Notification</button>
        </>
    )
}