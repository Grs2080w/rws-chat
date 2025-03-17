import { useEffect } from "react"

export default function useTimeOut({ conversation, server }: any) {
	useEffect(() => {
		let firstTimeOut = setTimeout(() => {
			server.current?.emit("UserOffline")
		}, 300000)

		return () => clearTimeout(firstTimeOut)
	}, [conversation.current])
}
