interface Params {
	event: React.KeyboardEvent<HTMLTextAreaElement>
	buttonRef: React.RefObject<HTMLButtonElement | null>
}

const handleKeyDown = ({ event, buttonRef }: Params) => {
	if (event.key === "Enter") {
		if (buttonRef.current) {
			buttonRef.current.click()
		}
	}
}

export default handleKeyDown
