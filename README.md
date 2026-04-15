# README

## Features

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React 19](https://react.dev/)
- [Open Trivia DB](https://opentdb.com/)

## Components

- TriviaGame
    - GameHeader
        - QuestionCounter
        - ScoreDisplay
    - GameBoard
        - QuestionText
        - AnswerOptions

## Improvements

## Run locally

```sh
npm install
npm run dev # http://localhost:3000
```

## Screenshot

## Dev Notes

### Create project

```sh
cd ~/Dev
npm create vite@latest trivia_quiz
```

- Project name: vite-project (default)
- Framework: React
- Variant: TypeScript
- Install with npm and start now? No

### Run project

```sh
cd trivia_quiz
npm install
npm run dev
```

Moved files I don't need into `/_old`

Stripped out boilerplate HTML, CSS

### Tailwind v4

`npm install tailwindcss @tailwindcss/vite`

vite.config.ts: Add `@tailwindcss/vite` plugin:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

index.css: Add `@import "tailwindcss"` to the top of file

### VSCode

Enable [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension

Add association to workspace settings:

```json
{
  "settings": {
    "files.associations": {
      "*.css": "tailwindcss"
    },
  }
}
```

### Git

#### Create local repo

```sh
git init
git add .
git commit -m "First commit"
```

#### Create new repo on GitHub

GitHub > New > Create a new repository

- Repository name: trivia_quiz
- Description: Trivia game using React and Open Trivia DB.

Create Repository button

#### Select remote repo in VSCode

Source Control > ... menu > Remote > Add Remote... > Add remote from GitHub

(select trivia_quiz repo)

Give it a local name of `trivia_quiz` as well
