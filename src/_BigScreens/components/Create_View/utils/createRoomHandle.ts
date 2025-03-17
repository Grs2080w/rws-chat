import { NavigateFunction } from "react-router-dom"

interface Props {
	e: React.FormEvent<HTMLFormElement>
	setNameUser: React.Dispatch<React.SetStateAction<string>>
	setRooms: React.Dispatch<React.SetStateAction<string[]>>
	setNotification: React.Dispatch<React.SetStateAction<string>>
	nameInput: string
	navigate: NavigateFunction
}

export default function createRoomHandle({ e, setNameUser, setRooms, setNotification, nameInput, navigate }: Props) {
	e.preventDefault()
	let randomRoom = Math.floor(Math.random() * 1000000).toString()

	fetch(`${import.meta.env.VITE_URL_SOCKET}/rooms/create/${randomRoom}`)
		.then((res) => res.json())
		.then((data) => {
			if (data.err) {
				createRoomHandle({ e, setNameUser, setRooms, setNotification, nameInput, navigate })
			} else {
				setRooms([data.code])
				setNameUser(nameInput!)
				navigate(`/room`)
			}
		})
		.catch((err) => {
			console.log(err)
			setNotification(err.message)
		})
}
