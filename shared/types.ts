export type PolicyStatus = 'active' | 'cancelled'

export interface PolicyItem {
    id?: number
    policyNumber: string
    annualPremium: number
    effectiveDate: string
}

export interface PolicyListItem extends PolicyItem {
    states: {
        status: PolicyStatus
        reason: string
        created: string
    }[]
    status: string
}
