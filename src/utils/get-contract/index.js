import Web3 from 'web3'
import { ABI, address } from './constants'

const INFURA_API_KEY = process.env.INFURA_API_KEY
const provider = process.env.NODE_ENV === 'production'
  ? `https://ropsten.infura.io/v3/${INFURA_API_KEY}`
  : 'http://localhost:8545'

export default () => {
  return new Promise(resolve => {
    let web3 = new Web3(new Web3.providers.HttpProvider(provider))
    let contractInstance = new web3.eth.Contract(ABI, address)
    resolve(contractInstance)
  })
}
