import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import  request  from 'supertest';
import jwt from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[]
    }
  }
}


let mongo: any;
beforeAll(async () => {

  process.env.JWT_KEY = 'asdfasdf'

  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()
  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = () => {

  const id = mongoose.Types.ObjectId().toHexString()
  // Build a JWT payloa. { id, email }
  const payload = {
    id,
    email: 'test@test.com'
  }
  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!)
  // Build session object
  const session = { jwt: token }
  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session)
  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64')
  // Return a string thats the cookie with the enconde data
  return [`express:sess=${base64}`]
}