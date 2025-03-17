import { useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { Images } from "lucide-react"

// types
import { Message } from "../../../types/types"

// utils
import handleKeyDown from "./utils/handleKeyDown"
import onChangeInput from "./utils/onChangeInput"
import getBinaryImage from "./utils/getBinaryImage"
import onSubmitMessage from "./utils/onSubmitMessage"

// Components
import ButtonMessage from "./ButtonMessage"
import ButtonMessageWithImage from "./ButtonMessageWithImage"

interface Props {
	messages: Message[]
	nameOfUser: React.RefObject<string>
	server: React.RefObject<Socket | null>
	setNotification: React.Dispatch<React.SetStateAction<string>>
}

export default function InputMessage({ nameOfUser, server, messages, setNotification }: Props) {
	const inputMessageRef = useRef<HTMLTextAreaElement>(null)
	const inputPhotoRef = useRef<HTMLInputElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const [valueInput, setValueInput] = useState("")
	const [inputFileValue, setInputFileValue] = useState("")

	let valueMessage = inputFileValue ? inputFileValue : valueInput

	return (
		<form onSubmit={(e) => onSubmitMessage({ e, nameOfUser, server, valueMessage, setValueInput, messages, setNotification, inputMessageRef, setInputFileValue })} className={styles.form}>
			<input ref={inputPhotoRef} id="photo" onChange={() => getBinaryImage({ inputPhotoRef, setInputFileValue })} type="file" name="" />

			{inputFileValue ? (
				<div className={styles.imagePreviewContainer}>
					<img className={styles.imagePreview} src={inputFileValue} alt="" />
				</div>
			) : (
				<textarea placeholder="Type your Message" ref={inputMessageRef} onKeyDown={(e) => handleKeyDown({ event: e, buttonRef })} name="messageInput" value={valueInput} onChange={(e) => onChangeInput({ e, setValueInput })} autoComplete="off" className={styles.textarea} autoFocus></textarea>
			)}

			{valueMessage ? (
				inputFileValue ? (
					<ButtonMessageWithImage buttonRef={buttonRef} />
				) : (
					<ButtonMessage buttonRef={buttonRef} />
				)
			) : (
				<label htmlFor="photo" className={styles.photoLabel}>
					<Images id="icon-button-message" color="white" strokeWidth={2} size={30} width={22} />
				</label>
			)}
		</form>
	)
}

const styles = {
	form: "flex justify-between items-center w-[100%] mt-1 absolute top-[63vh]",
	imagePreviewContainer: "bg-gray-400 w-[calc(93%)] p-1.5 flex justify-start items-center rounded-[20px] z-20 absolute bottom-[-40px] left-0 transition-all",
	imagePreview: "w-[30vw] h-[30vh] rounded-2xl",
	textarea: "bg-white border-0 outline-0 w-[calc(92%)] rounded-[20px] h-[40px] mt-1 pl-4 pt-0.5",
	photoLabel: "bg-pink-600 border-0 cursor-pointer rounded-full w-10 h-10 flex justify-center items-center hover:bg-pink-700",
}
