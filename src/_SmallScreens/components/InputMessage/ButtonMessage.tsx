import { SendHorizontal } from "lucide-react"
import React from "react"

interface Props {
	buttonRef: React.RefObject<HTMLButtonElement | null>
	onSubmitMessage: () => void
}

export default function ButtonMessage({ buttonRef, onSubmitMessage }: Props) {
	return (
		<button onClick={() => onSubmitMessage()} ref={buttonRef} id="buttonMessage" className={styles.button}>
			<SendHorizontal color="white" strokeWidth={2} size={23} width={26} />
		</button>
	)
}

const styles = {
	button: "bg-pink-600 border-0 cursor-pointer rounded-full w-10 h-10 absolute bottom-[2px] right-[0px] flex justify-center items-center",
}
