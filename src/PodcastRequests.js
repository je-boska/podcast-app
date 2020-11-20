import axios from 'axios'

export default async function getPodcasts() {
  const testSearchString = 'search?entity=podcast&term=hardcorehistory&limit=10'
  const {
    data: { results },
  } = await axios.get(`https://itunes.apple.com/${testSearchString}`)
  console.log(results)
  return results
}
