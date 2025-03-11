export default function GetName({ setNameUser }: { setNameUser: React.Dispatch<React.SetStateAction<string>> }) {
	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setNameUser((e.currentTarget.elements.namedItem("name") as HTMLInputElement).value)
	}

	return (
		<div id="body">
			<div id="container">
				<form onSubmit={onSubmit}>
					<div className="form">
						<input required autoComplete="off" placeholder="Apelido" type="text" name="name" id="inputFormName" />
					</div>
					<div className="form">
						<button id="buttonFormName" type="submit">Entrar</button>
					</div>
				</form>
			</div>
		</div>
	)
}
