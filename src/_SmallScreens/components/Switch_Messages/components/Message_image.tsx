import { dataMessage } from "../../../../types/types"

interface Props {
	message: dataMessage
	nameOfUser: React.RefObject<string>
}

export default function Message_Image({ message, nameOfUser }: Props) {
	let myMessage = message.name !== nameOfUser.current

	let style = {
		main: "flex flex-col justify-between p-2 max-w-[40%] rounded-[10px] m-1" + (!myMessage ? " bg-amber-50" : " bg-gray-800"),
		name: "text-[15px] text-white font-semibold text-left ml-1 mb-2",
		imageContainer: "w-[85%]",
		image: "rounded-md",
		time: "text-[10px] w-full text-white flex justify-end font-mono font-bold",
	}

	return (
		<div className={style.main}>
			{myMessage && <div className={style.name}>{message.name}</div>}
			<div className={style.imageContainer}>
				<img src={message.message} className={style.image} alt="image" />
			</div>
			<div className={style.time}>{message.message && message.hours}</div>
		</div>
	)
}
