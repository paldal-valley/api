const changeTimestampFormat = plainDateTime => {
  const timestamp = new Date(plainDateTime).toISOString().slice(0, 19).replace('T', ' ');
  return timestamp
}

export default {
  changeTimestampFormat
}



