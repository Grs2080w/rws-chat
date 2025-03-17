interface dataEntryUser {
	name: string
	type: "entry"
	id: string
}

interface dataExitUser {
	type: "exit"
	id: string
	name?: string
}

interface dataMessage {
	name: string
	message: string
	type: "message" | "image"
	hours: string
}

interface User {
	name: string
	id: string
}

type type_Message = dataEntryUser | dataExitUser | dataMessage

interface UserControl {
	name: string
	id: string
}

type Message = dataEntryUser | dataExitUser | dataMessage

export type { dataEntryUser, dataExitUser, dataMessage, UserControl, type_Message, User, Message }