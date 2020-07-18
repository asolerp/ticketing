import request from 'supertest'
import { app } from '../../app'

it('Returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
})

it('Retuns a 404 with invalild email', () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'testtest.com',
    password: 'password'
  })
  .expect(400)
})

it('Retuns a 404 with invalild password', () => {
  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'p'
  })
  .expect(400)
})

it('Retuns a 404 with missing email an password', () => {
  return request(app)
  .post('/api/users/signup')
  .send({})
  .expect(400)
})

it('disallows duplicated emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
    
    await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400)
})

it('Sets a cookie after successful signunp', async () => {
  const response = await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201)

  expect(response.get('Set-Cookie')).toBeDefined()
})