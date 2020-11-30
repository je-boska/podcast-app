const express = require("express")
const axios = require("axios")
const router = express.Router()

// @desc    Fetch search results
// @route   GET /api/search
// @access  Public
router.get('/search/:term', async (req, res) => {
    const searchString = `search?entity=podcast&term=${req.params.term}&limit=10`
    const { data: { results } } = await axios.get(`https://itunes.apple.com/${searchString}`)
    res.send(results)
})

// @desc    Fetch episodes
// @route   GET /api/lookup
// @access  Public
router.get('/lookup/:id', async (req, res) => {
    const lookupString = `lookup?id=${req.params.id}&media=podcast&entity=podcastEpisode&limit=50`
    const { data: { results } } = await axios.get(`https://itunes.apple.com/${lookupString}`)
    res.send(results)
})

module.exports = router