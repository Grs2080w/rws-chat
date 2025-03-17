export default function copyToClipboard(rooms: string[]) {
	navigator.clipboard.writeText(rooms[0])

	return window.alert("Room code copied successfully")
}
