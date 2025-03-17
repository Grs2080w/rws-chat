import { dataMessage } from "../../types"

interface Props {
	message: dataMessage
}

export default function Message_Chat({ message }: Props) {
	if (message.message == "") {
		return <div className="rounded-full w-1 h-1"></div>
	} else {
		return (
			<div className={styles.main}>
				<div className={styles.first}>
					<div className={styles.message}>{message.type == "message" && message.message}</div>
					<div className={styles.hours}>{message.message && message.hours}</div>
				</div>
			</div>
		)
	}
}

const styles = {
	main: "bg-amber-50 text-black text-[20px] max-w-[80%] rounded-[5px] p-1 m-0.5",
	first: "flex items-end justify-between",
	message: "w-[90%] break-words",
	hours: "text-[10px] flex justify-center w-10 font-mono font-bold",
}
