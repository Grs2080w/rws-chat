import { NavigateFunction } from "react-router-dom"

interface Props {
	e?: React.FormEvent<HTMLFormElement>
	setNameUser: React.Dispatch<React.SetStateAction<string>>
	setRooms: React.Dispatch<React.SetStateAction<string[]>>
	setNotification: React.Dispatch<React.SetStateAction<string>>
	nameInput: string
	roomimput: string
	navigate: NavigateFunction
}

export default function onSubmit({ e, setNameUser, setRooms, setNotification, nameInput, roomimput, navigate }: Props) {
	e && e.preventDefault()
	setNameUser(nameInput!)

	fetch(`${import.meta.env.VITE_URL_SOCKET}/${roomimput}/new/${nameInput}`)
		.then((res) => res.json())
		.then(({ status }) => {
			if (!(status === "ok")) {
				setNotification(status)
			} else {
				setRooms([roomimput])
				navigate("/room")
			}
		})
		.catch((err) => {
			setNotification(err.message)
			console.log(err)
		})
}
