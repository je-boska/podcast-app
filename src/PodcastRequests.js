import axios from 'axios'

export async function searchPodcasts(searchTerm) {
  const searchString = `search?entity=podcast&term=${searchTerm}&limit=10`
  const {
    data: { results },
  } = await axios.get(`https://itunes.apple.com/${searchString}`)
  return results
}

export async function lookupEpisodes(id) {
  const lookupString = `lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=10`
  const {
    data: { results },
  } = await axios.get(`https://itunes.apple.com/${lookupString}`)
  return results
}
