import { useState, useRef } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import EntryRoom from "./_BigScreens/components/EntryRoom/EntryRoom"
import Create_View from "./_BigScreens/components/Create_View/Create_View"
import Chat from "./_BigScreens/components/Chat"

function App() {
	const [nameUser, setNameUser] = useState("")
	const [rooms, setRooms] = useState<string[]>([])
	const nameOfUser = useRef("")

	if (nameUser) {
		nameOfUser.current = nameUser
	}

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<EntryRoom setNameUser={setNameUser} setRooms={setRooms} />} />
					<Route path="/create" element={<Create_View setNameUser={setNameUser} setRooms={setRooms} />} />
					<Route path="/room" element={<Chat rooms={rooms} nameOfUser={nameOfUser} />} />
					<Route path="*" element={<EntryRoom setNameUser={setNameUser} setRooms={setRooms} />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
