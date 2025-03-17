interface Users {
	name: string
	id: string
}

interface Props {
	usersOnline: Users[]
}

export default function UsersLogView({ usersOnline }: Props) {
	const logsSet: Set<string> = new Set(usersOnline.map((user) => user.name.toLowerCase()))
	const logsArray: string[] = Array.from(logsSet)

	return (
		<div className="text-white rounded-[10px] p-2.5 w-[350px] h-[56vh] overflow-x-hidden">
			<div className="text-center text-2xl font-mono m-2.5">Users Connected </div>

			<div className="grid grid-cols-2 gap-2.5 max-w-[100%] overflow-hidden p-2.5 items-center">
				{logsArray.map((user, index) => (
					<div key={index} className="bg-slate-800 p-2.5 rounded-[10px] flex justify-between items-center  h-[50px] m-1">
						<div className="text-white font-mono text-[20px] mr-2">{user}</div>
						<div className="bg-green-500 w-3 h-3 rounded-full"></div>
					</div>
				))}
			</div>
		</div>
	)
}
