import request from 'supertest'

import app from './home'

describe('GET /', function () {
    it('respond with html', function (done) {
        request(app)
            .get('/')
            .set('Accept', 'text/html')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                done()
            })
    })
})
