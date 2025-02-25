# Erin Living Maintenance Request

## Getting Started

### Tech Stack

- **`server`**: Express, Typescript, Apollo Server, MongoDB, Websocket, Inversify.
- **`client`**: NextJS, Typescript, Apollo Client, HeroUI, Framer Motion, Redux, React Hook Form, Zod.

### Prerequisites

- node **`v22.13.1`**
- pnpm **`v9.5.0`** (enabled it by corepack: **`corepack enable pnpm`**)
- mongodb

### Installation

This is the monorepo project using pnpm workspace, it has 2 subfolders (**`client`** & **`server`**). to install the dependencies please run: **`pnpm install`**.

The reason why im using pnpm workspace because of the simplicity of the repository, so i dont have to create 2 different repo for the client and the server.

### Configuration

In the **`/server`** folder, create **`.env`** file with the content of **`DB_URL=xxx`** (the mongodb uri) and **`PORT`** (the port we want to run the server locally)

Next, in the **`/client`** folder, create **`.env`** file with the content of **`GQL_URL=xxx`** (the graphql url) and **`WS_URL`** (the websocket url)

## Usage

- First, you have to run **`pnpm run server:start:dev`** to start the Node server.
  You can see the GraphQL Playground at **[http://localhost:4000](http://localhost:4000)**.
- Then, you can start the client with **`pnpm run client:start:dev`**. The client will start at **[http://localhost:3000](http://localhost:3000)**.
