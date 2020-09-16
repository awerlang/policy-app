import { PolicyListItem, PolicyItem, PolicyStatus } from '../shared/types'
import { db } from '../data'

interface PolicyData {
    'id': number
    'number': string
    'annual_premium': number
    'effective_date': string
    'states': {
        status: PolicyStatus
        reason: string
        created: string
    }[]
    'created': string
    'updated': string
}

export default {
    async list() {
        const items = await db.manyOrNone<PolicyData>('SELECT * FROM "Policy"')
        return items.map(item => {
            const states = item.states.sort((a, b) => a.created.localeCompare(b.created))
            const listItem: PolicyListItem = {
                id: item.id,
                policyNumber: item.number,
                annualPremium: item.annual_premium,
                effectiveDate: item.effective_date,
                states: states,
                status: states.length ? states[states.length - 1].status : ''
            }
            return listItem
        })
    },

    async create(item: PolicyItem) {
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

    async update(item: PolicyItem) {
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

    async delete(id: number) {
        return db.one(
            'DELETE FROM "Policy" WHERE id = $1',
            [id])
    }
}
