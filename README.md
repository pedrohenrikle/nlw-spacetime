# Desenvolvimento da NLW - Spacetime
O aplicativo que será montado é uma capsula do tempo, utilizando React Next13 Tailwind, Prisma, Fastify, SQLite, Node.js,, Typescript, entre muitas outras techs! Abaixo vai ser um resumo do passo a passo do desenvolvimento da aplicação. Vamos desenvolver tanto uma versão para web quanto para mobile, ambos com bancos de dado e back ed

# Aula 1 - Iniciando o Projeto
Para criar um projeto usamos: 

```cmd
 mkdir server
 md server
 code .
```

Logo após:

```
npm init -y
```

Com isso, começamos a instalar as dependencias

```
npm i typescript -D
npm i @types/node -D
npm i fastify
```
Para configurar o typescript no nosso projeto, rodamos um:

```
npx tsc --init
```

e por fim, quando abrirmos o tsconfig, mudamos para o es2020 (EcmaScript).

## Criando a API
Dentro de src -> server.ts, iniciamos um servidor com

```js
const app = fastify()
```

Após isso, utilizamos um `listen`:

```js
app.listen({
  port: 3333,,
}).then(() => {
  console.log('HTTP server running on http://localhost:3333)
})
```

Para iniciarmos a criar as rotas usamos os HTTP methods como funções, então para criar uma rota `GET` utilizamos:

```js
app.get('/hello', () => {
  return 'Hello World'
})
``` 

## Implementação do ESLint
Para isso, instalamos o eslint como dependencia de desenvolvimento, além de baixar tembém a configuração padrão da Rocketseat:

```
npm install eslint -D
npm install @rocketseat/eslint-config -D
```

e por fim adicionamos ao `package.json` um script chamado "lint":

```json
  "lint": "eslint src --ext .ts --fix"
```

## Adicionando o Prisma
Para instalar o prisma, basta utilizarmos o:

```
npm install prisma -D
```

Após instalado, podemos ver seus comando com:

```
npx prisma -h
``` 

## Iniciando o Banco de Dados
Para criarmos o banco de dados utilizando o Prisma, usamos o seguinte comando:

```
npx prisma init --datasource-provider SQLite
```

Com isso feito, vamos a server/prisma/schema.prisma, lá vamos criar a nossa primeira tabela. As tabelas são chamadas de model no Prisma.

```prisma
model User {
  id   String @id @default(uuid())
  name String
}
```

Neste código, criamos a tabela Users, onde temos o `id` que é uma String, o @id identifica pro Prisma que aquele valor é de fato o Id da tabela, e o @default diz que é um valor padrão, que não somos nós quem preenchemos e por fim o `uuid()` gera um valor único e universal como `id`. <br>

Agora, vamos transformar nosso Schema escrito em Prisma para um arquivo escrito em SQL, para isso usamos o código:

```
npx prisma migrate dev
```

## Configurando o Front End
Para iniciarmos a configurar o Front End, vamos voltar a pasta inicial (sair da pasta server) e criar um projeto Next com o seguinte comando: 

```
  npx create-next-app@latest web --use-npm
```

Após rodar este comando, ele irá fazer uma série de perguntas, contudo vamos responder todas com `sim`. Afinal usaremos o Typescript, ESLint, Tailwind, 'src/' directory, App Router e o import alias e na útima opção apenas damos um enter.

<br><br>

### Configurações iniciais

Agora, vamos: 
- Deletar o README.md;
- remover os 2 arquivos da pasta public;
- na pasta app, removemos o favicon
- dentro de globals.css, removemos tudo menos os imports do `tailwind`
- dentro de page.tsx, apagamos tudo que for HTML

Após isso, vamos instalar novamente o `@rocketseat/eslint-config` e adicioná-lo ao projeto web. Para isso, depois de baixar, basta ir no arquivo `.eslintrc.json` e deixálo da seguint maneira: 

```json
{
  "extends": [
    "next/core-web-vitals", 
    "@rocketseat/eslint-config/react"
  ]
}
```

Agora vamos instalar a dependencia do Prettier para o Tailwind, com o seguinte comando: 

```
npm i prettier-plugin-tailwindcss -D
```

Depois de instalado, criamos um arquivo dentro da pasta `web` chamado `prettier.config.js`, onde vamos configurar da seguinte maneira: 

```js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
}

```

## Preparando o Ambiente Mobile
Para podermos dar ínicio, volte a pasta raiz (saindo da pasta web) e rode o comando:

```
npx create-expo-app mobile
 ```

Logo então, trocamos a extensão `.js` do App para `.tsx` e então damos um 

 ```
 npm run start
 ``` 

 Vamos baixar no nosso telefone o App `Expo Go`, e vamo scanear o QR code que apareceu no terminal.
<br>
Por fim, vamos apenas instalar o eslint no nosso mobile também, pelo comando:

```
npm i eslint @rocketseat/eslint-config -D
```

E também vamos instalar novamente o plugin do prettier

```
npm i prettier-plugin-tailwindcss -D
```

Após instalar, criamos o arquivo `prettier.config.js` e configuramos da seuginte maneira: 

```js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
}

```

<br><br>

# Aula 2 - Avançando o back-end e Front-end

## Front-end Web
Vamos começar abrindo nossa pasta Web

### **Configuração da Fonte**
Ao invés de importar do Google Fonts, o Next já tras uma integração com as fontes do Google. Vamos abrir dentro da pasta ***App*** o arquivo `layout.tsx`. Iremos alterar a importação da fonte *Inter* (que já vem) para Roboto_Flex e Bai_Jamjuree:

```js
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
```

Agora vamos alterar a `const inter` que já vem para duas novas variáveis: 

```js
const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})
```

Como a fonte *BaiJamjuree* não é flex, precisamos definir os pesos da fonte que queremos. Com isso pronto, vamos apenas adicionar elas no *body* do nosso projeto, dentro da *className*, adicionamos o seguinte:

```tsx
<body className={`${roboto.variable} ${baiJamjuree.variable} font-sans bg-gray-900 text-gray-100`}>
    {children}
</body>
```

Podemos já alterar o título e a descrição da página, mudando e deixando da seguinte maneira: 

```js
export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com React, Next.js, Tailwind, TypeScript, Node, Prisma e muitas novas tecnologias!',
}
```

E para completar, vamos ao arquivo `tailwind.config.js`. Agora, iremos alterar o conteúdo de *extends* para o seguinte:

```js
extend: {
      fontFamily: {
        sans: 'var(--font-roboto)',
        alt: 'var(--font-bai-jamjuree)',
      },
    },
```

### **Estrutura visual da Home**
Antes de começarmos, precisamos importar algumas cores do Figma, então vamos copiar todos os hexadecimais e adicionálos ao `tailwind.config.js` na área de *extends*, dessa maneira substituindo as cores originais e além disso, vamos adicionar um ***blur***, para que possamos utilizar na home futuramente, vai ficar desse jeito:

*(aqui é o Pedro do futuro e resolvi já deixar aqui o arquivo completo, pra não ter que ficar alterando a todo momento)*

```js
extend: {
      fontFamily: {
        sans: 'var(--font-roboto)',
        alt: 'var(--font-bai-jamjuree)',
      },

      colors: {
        gray: {
          50: '#eaeaea',
          100: '#bebebf',
          200: '#9e9ea0',
          300: '#727275',
          400: '#56565a',
          500: '#2c2c31',
          600: '#28282d',
          700: '#1f1f23',
          800: '#18181b',
          900: '#121215',
        },
        purple: {
          50: '#f3eefc',
          100: '#d8cbf7',
          200: '#c6b2f3',
          300: '#ab8eee',
          400: '#9b79ea',
          500: '#8257e5',
          600: '#764fd0',
          700: '#5c3ea3',
          800: '#48307e',
          900: '#372560',
        },
        orange: {
          50: '#ffefeb',
          100: '#ffccc2',
          200: '#ffb4a4',
          300: '#ff927b',
          400: '#ff7d61',
          500: '#ff5c3a',
          600: '#e85435',
          700: '#b54129',
          800: '#8c3320',
          900: '#6b2718',
        },
        yellow: {
          50: '#fff9ec',
          100: '#ffebc4',
          200: '#ffe2a7',
          300: '#ffd47f',
          400: '#ffcc66',
          500: '#ffbf40',
          600: '#e8ae3a',
          700: '#b5882d',
          800: '#8c6923',
          900: '#6b501b',
        },
        green: {
          50: '#e6fbef',
          100: '#b1f1ce',
          200: '#8cebb6',
          300: '#57e295',
          400: '#36dc81',
          500: '#04d361',
          600: '#04c058',
          700: '#039645',
          800: '#027435',
          900: '#025929',
        },
      },

      fontSize: {
        '5xl': '2.5rem',
      },

      backgroundImage: {
        stripes:
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 12.5%, transparent 12.5%, transparent)',
      },

      backgroundSize: {
        stripes: '100% 8px',
      },

      blur: {
        full: '194px',
      },
    },
```
E por fim vamos importar o favicon de dentro do Figma para dentro da pasta *App* com o nome `icon.png`, dessa maneira o Next já entende e coloca como favicon da nossa aplicação.

### **Atenção**
A parte de montagem e estrutura do HTML eu decidi por não anotar, por ser muito repetitiva e que seria muito código, então se quiser visualizar a estrutura dá página, de uma olhada nos arquivos do repositório acima


## Front-end Mobile
Agora entrando na pasta mobile, vamos trazer as cores e instalar as fontes. Começamos copiando o objeto `colors` que está acima e colando dentro do ***extends*** no `tailwind.config.js` da pasta mobile. Para instalar a fonte, vamos instalar um pacote:

```
npx expo install @expo-google-fonts/roboto @expo-google-fonts/bai-jamjuree expo-font
```

Após a instalação, vamos no `App.tsx` e vamos importar as fontes, além de importar o ***useFonts***, para podermos utilizá-las.

```tsx
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
```

E adicionamos o seguinte trecho de código no inicio do App: 

```tsx
const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }
```

O ***if*** previne que a aplicação não seja carregada sem que a fonte já esteja pronta. Com isso feito, vamos apenas adicionar essas fontes ao Tailwind. Para isso, vamos em `tailwind.config.js` e adicionamos no ***extends***:

```js
fontFamily: {
  title: 'Roboto_700Bold',
  body: 'Roboto_400Regular',
  alt: 'BaiJamjuree_700Bold',
},
```

Agora vamos importar a imagem de blur roxa no fundo e colocar como ***ImageBackground*** da nossa aplicação, ficando dessa maneira: 

```tsx
import { StatusBar } from 'expo-status-bar'
import { ImageBackground } from 'react-native'

import blurBg from './src/assets/bg-blur.png'

export default function App() {
  return (
    <ImageBackground
      source={blurBg}
      className="flex-1 items-center bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
```
Para podermos utilizar SVGs no ReactNative, precisaremos instalar algumas libs, vamos começar dessa maneira:

```
npx expo install react-native-svg

npm i -D react-native-svg-transformer
```

Agora criamos um documento chamado ``metro.config.js` na raiz da pasta mobile com o seguinte conteúdo:

```js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
```

E também criamos dentro de uma pasta a partir da raiz mobile > src > assets e criamos dentro o `assets.d.ts` com o seguinte: 

```ts
declare module '*.png'

declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}
```

Com isso já podemos importar SVGs para o ReactNative, porém ele vem como um componente pra dentro da aplicação, então a gente pode fazer da seguinte maneira: 

```tsx
const StyledStripes = styled(Stripes)
```

Aqui, Stripes são as linhas na vertical, porém o Tailwind não reconhece componentes não nativos do React Native, então dessa maneira podemos customizar esse componente importado utilizando o ***syled***. Aqui abaixo tem um pequeno glossário em relação aos termos do ReactNative

| React       | ReactNative  |
|-------------|--------------|
|  div        |  View        |
|  p,h1,h2... |  Text        |
|  button     |  Touchable   |


## Back-end
Bom, para inicio, vamos mexer no nosso schema do prisma. Vamos criar uma nova tabela chamada Memory e atribuir ela a tabela User, dizendo que cada User tem um array de Memories e cada Memory está atribuida ao Id de algum User. 

```prisma
model User {
  id        String @id @default(uuid())
  githubId  Int    @unique
  name      String
  login     String
  avatarUrl String

  memories Memory[]
}

model Memory {
  id     String @id @default(uuid())
  userId String

  coverUrl  String
  content   String
  isPublic  Boolean  @default(false)
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id])
}
```

### **Criando Rotas API**
Para iniciarmos, vamos criar uma pasta dentro de *src* chamada `routes`, e dentro dela um `memories.ts`, aqui vai ficar tudo ligado ao CRUD das memórias que serão cadastradas. 

<br>

Vamos criar também uma pasta detro de *src* chamada `lib` e dentro dela um arquivo `prisma.ts`. Lá vamos exportar a constante prisma que poderemos chamar em outros lugares da aplicação: 

```ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query']
})
```

Voltando ao `memories.ts`, vamos estar exportando uma função assíncrona (exigência do `fastfy`) com o nome que preferir, mas o parâmetro será o nosso ***app*** do `server.ts`. Como estamos utilizando o TypeScript, a tipagem do *app* é a **FastifyInstance**: 

```ts
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany()
  
    return users
  }) 
```

e no `server.ts` podemos retirar a inicializção do Prisma. Também adicionamos o **.register()** para adicionar uma nova rota no `fastify`, passando como parâmetro a funcção asssíncrona criada antes

```ts
import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {})
```

### ***CRUD***
No arquivo `memories.ts` vamos criar as rotas para o CRUD (**C**reate, **R**ead, **U**pdate, **D**elete), cada um com seu devido método HTTP:

```ts
import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {

  // Rota para buscar as memórias - GET

  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })

    return memories.map(memory => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...')
      }
    })
  })

  // Rota para buscar dados específicos de uma memória em específico - GET
  
  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return memory
  })


  // Rota para criar uma memória - POST
  
  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false)
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.params)
    
    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: ''
      }
    })

    return memory
  })
  

  // Rota para atualizar informações de uma memória - PUT

  app.put('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false)
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.params)

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic
      }
    })

   return memory
  })


  // Rota para deletar uma memória específica - DELETE
  
  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
```
<br>

Por fim vamos instalar o CORS. O CORS é mais uma medida de segurança, ele irá determinar quais *URL*s vão pode acessar nossa API.

```
npm i @fastify/cors
```

e no arquivo `server.ts` a gente adiciona o seguinte: 

```ts
app.register(cors, {
  origin: true, // todas URLs de front-end poderão acessar nosso back-end
})
```

nesse caso, o ideal é que quando em produção, mude e `true` para um array de URLs, para podermos dizer qual front-end está permitido mandar requisições para o nosso back-end.  