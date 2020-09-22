import express from 'express'
import request from 'supertest'

import { db } from '../data'
import { PolicyListItem } from '../shared/types'
import policy from './policy'

const app = express()
app.use(express.json())
app.use(policy)

describe('GET /', function () {
    const ids: { id: number }[] = []

    beforeAll(async () => {
        const now = new Date().toISOString()
        await db.any('DELETE FROM "Policy"')
        ids.push(await db.one(`INSERT INTO "Policy"(number, annual_premium, effective_date, states, created, updated) VALUES ('A-100100', 1200, '2020-09-22T00:00:00.000Z', '[]', '${now}', '${now}') RETURNING id`))
        ids.push(await db.one(`INSERT INTO "Policy"(number, annual_premium, effective_date, states, created, updated) VALUES ('A-100101', 1500, '2020-10-07T00:00:00.000Z', '[]', '${now}', '${now}') RETURNING id`))
    })

    it('returns all policies', function (done) {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body).toStrictEqual([
                    {
                        id: expect.anything(),
                        annualPremium: '1200.00' as any,
                        effectiveDate: '2020-09-22T00:00:00.000Z',
                        policyNumber: 'A-100100',
                        status: '',
                    },
                    {
                        id: expect.anything(),
                        annualPremium: '1500.00' as any,
                        effectiveDate: '2020-10-07T00:00:00.000Z',
                        policyNumber: 'A-100101',
                        status: '',
                    },
                ] as PolicyListItem[])
                done()
            })
    })

    it('returns existing policies', function (done) {
        request(app)
            .get('/' + ids[0].id)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body).toStrictEqual({
                    id: expect.anything(),
                    annualPremium: '1200.00' as any,
                    effectiveDate: '2020-09-22T00:00:00.000Z',
                    policyNumber: 'A-100100',
                    status: '',
                } as PolicyListItem)
                done()
            })
    })

    it('returns error for non-existing policies', function (done) {
        const id = [1, 2, 3].find(it => !ids.map(_ => _.id).includes(it))
        request(app)
            .get('/' + id)
            .set('Accept', 'application/json')
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body).toStrictEqual({
                    message: 'Policy not found'
                })
                done()
            })
    })

    it('creates a policy', function (done) {
        request(app)
            .post('/')
            .send({
                policyNumber: 'A-100200',
                effectiveDate: '2020-09-29T00:00:00.000Z',
                annualPremium: 1300,
            })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body).toStrictEqual({
                    id: expect.anything(),
                })
                done()
            })
    })

    it('creating a policy with existing number fails', function (done) {
        request(app)
            .post('/')
            .send({
                policyNumber: 'A-100100',
                effectiveDate: '2020-09-29T00:00:00.000Z',
                annualPremium: 1300,
            })
            .set('Accept', 'application/json')
            .expect(400)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body).toStrictEqual({
                    message: 'Policy number already taken'
                })
                done()
            })
    })

    it('updates a policy', function (done) {
        request(app)
            .post('/')
            .send({
                id: ids[0].id,
                effectiveDate: '2020-09-22T00:00:00.000Z',
                policyNumber: 'A-100100',
                annualPremium: 1400,
            })
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body).toStrictEqual({
                    id: ids[0].id,
                })
                done()
            })
    })

    it('deletes a policy', function (done) {
        request(app)
            .delete('/' + ids[0].id)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body).toStrictEqual({})
                done()
            })
    })
})
