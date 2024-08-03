export const fileTouploadPayload = async (data) => {
  if (!data) {
    throw Error('Please Select File to Upload')
  }
  const filePayload = await new FormData()
  for (let i = 0; i < data.length; i++) {
    filePayload.append('file[]', data[i])
  }
  return filePayload
}
