import axios from 'axios'

export async function searchPodcasts(searchTerm) {
  const { data } = await axios.get(`/api/search/${searchTerm}`)
  return data
}

export async function lookupEpisodes(id) {
  const { data } = await axios.get(`/api/lookup/${id}`)
  return data
}
