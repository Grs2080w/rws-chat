import { useEffect } from "react"

const useKeyPress = (setKeyPressed: React.Dispatch<React.SetStateAction<boolean>>) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter" || event.key === "Shift") {
				setKeyPressed(false)
			} else {
				setKeyPressed(true)
			}
		}

		window.addEventListener("keydown", handleKeyDown)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [])
}

export default useKeyPress
