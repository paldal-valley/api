import { getContract, web3, blockMeta } from '../../utils'

export default async (method, args, txObject, privKey) => {
  try {
    const doajouContract = await getContract()

    const txCount = web3.eth.getTransactionCount(txObject.from, 'pending')
    const data = await doajouContract.methods[method](...args).encodeABI()
    const txObj = {
      ...txObject,
      nonce: web3.utils.toHex(txCount),
      to: blockMeta.contractAddress,
      chainId: 3,
      data
    }
    const signed = await web3.eth.accounts.signTransaction(txObj, privKey)
    console.log(await web3.eth.sendSignedTransaction(signed.rawTransaction))
  } catch (err) {
    console.error(err)
    throw Error(err)
  }
}
