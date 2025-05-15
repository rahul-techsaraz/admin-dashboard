import axios from 'axios'

export const httpCall2 = async (url, body, header) => {
  if (!url) {
    throw Error('Please pass the valid url')
  }
  const data = await axios.post(url, body, {
    headers: header
  })
  const json = {}

  return { ...json, data: data.data, status: data.status }
}
