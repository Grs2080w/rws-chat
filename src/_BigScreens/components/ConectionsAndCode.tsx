// Components
import UsersLogView from "./UsersLogView"

// Utils
import copyToClipboard from "./utils/copyToClipboard"

// Types
import { User } from "../../types/types"

interface Props {
	usersOnline: React.RefObject<User[]>
	rooms: string[]
}

export default function ConectionsAndCode({ usersOnline, rooms }: Props) {
	return (
		<div className={styles.container}>
			<UsersLogView usersOnline={usersOnline.current} />

			<div className={styles.roomCodeContainer}>
				<div className={styles.roomCodeTitle}>Room Code</div>
				<div className="flex">
					<div className={styles.roomCode}>{rooms[0]}</div>

					<div className={styles.copyButton} onClick={() => copyToClipboard(rooms)}>
						Copy
					</div>
				</div>
			</div>
		</div>
	)
}

const styles = {
	container: "w-[calc(fit-content)] p-2.5 flex flex-col items-center right-[calc(13vw)] absolute top-[12vh]",
	roomCodeContainer: "w-[300px] p-2.5 rounded-[10px] text-center",
	roomCodeTitle: "font-mono text-white text-2xl",
	roomCode: "w-[100%] bg-yellow-100 text-black font-mono text-xl mt-[20px] p-2.5 rounded-[10px] items-center flex justify-center",
	copyButton: "w-[100%] bg-white text-black font-mono text-xl mt-[20px] p-2.5 rounded-[10px] items-center flex justify-center ml-[10px] cursor-pointer hover:bg-gray-400",
}
