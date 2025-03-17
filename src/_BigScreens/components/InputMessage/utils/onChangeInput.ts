interface Params {
	e: React.ChangeEvent<HTMLTextAreaElement>
	setValueInput: React.Dispatch<React.SetStateAction<string>>
}

function onChangeInput({ e, setValueInput }: Params) {
	setValueInput(e.target.value)
}

export default onChangeInput
