import { Message } from "../../types/types"
import { Socket } from "socket.io-client"

import Switch_Messages from "./Switch_Messages/Index"
import InputMessage from "./InputMessage/Index"

import gif from "../../assets/3dots.gif"

interface Props {
	screenMessageRef: React.RefObject<HTMLDivElement | null>
	nameOfUser: React.RefObject<string>
	conversation: React.MutableRefObject<Message[]>
	someOnekeyPressed: boolean
	messages: Message[]
	server: React.RefObject<Socket | null>
	setNotification: React.Dispatch<React.SetStateAction<string>>
}

export default function ViewAndInput({ screenMessageRef, nameOfUser, conversation, someOnekeyPressed, messages, server, setNotification }: Props) {
	return (
		<div className={styles.main}>
			<div ref={screenMessageRef} className={styles.screenMessage}>
				<div className={styles.messageContainer}>
					{conversation.current.map((message, index) => {
						return (
							<div key={index} className={message?.type == "entry" || message?.type == "exit" ? styles.userEntry : message.name == nameOfUser.current ? styles.myContainerMessage : styles.friendContainerMessage}>
								<Switch_Messages message={message} nameOfUser={nameOfUser} />
							</div>
						)
					})}

					{someOnekeyPressed && <img className={styles.typingIndicator} src={gif}></img>}
				</div>
			</div>

			<InputMessage nameOfUser={nameOfUser} server={server} messages={messages} setNotification={setNotification} />
		</div>
	)
}

const styles = {
	main: "w-[45%] absolute top-[calc(15vh)] left-[calc(4vw)]",
	screenMessage: "w-full h-[60vh] p-3 overflow-y-scroll z-10 absolute bg-gray-900 rounded-lg",
	messageContainer: "bg-transparent flex flex-col justify-end",
	userEntry: "userEntry",
	myContainerMessage: "my-containerMessage",
	friendContainerMessage: "friend-containerMessage",
	typingIndicator: "w-12 rounded-2xl m-1 text-center bg-gray-800",
}
