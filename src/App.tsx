import { useState, useRef } from "react"
import Chat from "./components/Chat"
import GetName from "./components/GetName"

function App() {
	const [nameUser, setNameUser] = useState("")
	const nameOfUser = useRef("")

	if (nameUser) {
		nameOfUser.current = nameUser
	}

	return (
		<>
			{!nameUser && !nameOfUser.current && <GetName setNameUser={setNameUser} />}
			{nameOfUser.current && <Chat nameOfUser={nameOfUser} />}
		</>
	)
}

export default App
