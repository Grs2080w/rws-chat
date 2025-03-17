import { useNavigate } from "react-router-dom"
import { useState } from "react"

// Utils
import createRoomHandle from "./utils/createRoomHandle"

// Components
import Notification from "../Notification"

interface Props {
	setNameUser: React.Dispatch<React.SetStateAction<string>>
	setRooms: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Create_View({ setNameUser, setRooms }: Props) {
	const [nameInput, setnameInput] = useState<string>("")
	const [notification, setNotification] = useState<string>(" ")
	const navigate = useNavigate()

	return (
		<div className={styles.container}>
			<div className={styles.textCenter}>
				<Notification notification={notification} setNotification={setNotification} />
				<form onSubmit={(e) => createRoomHandle({ e, setNameUser, setRooms, setNotification, nameInput, navigate })}>
					<div>
						<input required autoComplete="off" value={nameInput} onChange={(e) => setnameInput(e.target.value.toLowerCase())} placeholder="Call's Name" type="text" name="name" className={styles.input} />
					</div>
					<div className={styles.formButton}>
						<button type="submit" className={styles.submitButton}>
							Create Room
						</button>
					</div>
				</form>

				<p
					onClick={() => {
						navigate("/")
					}}
					className={styles.enterRoomLink}
				>
					Entry on a existing room
				</p>
			</div>
		</div>
	)
}

const styles = {
	container: "flex justify-center items-center w-full h-[100vh]",
	textCenter: "text-center",
	input: "text-[20px] p-1 bg-white border-0 outline-0 rounded-[10px] h-[30px] w-[100%] mt-2",
	formButton: "mt-2",
	submitButton: "bg-pink-600 border-0 cursor-pointer p-0.5 rounded-[7px] text-white text-[20px] mt-1.5 hover:bg-pink-700 active:bg-pink-800",
	enterRoomLink: "text-[18px] text-blue-800 font-bold cursor-pointer mt-5 font-mono hover:text-purple-800 hover:cursor-pointer hover:underline",
}
