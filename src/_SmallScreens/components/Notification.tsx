import { useEffect } from "react"
interface Props {
	notification: string
	setNotification: React.Dispatch<React.SetStateAction<string>>
}

export default function Notification({ notification, setNotification }: Props) {
	useEffect(() => {
		if (notification) {
			let time = setTimeout(() => {
				setNotification(" ")
			}, 3000)
			return () => clearTimeout(time)
		}
	}, [notification])
	return <div className={notification !== " " ? styles.notification : styles.notificationDesactive}>{notification !== " " ? notification : "_"}</div>
}

const styles = {
	notificationDesactive: "text-lg font-semibold text-center p-1",
	notification: "text-center text-red-600 text-lg font-semibold rounded-md p-1",
}
