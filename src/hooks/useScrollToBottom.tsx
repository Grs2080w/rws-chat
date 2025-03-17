import { useEffect } from "react"
import { Message } from "../types/types"

interface Props {
	screenMessageRef: React.RefObject<HTMLDivElement | null>
	messages: Message[]
	someOnekeyPressed: boolean
}

export default function useScrollToBottom({ screenMessageRef, messages, someOnekeyPressed }: Props) {
	useEffect(() => {
		if (screenMessageRef.current) {
			screenMessageRef.current.scrollTop = screenMessageRef.current.scrollHeight
		}
	}, [messages, someOnekeyPressed])
}
