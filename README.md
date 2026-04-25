# README

A trivia game written in React and using questions from [Open Trivia DB](https://opentdb.com/).

## Features

- Loads five multiple choice trivia questions from Open Trivia DB and provides buttons for answers
- Styling that resembles [Trivial Pursuit cards](./public/trivial-pursuit-card.jpg) with same category colors
- Question number and score are displayed in header
- Color-coded buttons based on result; green for correct, red for incorrect
- Waits 1.5 seconds and advances to the next question
- Displays final score and button to restart game

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- Open Trivia DB

## Run locally

```sh
npm install
npm run dev # http://localhost:5173
```

## Architecture

```mermaid
graph TD
    App["App<br/>(Entry Point)"]
    IntroScreen["IntroScreen<br/>(Initial Welcome)"]
    LoadingScreen["LoadingScreen<br/>(Fetching Questions)"]
    ErrorScreen["ErrorScreen<br/>(Error Handling)"]
    TriviaGame["TriviaGame<br/>(Main Game Logic)"]
    GameHeader["GameHeader<br/>(Question # & Score)"]
    TrivialPursuitCard["TrivialPursuitCard<br/>(Card Display)"]
    AnswerOptions["AnswerOptions<br/>(Answer Buttons)"]
    GameOver["GameOver<br/>(Final Score)"]
    
    App --> IntroScreen
    App --> LoadingScreen
    App --> ErrorScreen
    App --> TriviaGame
    TriviaGame --> GameHeader
    TriviaGame --> TrivialPursuitCard
    TriviaGame --> GameOver
    TrivialPursuitCard --> AnswerOptions
```

## Screenshot

<img src="./public/screenshot.png" width="400" alt="Screenshot of trivia game">
