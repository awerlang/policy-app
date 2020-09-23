import { ClientError, ServerError } from '../util/errors'
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

function toModel(data: PolicyData): PolicyItem {
    const states = data.states.sort((a, b) => a.created.localeCompare(b.created))
    const listItem: PolicyListItem = {
        id: data.id,
        policyNumber: data.number,
        annualPremium: data.annual_premium,
        effectiveDate: data.effective_date,
        // TODO: states
        // states: states,
        status: states.length ? states[states.length - 1].status : ''
    }
    return listItem
}

function handleError<T>(result: Promise<T>): Promise<T | ClientError | ServerError> {
    return result.catch(reason => {
        if (/Policy_number_key/.test(reason.message)) {
            return new ClientError('Policy number already taken')
        }
        return new ServerError('An error ocurred')
    })
}

export async function list() {
    const data = await db.manyOrNone<PolicyData>('SELECT * FROM "Policy" ORDER BY updated desc')
    return data.map(toModel)
}

export async function get(id: number) {
    const data = await db.oneOrNone<PolicyData>('SELECT * FROM "Policy" WHERE id = $1', [id])
    return data ? toModel(data) : new ClientError('Policy not found')
}

export async function create(item: PolicyItem) {
    const now = new Date().toISOString()
    const states = [
        {
            status: 'active',
            reason: 'Policy Created',
            created: now,
            updated: now
        }
    ]
    const result = db.one<PolicyData>(
        'INSERT INTO "Policy"(number, annual_premium, effective_date, states, created, updated) VALUES ($1, $2, $3, $4:json, $5, $6) RETURNING id',
        [item.policyNumber, item.annualPremium, item.effectiveDate, states, now, now])
    return handleError(result)
}

export async function update(item: PolicyItem) {
    const now = new Date().toISOString()
    const states = [
        {
            status: 'active',
            reason: 'Policy Updated',
            created: now,
            updated: now
        }
    ]
    const result = db.one<PolicyData>(
        'UPDATE "Policy" SET number = $1, annual_premium = $2, effective_date = $3, states = states || $4:json, updated = $5 WHERE id = $6 RETURNING id',
        [item.policyNumber, item.annualPremium, item.effectiveDate, states, now, item.id])
    return handleError(result)
}

export async function remove(id: number) {
    return db.one(
        'DELETE FROM "Policy" WHERE id = $1 RETURNING id',
        [id])
}
