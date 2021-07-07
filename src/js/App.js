import React from "react"

export default function App()
{
    return(
        <>
            <h1>App</h1>
            <button onClick={() => electron.notificationApi.sendNotification("HOLA ROMBAX")}>OKE</button>
        </>
    )
}