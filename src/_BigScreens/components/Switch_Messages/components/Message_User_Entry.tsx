import { dataEntryUser } from "../../../../types/types"

interface Props {
	message: dataEntryUser
}

export default function Message_User_Entry({ message }: Props) {
	let style = {
		container: "m-1 text-center text-sm p-0 font-semibold bg-green-400 rounded-sm text-black",
		message: "text-center text-sm p-0.5 font-semibold",
	}

	return (
		<div className={style.container}>
			<div className={style.message}>{message.name} in</div>
		</div>
	)
}
