interface Props {
	inputPhotoRef: React.RefObject<HTMLInputElement | null>
	setInputFileValue: React.Dispatch<React.SetStateAction<string>>
}

export default function getBinaryImage({ inputPhotoRef, setInputFileValue }: Props) {
	let files = inputPhotoRef.current?.files

	let photo = files![0]

	let readPhoto = new FileReader()
	readPhoto.readAsDataURL(photo)

	readPhoto.onload = function (e) {
		let photoLoaded = e.target!.result
		setInputFileValue(photoLoaded as string)
	}
}
