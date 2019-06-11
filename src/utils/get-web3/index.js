import Web3 from 'web3'
const INFURA_API_KEY = process.env.INFURA_API_KEY
const provider = process.env.NODE_ENV === 'production'
  ? `https://ropsten.infura.io/v3/${INFURA_API_KEY}`
  : 'http://localhost:8545'

export default new Web3(new Web3.providers.HttpProvider(provider))
