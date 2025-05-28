import axios from 'axios'

export const httpCall2 = async (url, header, method = 'POST', body) => {
  if (!url) {
    throw Error('Please pass the valid url')
  }
  const data = await axios.post(url, body, {
    headers: header
  })
  console.log(data)
  return { data: data.data }
}
