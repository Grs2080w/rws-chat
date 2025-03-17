import { useEffect } from "react"
import { Socket } from "socket.io-client"

interface Props {
	keyPressed: boolean
	setKeyPressed: React.Dispatch<React.SetStateAction<boolean>>
	server: React.RefObject<Socket | null>
}

export default function useDelayToKeyPressed({ keyPressed, setKeyPressed, server }: Props) {
	useEffect(() => {
		if (keyPressed) {
			server.current?.emit("userTyping")
			setKeyPressed(false)
		}
	}, [keyPressed])
}
