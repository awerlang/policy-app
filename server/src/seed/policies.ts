import { policy } from '../services'

const total = 50

const effectiveDate = new Date()

let done = 0

for (let i = 0; i < total; i++) {
    policy.create({
        policyNumber: `A-0000${i + 110}`,
        annualPremium: random(500, 1500),
        effectiveDate: effectiveDate.toISOString()
    }).then(() => {
        done++
        console.log('Done:', done, 'records')
    })
    effectiveDate.setHours(effectiveDate.getHours() + random(6, 24 * 7))
}

function random(min: number, max: number) {
    return Math.random() * (max - min) + min
}
