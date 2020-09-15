import request from 'supertest'

import app from './home'

describe('GET /', function () {
    it('redirect to index.html', function (done) {
        request(app)
            .get('/')
            .set('Accept', 'text/html')
            .expect(302)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.get('location')).toBe('index.html')
                done()
            })
    })
})
