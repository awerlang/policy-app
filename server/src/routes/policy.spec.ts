import supertest from 'supertest'

import { db } from '../data'
import { PolicyListItem } from '../shared/types'
import app from './policy'

const request = supertest(app)

describe('GET /', function () {
    const ids: { id: number }[] = []

    async function insertPolicy(policyNumber: string, annualPremium: number, effectiveDate: Date) {
        const now = new Date().toISOString()
        ids.push(await db.one(`INSERT INTO "Policy"(number, annual_premium, effective_date, states, created, updated) VALUES ('${policyNumber}', ${annualPremium}, '${effectiveDate.toISOString()}', '[]', '${now}', '${now}') RETURNING id`))
    }

    beforeAll(async () => {
        await db.any('DELETE FROM "Policy"')
        await insertPolicy('A-100100', 1200, new Date('2020-09-22T00:00:00.000Z'))
        await insertPolicy('A-100101', 1500, new Date('2020-10-07T00:00:00.000Z'))
    })

    it('returns all policies, last updated first', async () => {
        const res = await request.get('/')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200)
        expect(res.body).toStrictEqual([
            {
                id: expect.anything(),
                annualPremium: '1500.00' as any,
                effectiveDate: '2020-10-07T00:00:00.000Z',
                policyNumber: 'A-100101',
                status: '',
            },
            {
                id: expect.anything(),
                annualPremium: '1200.00' as any,
                effectiveDate: '2020-09-22T00:00:00.000Z',
                policyNumber: 'A-100100',
                status: '',
            },
        ] as PolicyListItem[])
    })

    it('returns existing policies', async () => {
        const res = await request.get('/' + ids[0].id)
            .set('Accept', 'application/json')

        expect(res.status).toBe(200)
        expect(res.body).toStrictEqual({
            id: expect.anything(),
            annualPremium: '1200.00' as any,
            effectiveDate: '2020-09-22T00:00:00.000Z',
            policyNumber: 'A-100100',
            status: '',
        } as PolicyListItem)
    })

    it('returns error for non-existing policies', async () => {
        const id = [1, 2, 3].find(it => !ids.map(_ => _.id).includes(it))
        const res = await request.get('/' + id)
            .set('Accept', 'application/json')

        expect(res.status).toBe(400)
        expect(res.body).toStrictEqual({
            message: 'Policy not found'
        })
    })

    it('creates a policy', async () => {
        const res = await request.post('/')
            .send({
                policyNumber: 'A-100200',
                effectiveDate: '2020-09-29T00:00:00.000Z',
                annualPremium: 1300,
            })
            .set('Accept', 'application/json')

        expect(res.status).toBe(200)
        expect(res.get('Content-Type')).toMatch(/json/)
        expect(res.body).toStrictEqual({
            id: expect.anything(),
        })
    })

    it('creating a policy with empty data fails', async () => {
        const res = await request.post('/')
            .send()
            .set('Accept', 'application/json')

        expect(res.status).toBe(400)
        expect(res.get('Content-Type')).toMatch(/json/)
        expect(res.body).toStrictEqual({
            message: 'Missing required data'
        })
    })

    it('creating a policy with existing number fails', async () => {
        const res = await request.post('/')
            .send({
                policyNumber: 'A-100100',
                effectiveDate: '2020-09-29T00:00:00.000Z',
                annualPremium: 1300,
            })
            .set('Accept', 'application/json')

        expect(res.status).toBe(400)
        expect(res.get('Content-Type')).toMatch(/json/)
        expect(res.body).toStrictEqual({
            message: 'Policy number already taken'
        })
    })

    it('updates a policy', async () => {
        const res = await request.post('/')
            .send({
                id: ids[0].id,
                effectiveDate: '2020-09-22T00:00:00.000Z',
                policyNumber: 'A-100100',
                annualPremium: 1400,
            })
            .set('Accept', 'application/json')

        expect(res.status).toBe(200)
        expect(res.get('Content-Type')).toMatch(/json/)
        expect(res.body).toStrictEqual({
            id: ids[0].id,
        })
    })

    it('deletes a policy', async () => {
        const res = await request.delete('/' + ids[0].id)
            .set('Accept', 'application/json')

        expect(res.status).toBe(200)
        expect(res.get('Content-Type')).toMatch(/json/)
        expect(res.body).toStrictEqual({})
    })
})
