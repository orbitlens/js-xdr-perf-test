const chalk = require('chalk')
const vectors = require('./vectors.json')

const iterations = 10000
const samples = 10

const mapping = {
    new: require('./generated/curr_generated-new'),
    old: require('./generated/curr_generated-old')
}

function measure(description, samples, code) {
    let idx = 0
    const results = []
    for (const [key, xdr] of Object.entries(mapping)) {
        const measures = []
        for (let i = 0; i < samples; i++) {
            const from = new Date()
            code(xdr)
            measures.push(new Date() - from)
        }
        const res = measures.reduce((total, m) => total + m, 0) / measures.length / 1000
        const min = Math.min(...measures) / 1000
        const max = Math.max(...measures) / 1000
        const painter = idx > 0 ? chalk.blue : chalk.greenBright
        console.log(`${chalk.cyan(description)} - ${painter(key)}: ${painter(res.toPrecision(3))}s ${chalk.grey(`(min ${min}s - max ${max}s)`)}`)
        results.push(res)
        idx++
    }
    console.log(`difference: ${chalk.greenBright((results[1] / results[0]).toPrecision(2) + 'X')}\n`)
}

console.log(`Performance benchmark ${new Date().toISOString().replace(/\.\d{3}Z/, '').replace('T', ' ')} UTC`)
console.log(`${chalk.cyan(samples.toString())} samples ${chalk.cyan(iterations.toString())} iterations each`)
console.log(`------------------------------------------------`)

for (let {type, xdr} of vectors) {
    if (mapping.new[type].fromXDR(xdr, 'base64').toXDR('base64') !== mapping.old[type].fromXDR(xdr, 'base64').toXDR('base64'))
        throw new TypeError('XDR serialization mismatch')
    xdr = Buffer.from(xdr, 'base64') //binary form to avoid base64->binary transform penalty on each call

    measure(type + '.fromXDR', samples, serializer => {
        const serializerType = serializer[type]
        for (let i = 0; i < iterations; i++) {
            serializerType.fromXDR(xdr, 'raw')
        }
    })

    measure(type + '.toXDR', samples, serializer => {
        const obj = serializer[type].fromXDR(xdr, 'raw')
        for (let i = 0; i < iterations; i++) {
            obj.toXDR()
        }
    })
}