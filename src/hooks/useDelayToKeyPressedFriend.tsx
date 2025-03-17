import { useEffect } from "react"

interface Props {
	setsomeOnekeyPressed: React.Dispatch<React.SetStateAction<boolean>>
	someOnekeyPressed: boolean
}

export default function useDelayToKeyPressedFriend({ setsomeOnekeyPressed, someOnekeyPressed }: Props) {
	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>

		if (someOnekeyPressed) {
			timeoutId = setTimeout(() => {
				setsomeOnekeyPressed(false)
			}, 1000)
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
		}
	}, [someOnekeyPressed])
}
