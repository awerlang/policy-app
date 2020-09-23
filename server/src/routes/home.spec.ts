import supertest from 'supertest'

import app from './home'

const request = supertest(app)

describe('GET /', function () {
    it('redirect to index.html', async () => {
        const res = await request.get('/')
            .set('Accept', 'text/html')

        expect(res.status).toBe(302)
        expect(res.get('location')).toBe('/index.html')
    })
})
