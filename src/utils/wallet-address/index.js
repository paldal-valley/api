const getWalletAddress = {
  owner: process.env.NODE_ENV === 'production' ? process.env.OWNER_ADDRESS : process.env.DEV_OWNER_ADDRESS,
  manager: process.env.NODE_ENV === 'production' ? process.env.MANAGER_ADDRESS : process.env.DEV_MANAGER_ADDRESS
}

export default {
  ...getWalletAddress
}
