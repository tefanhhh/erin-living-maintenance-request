# Erin Living Maintenance Request

## Getting Started
### Prerequisites
- node **`v22.13.1`**
- pnpm **`v9.5.0`** (enable it by corepack: **`corepack enable pnpm`**)
- mongodb

### Installation
This is the monorepo project using pnpm workspace, it has 2 subfolders (**`client`** & **`server`**). to install the dependencies please run: **`pnpm install`**

### Configuration
On the **`/server`** folder, create .env file with the content of DB_URL=xxx (the mongodb uri)

## Usage
- First, you have to run **`pnpm run server:start:dev`** to start the Node server.  
  You can see the GraphQL Playground at **[http://localhost:4000](http://localhost:4000)**.
- Then, you can start the client with **`pnpm run client:start:dev`**. The client will start at **[http://localhost:3000](http://localhost:3000)**.
