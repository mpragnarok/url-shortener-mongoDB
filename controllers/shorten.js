const Url = require('../model/url')
const shortid = require('shortid')
const validUrl = require('valid-url')

module.exports = {
  shortenURL: async (req, res) => {
    const { inputUrl } = req.body
    const urlCode = shortid.generate()
    const baseUrl = process.env.NODE_ENV ? "https://url-shortener-min.herokuapp.com" : "http://localhost:3000"

    try {
      let errors = []


      if (validUrl.isUri(inputUrl)) {
        // find if in the database
        const url = await Url.findOne({ originalUrl: inputUrl })
        if (url) {
          return res.status(200).render('index', { url, inputUrl })
        } else {
          // generate shortenUrl
          const shortUrl = baseUrl + '/' + urlCode

          const newUrl = await Url.create({
            urlCode,
            originalUrl: inputUrl,
            shortenedUrl: shortUrl
          })

          await newUrl.save()
          return res.status(200).render('index', { url: newUrl, errors, inputUrl })

        }
        // show shortened url

      } else {
        errors.push({ message: 'Invalid url' })
        return res.status(401).render('index', { errors, inputUrl })
      }
    } catch (e) {
      res.status(400).send(e)
    }
  },
  originalURL: async (req, res) => {
    let errors = []
    try {
      const urlId = req.params.urlId
      const url = await Url.findOne({ urlCode: urlId })
      if (url) {
        res.redirect(url.originalUrl)
      } else {
        errors.push({ message: 'Url not found. Create one?' })
        res.render('index', { errors })
      }
    } catch (e) {
      res.status(404).send(e)
    }
  }
}