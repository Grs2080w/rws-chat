import { dataMessage } from "../../../../types/types"
//messageFriend
interface Props {
	message: dataMessage
}
export default function Message_Friend_Chat({ message }: Props) {
	if (message.message == "") {
		return <div className=" bg-amber-500 rounded-full w-3 h-3"></div>
	} else {
		return (
			<div className={styles.main}>
				<div className={styles.first}>{message.name}</div>
				<div className={styles.second}>
					<div className={styles.message}>{message.type == "message" && message.message}</div>
					<div className={styles.hours}>{message.message && message.hours}</div>
				</div>
			</div>
		)
	}
}

const styles = {
	main: "text-white bg-gray-800 rounded-[10px] m-0.5 pr-2 p-1 max-w-[80%]",
	first: "text-[15px] font-semibold text-left ml-1 mb-1",
	second: "flex items-end justify-between",
	message: "w-[80%] break-words  text-[20px] ml-1",
	hours: "text-[10px] flex justify-center w-10 font-mono font-bold",
}
