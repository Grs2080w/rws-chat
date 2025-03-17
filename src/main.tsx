import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./Big_App"
import Small_App from "./Small_App"

const windowGreaterThan1100 = window.innerWidth > 1100 ? true : false

createRoot(document.getElementById("root")!).render(<StrictMode>{windowGreaterThan1100 ? <App /> : <Small_App />}</StrictMode>)
