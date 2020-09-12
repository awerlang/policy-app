import { db } from '../data'

interface Policy {
    id: number
    policyNumber: string
    annualPremium: number
    effectiveDate: string
}

export default {
    async list () {
        return db.manyOrNone('SELECT * FROM "Policy"')
    },

    async create (item: Policy) {
        const now = new Date().toISOString()
        const states = [
            {
                status: 'active',
                reason: 'Policy Created',
                created: now,
                updated: now
            }
        ]
        return db.one(
            'INSERT INTO "Policy"(number, annual_premium, effective_date, states, created, updated) VALUES ($1, $2, $3, $4:json, $5, $6) RETURNING id',
            [item.policyNumber, item.annualPremium, item.effectiveDate, states, now, now])
    },

    async update (item: Policy) {
        const now = new Date().toISOString()
        const states = [
            {
                status: 'active',
                reason: 'Policy Updated',
                created: now,
                updated: now
            }
        ]
        return db.one(
            'UPDATE "Policy" SET number = $1, annual_premium = $2, effective_date = $3, states = states || $4:json, updated = $5 WHERE id = $6 RETURNING id',
            [item.policyNumber, item.annualPremium, item.effectiveDate, states, now, item.id])
    },

    async delete (id: number) {
        return db.one(
            'DELETE FROM "Policy" WHERE id = $1',
            [id])
    }
}
