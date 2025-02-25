import { connect as mongooseConnect } from 'mongoose'

export async function connect() {
  try {
    await mongooseConnect(process.env.DB_URL)
    console.log('MongoDB connected')
  } catch (error) {
    console.log('MongoDB connection error', error)
  }
}
