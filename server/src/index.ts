import { connect } from './db/mongoose'
import { start } from './server'

async function bootstrap() {
  try {
    await connect()
    console.log('Connected to the database')
    await start()
  } catch (error) {
    console.error('❌ Failed to connect to database:', error)
    process.exit(1)
  }
}
await bootstrap()
