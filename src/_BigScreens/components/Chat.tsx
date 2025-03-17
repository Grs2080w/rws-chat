import { useRef, useState, RefObject, useEffect } from "react"
import { Socket } from "socket.io-client"
import { useNavigate } from "react-router-dom"

// Components
import ViewAndInput from "./ViewAndInput"
import ConectionsAndCode from "./ConectionsAndCode"

// Hooks
import useConnectServer from "../../hooks/Server/useConnectServer"
import useKeyPress from "../../hooks/useKeyPress"
import useDelayToKeyPressed from "../../hooks/useDelayToKeyPressed"
import useDelayToKeyPressedFriend from "../../hooks/useDelayToKeyPressedFriend"
import useScrollToBottom from "../../hooks/useScrollToBottom"
import useTimeOut from "../../hooks/useTimeOut"

// Types
import { Message, User } from "../../types/types"

interface Props {
	nameOfUser: RefObject<string>
	rooms: string[]
}

export default function Chat({ nameOfUser, rooms }: Props) {
	const navigate = useNavigate()

	const server = useRef<Socket | null>(null)
	const conversation = useRef<Message[]>([])
	const screenMessageRef = useRef<HTMLDivElement>(null)
	const usersOnline = useRef<User[]>([])

	const [messages, setMessages] = useState<Message[]>([])
	const [_notification, setNotification] = useState(" ")
	const [keyPressed, setKeyPressed] = useState(false)
	const [someOnekeyPressed, setsomeOnekeyPressed] = useState(false)

	useEffect(() => {
		if (nameOfUser.current == "" || rooms[0] == "") navigate("/")
	}, [nameOfUser, rooms])

	useKeyPress(setKeyPressed)
	useDelayToKeyPressed({ keyPressed, setKeyPressed, server })
	useDelayToKeyPressedFriend({ setsomeOnekeyPressed, someOnekeyPressed })
	useTimeOut({ conversation, server })
	useScrollToBottom({ screenMessageRef, messages, someOnekeyPressed })
	useConnectServer({ setMessages, usersOnline, conversation, nameOfUser, rooms, setsomeOnekeyPressed, server, navigate })

	return (
		<div className="flex justify-between w-full h-full">
			<ViewAndInput conversation={conversation} messages={messages} someOnekeyPressed={someOnekeyPressed} nameOfUser={nameOfUser} server={server} setNotification={setNotification} screenMessageRef={screenMessageRef} />

			<ConectionsAndCode rooms={rooms} usersOnline={usersOnline} />
		</div>
	)
}
