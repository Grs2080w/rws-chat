export default function copyToClipboard(rooms: string[]) {
	navigator.clipboard.writeText(rooms[0])
}
