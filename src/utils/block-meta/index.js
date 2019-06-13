const isProduction = process.env.NODE_ENV === 'production'

const info = {
  wallet: {
    address: {
      owner: isProduction ? process.env.OWNER_ADDRESS : process.env.DEV_OWNER_ADDRESS,
      manager: isProduction ? process.env.MANAGER_ADDRESS : process.env.DEV_MANAGER_ADDRESS,
    },
    privKey: {
      owner: isProduction ? process.env.OWNER_PRIV_KEY : process.env.DEV_OWNER_PRIV_KEY,
      manager: isProduction ? process.env.MANAGER_PRIV_KEY : process.env.DEV_MANAGER_PRIV_KEY
    }
  },
  contractAddress: isProduction ? process.env.CONTRACT_ADDRESS : process.env.DEV_CONTRACT_ADDRESS
}

export default {
  ...info
}
