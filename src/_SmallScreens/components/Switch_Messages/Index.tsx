import { type_Message } from "../../../types/types"
import Message_Chat from "./components/Message_Chat"
import Message_Friend_Chat from "./components/Message_Friend_Chat"
import Message_User_Entry from "./components/Message_User_Entry"
import Message_User_Exit from "./components/Message_User_Exit"
import Message_Image from "./components/Message_image"

interface Props {
	message: type_Message
	nameOfUser: React.RefObject<string>
}

export default function Switch_Messages({ message, nameOfUser }: Props) {
	switch (message.type) {
		case "message":
			return message.message !== "" && message.name !== nameOfUser.current ? <Message_Friend_Chat message={message} /> : <Message_Chat message={message} />
		case "entry":
			return <Message_User_Entry message={message} />
		case "exit":
			return <Message_User_Exit message={message} />
		case "image":
			return <Message_Image message={message} nameOfUser={nameOfUser} />
	}
}
