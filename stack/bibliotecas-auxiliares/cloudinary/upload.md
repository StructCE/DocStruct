---
order: b
icon: upload
label: "Fazendo uploads"
author:
  - name: Willyan Marques
    avatar: ../../assets/membros/gata_do_will.png
date: 2024-04-04
category: Bibliotecas
tags:
  - Bibliotecas
  - Imagem
  - Upload
  - Nuvem
---

# Upload de imagens

A Cloudinary oferece várias formas de fazer upload de arquivos, inclusive um componente de botão de upload pronto chamado `CldUploadButton`, basta importá-lo e utilizá-lo imediatamente no seu projeto para ter acesso ao widget para upload de imagens padrão.

Caso você queira configurar e customizar melhor esse widget, você precisará utilizar outro componente chamado `CldUploadWidget`. Esse componente é um wrapper que pode ser usado em componentes próprios e oferece maior flexibilidade para o dev.

Para utilizá-lo, você precisa passar o caminho da sua rota de API do cloudinary dentro do parâmetro `signatureEndpoint` do componente. Você também pode passar um parâmetro `options`, com as opções de personalização do seu widget.

No exemplo abaixo criamos um componente de botão para upload de até 5 arquivos de imagem que podem vir do dispositivo, da internet, da câmera (tirar foto) ou do Google Drive.

```node src/components/ImgUploadButton.tsx
"use client";
import { CldUploadWidget } from "next-cloudinary";

const ImgUploadButton = () => {
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary"
      options={{
        resourceType: "image",
        sources: ["local", "url", "camera", "google_drive"],
        multiple: true,
        maxFiles: 5,
      }}
    >
      {({ open }) => {
        return <button onClick={() => open()}>Upload an Image</button>;
      }}
    </CldUploadWidget>
  );
};
export default ImgUploadButton;
```

!!!
Podemos utilizar a prop `publicId` no upload de arquivos para conseguirmos acessá-los posteriormente de forma simplificada. Por exemplo, você pode definir um padrão de id público que utiliza o username de um usuário qualquer, assim quando quisermos pegar imagens para esse usuário, podemos criar um id dinâmico para isso.
!!!

Além das opções do exemplo, você também é capaz de cortar imagens, definir formatos de arquivos, tamanho máximo de upload, compressão, criptografia, etc. Saiba mais sobre cada uma e seus usos na [documentação do cloudinary widget](https://cloudinary.com/documentation/upload_widget_reference#upload_parameters).
