import { useEffect, useState, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { NavigateFunction } from "react-router-dom"
import { Message, dataEntryUser, dataExitUser, User } from "../../types/types"

interface Props {
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>
	usersOnline: React.MutableRefObject<User[]>
	conversation: React.MutableRefObject<Message[]>
	nameOfUser: React.RefObject<string>
	rooms: string[]
	setsomeOnekeyPressed: React.Dispatch<React.SetStateAction<boolean>>
	server: React.RefObject<Socket | null>
	navigate: NavigateFunction
}

export default function useConnectServer({ setMessages, usersOnline, conversation, nameOfUser, rooms, setsomeOnekeyPressed, server, navigate }: Props) {
	const [count] = useState(0)
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		const socket: Socket<any, any> = io(import.meta.env.VITE_URL_SOCKET, {
			path: "/ws",
			query: {
				name: nameOfUser.current,
				rooms,
			},

			transports: ["websocket"],
		})

		socket.on("disconnect", (reason) => {
			navigate("/")
			window.location.reload()
			console.log(`Client disconnect: ${reason}`)
		})

		socket.on("message", (message: dataEntryUser | dataExitUser) => {
			setsomeOnekeyPressed(false)

			switch (message.type) {
				case "entry":
					usersOnline.current = [...usersOnline.current, { name: message.name, id: message.id }]
					break
				case "exit":
					usersOnline.current = usersOnline.current.filter((user) => user.name != message.name)
					break
			}

			conversation.current = [...conversation.current, message]
			setMessages(conversation.current)
		})

		socket.on("connect_error", (reason) => {
			navigate("/")
			window.location.reload()
			console.log(`Client connect_error: ${reason}`)
		})

		socket.on("missingMessagesAndLogs", ({ id }: { id: string }) => {
			socket.emit("sendMessagesAndLogs", { messages: conversation.current, logs: usersOnline.current, idUser: id })
		})

		socket.on("updatedLogsAndMessages", (data: any) => {
			usersOnline.current = [...usersOnline.current, ...data.logs]
			conversation.current = [...conversation.current, ...data.messages]
			setMessages(conversation.current)
		})

		socket.on("userTyping", () => {
			setsomeOnekeyPressed(true)
		})

		server.current = socket
	}, [count])
}
