const keypair = require('keypair')
const fs = require('fs')

// generate key pair
const pair = keypair()

/** Set output dir */
let dir = './keys'
const args = process.argv.slice(2)
if (args.length) dir = args[0]
// create director if not exist
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}
// output paths
const publicPath = `${dir}/public.pem`
const privatePath = `${dir}/private.key`

console.log(pair)
console.log('writting to file...')

/** Write to file */
fs.writeFile(publicPath, pair.public, err => {
  if (err) console.log(err)
  else console.log(`Public key exported: ${publicPath}`)
})
fs.writeFile(privatePath, pair.private, err => {
  if (err) console.log(err)
  else console.log(`Public key exported: ${privatePath}`)
})
