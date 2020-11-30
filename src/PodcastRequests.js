import axios from 'axios'

export async function searchPodcasts(searchTerm) {
  const searchString = `search?entity=podcast&term=${searchTerm}&limit=10`
  const {
    data: { results },
  } = await axios.get(`https://itunes.apple.com/${searchString}`, {headers: { "Access-Control-Allow-Origin": "https://compassionate-curie-974e23.netlify.app/" }})
  return results
}

export async function lookupEpisodes(id) {
  const lookupString = `lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=50`
  const {
    data: { results },
  } = await axios.get(`https://itunes.apple.com/${lookupString}`, {headers: { "Access-Control-Allow-Origin": "https://compassionate-curie-974e23.netlify.app/" }})
  return results
}
