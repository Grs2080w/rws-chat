import { useRef, useState } from "react"
import { Socket } from "socket.io-client"

// types
import { Message } from "../../../types/types"

// utils
import handleKeyDown from "./utils/handleKeyDown"
import onChangeInput from "./utils/onChangeInput"
import getBinaryImage from "./utils/getBinaryImage"
import onSubmitMessage from "./utils/onSubmitMessage"

// Components
import ButtonMessage from "./ButtonMessage"

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

	function onSubmitMessageUser() {
		onSubmitMessage({ nameOfUser, server, valueMessage, setValueInput, messages, setNotification, inputMessageRef, setInputFileValue })
	}

	return (
		<div className={styles.form}>
			<input ref={inputPhotoRef} id="photo" onChange={() => getBinaryImage({ inputPhotoRef, setInputFileValue })} type="file" name="" />

			<textarea placeholder="Type your Message" ref={inputMessageRef} onKeyDown={(e) => handleKeyDown({ event: e, buttonRef })} name="messageInput" value={valueInput} onChange={(e) => onChangeInput({ e, setValueInput })} autoComplete="off" className={styles.textarea} autoFocus></textarea>

			<ButtonMessage buttonRef={buttonRef} onSubmitMessage={onSubmitMessageUser} />
		</div>
	)
}

const styles = {
	form: "flex justify-between items-center w-[95%] mt-1 absolute top-[77vh]",
	textarea: "bg-white border-0 outline-0 w-[calc(88%)] rounded-[20px] h-[40px] mt-1 pl-4 pt-0.5",
}
