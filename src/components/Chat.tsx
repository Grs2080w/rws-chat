import { RefObject } from "react"
import { io, Socket } from "socket.io-client"
import { useEffect, useRef, useState, ChangeEvent } from "react"

import { SendHorizontal } from "lucide-react"

interface Message {
	name: string | undefined
	message: string
	type?: UserEntryType
	id?: string
}

type UserEntryType = "entry" | "exit"

interface UserControl {
	name?: string
	type?: UserEntryType
	id?: string
}

export default function Chat({ nameOfUser }: { nameOfUser: RefObject<string> }) {
	const server = useRef<Socket | null>(null)
	const conversation = useRef<Message[]>([])
	const [messages, setMessages] = useState<Message[]>([])
	const buttonRef = useRef<HTMLButtonElement>(null)
	const usersControlLog = useRef<UserControl[]>([])

	const [notification, setNotification] = useState(" ")

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter") {
			buttonRef.current?.click()
		}
	}

	useEffect(() => {
		if (notification) {
			setTimeout(() => {
				setNotification(" ")
			}, 3000)
		}
	}, [notification])

	const [valueInput, setValueInput] = useState("")
	console.log(messages)
	console.log(usersControlLog)

	function onChangeInput(e: ChangeEvent<HTMLTextAreaElement>) {
		setValueInput(e.target.value)
	}

	const screenMessageRef = useRef<HTMLDivElement>(null)

	const [count] = useState(0)
	const isFirstRender = useRef(true) // Ref para controlar a primeira renderização

	useEffect(() => {
		if (screenMessageRef.current) {
			screenMessageRef.current.scrollTop = screenMessageRef.current.scrollHeight
		}
	}, [messages])

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false // Marca que a primeira renderização já aconteceu
			return
		}

		const socket: Socket<any, any> = io("https://taylor-warrant-pastor-ent.trycloudflare.com")

		socket.on("connect", () => {
			socket.emit("userEntry", {
				name: nameOfUser.current,
			})
		})

		socket.on("disconnect", (reason) => console.log(`Client disconnected: ${reason}`))

		socket.on("message", (message: Message) => {
			if (message.type === "entry") {
				console.log("user entry", message)

				usersControlLog.current = [...usersControlLog.current, { name: message.name, id: message.id }]
				conversation.current = [...conversation.current, message]
				setMessages(conversation.current)
			} else if (message.type === "exit") {
				console.log("user exit", message)
				usersControlLog.current.forEach((user) => {
					console.log("user id", user)
					console.log("message id", message)

					if (user.id === message.id) {
						console.log("log do user quando sai", user)
						setMessages([...messages, { ...message, name: user.name }])
						conversation.current = [...conversation.current, { ...message, name: user.name }]
						usersControlLog.current = usersControlLog.current.filter((user) => user.id !== message.id)
					}
				})
			} else {
				conversation.current = [...conversation.current, message]
				setMessages(conversation.current)
			}
		})

		socket.on("connect_error", (reason) => console.log(`Client connect_error: ${reason}`))

		server.current = socket
	}, [count])

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const messageOnUpload = {
			name: nameOfUser.current,
			message: valueInput,
		}

		if (server.current) {
			setValueInput("")

			if (messageOnUpload.message === "") {
				setNotification("Vai enviar o quê se tá vazio?")
			}

			if (messages[messages.length - 1]?.name !== messageOnUpload.name) {
				server.current.emit("message", {
					name: nameOfUser.current,
					message: "",
				})
			}

			messageOnUpload.message !== "" && server.current.emit("message", messageOnUpload)

			setTimeout(() => {
				setValueInput("")
			}, 1)
		}
	}

	return (
		<div id="body">
			<div id="container">
				<h4>{`Bem vindo ${nameOfUser.current}`}</h4>
				<div ref={screenMessageRef} id="containerMessageScreen">
					<div id="screenMessage">
						{conversation.current.map((message) => {
							return (
								<div className={message?.type == "entry" || message?.type == "exit" ? "userEntry" : message.name == nameOfUser.current ? "my-containerMessage" : "friend-containerMessage"}>
									<div key={message.message} className={message?.type == "entry" ? "MessageEntry" : message?.type == "exit" ? "MessageEntryExit" : message.name == nameOfUser.current ? "myMessage" : "messageFriend"}>
										{message.type === "entry" && !isFirstRender.current ? (
											<div className="userEntry">{message.name} entrou</div>
										) : message.type === "exit" ? (
											<div className="userEntry">{message.name} saiu</div>
										) : message.message !== "" && message.name !== nameOfUser.current ? (
											<>
												<div className="nameMessageUser">{message.name}</div>
												<div>{message.message}</div>
											</>
										) : (
											<div>{message.message}</div>
										)}
									</div>
								</div>
							)
						})}
					</div>
				</div>

				<form onSubmit={onSubmit} id="formMessage">
					<textarea onKeyDown={handleKeyDown} name="messageInput" value={valueInput} onChange={onChangeInput} autoComplete="off" id="inputMessage" autoFocus></textarea>

					<button ref={buttonRef} id="buttonMessage" type="submit">
						<SendHorizontal strokeWidth={2.3} size={20} width={22} color="white" />
					</button>
				</form>

				<div id={notification == " " ? "notificationDesactive" : "notification"}>{notification !== " " ? notification : "_"}</div>
			</div>
		</div>
	)
}
