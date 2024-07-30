export const httpCall = async (url, headers, method, body) => {
  if (!url) {
    throw Error('Please pass the valid url')
  }
  if (!headers) {
    throw Error('Please pass the valid url')
  }
  if (!method) {
    throw Error('Please pass the valid url')
  }
  const options = await prepareOption(headers, method, body)
  const data = await fetch(url, options)
  const json = await data.json()
  return json
}
const prepareOption = (headers, method, body) => {
  const options = {
    method,
    headers
  }
  if (body) {
    return { ...options, body: JSON.stringify(body) }
  }
  return options
}
