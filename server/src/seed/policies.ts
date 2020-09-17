import { policy } from '../services'

const baseNumber = 100000
const total = 50
const annualPremiumRange: [number, number] = [500, 1500]

main()

function main() {
    const effectiveDate = new Date()
    let done = 0

    for (let i = 0; i < total; i++) {
        policy.create({
            policyNumber: `A-${baseNumber + i}`,
            annualPremium: random(...annualPremiumRange),
            effectiveDate: effectiveDate.toISOString()
        }).then(() => {
            done++
            console.log('Done:', done, 'records')
        })
        effectiveDate.setHours(effectiveDate.getHours() + random(6, 24 * 7))
    }
}

function random(min: number, max: number) {
    return Math.random() * (max - min) + min
}
