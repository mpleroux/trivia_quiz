# README

## Features

- Displays multiple choice trivia questions with buttons for answers
- Question number and score are displayed in header
- Color-codes buttons based on result; green for correct, red for incorrect
- Waits 1.5 seconds and advances to the next question
- Display final score and button to restart game

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Open Trivia DB](https://opentdb.com/)

## Components

- TriviaGame
    - GameHeader
    - GameBoard
        - QuestionText
        - AnswerOptions
    - GameOver

## Improvements

- [ ] Load questions from Open Trivia DB instead of hardcoded array
- [ ] Deploy to Netlify
- [ ] Styling

## Run locally

```sh
npm install
npm run dev # http://localhost:3000
```

## Screenshot

TODO

## Setup notes

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
