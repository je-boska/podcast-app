import axios from 'axios'

export async function searchPodcasts(searchTerm, limit) {
  const { data } = await axios.get(`/api/search/${searchTerm}/${limit}`)
  let moreResults = true
  if (data.length < limit) {
    moreResults = false
  }
  return { results: data, moreResults }
}

export async function lookupEpisodes(id) {
  const { data } = await axios.get(`/api/lookup/${id}`)
  return data
}
