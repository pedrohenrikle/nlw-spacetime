'use client' // Diz para o React que esse componente deve carregar o JS para o clientside

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  // Pega o arquivo de foto, gera uma url e já exibe ela abaixo do campo
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <input
        type="file"
        id="media"
        name="coverUrl"
        onChange={onFileSelected}
        className="invisible h-0 w-0"
        accept="image/*"
      />

      {/* Exibe a imagem selecionada */}
      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
