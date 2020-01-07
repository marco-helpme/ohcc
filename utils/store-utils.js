export const getData = async function (url, axios) {
  const response = await axios.get(url)
  return {
    data: response.data.data
  }
}
