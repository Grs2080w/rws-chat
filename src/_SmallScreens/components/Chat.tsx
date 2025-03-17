import { useRef, useState, RefObject, useEffect } from "react"
import { Socket } from "socket.io-client"
import { useNavigate } from "react-router-dom"
import { Copy } from "lucide-react"

// Components
import ViewAndInput from "./ViewAndInput"

import copyToClipboard from "./utils/copyToClipboard"

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

const style = {
	container: "flex justify-between w-full h-full",
	roomInfo: "text-white flex w-full justify-center font-mono font-semibold mt-6 active:text-gray-500",
	copyIcon: "ml-1",
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
		<div className={style.container}>
			<div onClick={() => copyToClipboard(rooms)} className={style.roomInfo}>
				{rooms[0]}
				<Copy size={20} className={style.copyIcon} onClick={() => navigator.clipboard.writeText(rooms[0])} />
			</div>
			<ViewAndInput conversation={conversation} messages={messages} someOnekeyPressed={someOnekeyPressed} nameOfUser={nameOfUser} server={server} setNotification={setNotification} screenMessageRef={screenMessageRef} />
		</div>
	)
}
