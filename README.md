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