import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Components
import Notification from "../Notification"

// Utils
import onSubmit from "./utils/onSubmit"

interface Props {
	setNameUser: React.Dispatch<React.SetStateAction<string>>
	setRooms: React.Dispatch<React.SetStateAction<string[]>>
}

export default function EntryRoom({ setNameUser, setRooms }: Props) {
	const [roomimput, setRoomimput] = useState<string>("")
	const [nameInput, setnameInput] = useState<string>("")
	const [notification, setNotification] = useState<string>(" ")

	const navigate = useNavigate()

	return (
		<div className={styles.container}>
			<div className={styles.textCenter}>
				<Notification notification={notification} setNotification={setNotification} />
				<form onSubmit={(e) => onSubmit({ e, roomimput, nameInput, setNameUser, setRooms, setNotification, navigate })}>
					<div className={styles.form}>
						<input required autoComplete="off" value={nameInput} onChange={(e) => setnameInput(e.target.value.toLowerCase())} placeholder="Call's Name" type="text" name="name" className={styles.input} />
					</div>

					<div>
						<div className={styles.form}>
							<input required autoComplete="off" value={roomimput} onChange={(e) => setRoomimput(e.target.value)} placeholder="Room Code" type="text" name="room" className={styles.input} />
						</div>
						<div className={styles.formButton}>
							<button type="submit" className={styles.submitButton}>
								Login
							</button>
						</div>
					</div>
				</form>

				<p
					onClick={() => {
						navigate("/create")
					}}
					className={styles.createRoomLink}
				>
					Create a room
				</p>
			</div>
		</div>
	)
}

const styles = {
	container: "flex justify-center items-center w-full h-[100vh]",
	textCenter: "text-center",
	form: "form",
	input: "text-[20px] p-2 bg-white border-0 outline-0 rounded-[10px] h-[30px] w-[100%] mt-2",
	formButton: "div-form-button",
	submitButton: "bg-pink-600 border-0 cursor-pointer p-0.5 rounded-[7px] text-white text-[20px] mt-1.5 hover:bg-pink-700 active:bg-pink-800",
	createRoomLink: "text-[18px] text-blue-800 font-bold cursor-pointer mt-5 font-mono hover:text-purple-800 hover:cursor-pointer hover:underline",
}
