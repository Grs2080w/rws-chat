import { dataExitUser } from "../../../../types/types"

interface Props {
	message: dataExitUser
}

export default function Message_User_Exit({ message }: Props) {
	let style = {
		container: "m-1 text-center text-sm font-semibold bg-red-600 rounded-md text-black",
		message: "text-center text-sm p-0.5 font-semibold",
	}

	return (
		<div className={style.container}>
			<div className={style.message}>{message.name} out</div>
		</div>
	)
}
