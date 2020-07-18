import request from 'supertest'
import { app } from '../../app'

it('Returns a 400 on account that does not exists', async () => {

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400)
})


it('Fails when incorrect password is supplied', async () => {

  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'passwd'
    })
    .expect(400)
})


it('Responds with a cookie with valid credentials', async () => {
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(201)

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined()


})
