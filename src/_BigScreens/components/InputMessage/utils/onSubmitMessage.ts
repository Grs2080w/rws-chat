import { Dispatch, RefObject, SetStateAction } from "react"
import { Socket } from "socket.io-client"
import { Message } from "../../../../types/types"

interface Params {
	e: React.FormEvent<HTMLFormElement>
	nameOfUser: RefObject<string>
	server: RefObject<Socket | null>
	valueMessage: string | RefObject<HTMLInputElement | null>
	setValueInput: Dispatch<SetStateAction<string>>
	messages: Message[]
	setNotification: Dispatch<SetStateAction<string>>
	inputMessageRef: RefObject<HTMLTextAreaElement | null>
	setInputFileValue: Dispatch<SetStateAction<string>>
}

const onSubmitMessage = ({ e, nameOfUser, server, valueMessage, setValueInput, messages, setNotification, inputMessageRef, setInputFileValue }: Params) => {
	e.preventDefault()

	const messageOnUpload = {
		name: nameOfUser.current,
		message: valueMessage,
	}

	if (server.current) {
		setValueInput("")

		if (valueMessage === "") {
			setNotification("Type an message to send")
		}

		if (messages[messages.length - 1]?.name !== messageOnUpload.name) {
			server.current.emit("message", {
				name: nameOfUser.current,
				message: "",
			})
		}

		valueMessage && server.current.emit("message", messageOnUpload)
		setInputFileValue("")

		inputMessageRef.current?.focus()

		setTimeout(() => {
			setValueInput("")
		}, 1)
	}
}

export default onSubmitMessage
