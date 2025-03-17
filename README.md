# Rws-Chat

<div align="center"></div>

## Introduction

Rws-Chat is a real-time chat application developed with React, TypeScript, and Socket.IO. It allows users to create chat rooms, send text and image messages, and see who is online in real time.

## Features

- Chat room creation
- Sending text and image messages
- User join and leave notifications
- Real-time typing indication
- Responsive interface for different screen sizes

---

## Project Structure

- .env.template
- .gitignore
- index.html
- package.json
- src/
  - \_BigScreens/
    - components/
      Chat.tsx
      ...
  - \_SmallScreens/
    - components/
      ...
  - assets/
    - 3dots.gif
    - favicon.ico
  - Big_App.tsx
  - hooks/
    - Server/
      ...
      useDelayToKeyPressed.tsx
      useDelayToKeyPressedFriend.tsx
      useKeyPress.tsx
      useScrollToBottom.tsx
      useTimeOut.tsx
  - main.tsx
  - Small_App.tsx
  - types/
    - types.tsx
- style.css

---

## Installation

Follow the steps below to install and run the project locally:

1. Clone the repository:

```sh
git clone https://github.com/Grs2080w/rws-chat.git
```

2. Navigate to the project directory:

```sh
cd rws-chat
```

3. Install dependencies:

```sh
npm install
```

4. Create a `.env` file based on `.env.template` and configure the Socket.IO server URL:

```sh
cp .env.template .env
```

5. Start the development server:

```sh
npm run dev
```

---

## API

This project relies on an API to manage chat rooms and messages. The API can be found in the following repository:

https://github.com/Grs2080w/rws-chat-server.git

Make sure to follow the instructions in the API repository to set it up and run it correctly.
