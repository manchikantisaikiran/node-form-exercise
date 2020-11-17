const express = require('express')
const User = require('../db/models/user')
const router = express.Router()
const multer = require('multer')

const upload = multer(
    {
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(RegExp('\.(jpg|png|jpeg)$', 'i'))) {
            return cb(new Error('file must be a image'))
        }
        cb(undefined, true)
    }
}
)

router.post('/save', upload.single('userImage'), async (req, res) => {
    const user = new User(req.body)
    if(req.file){
        user.image = req.file.buffer
    }
    try {
        await user.save()
        res.status(200).send({message:'user data saved'})
    } catch (e) {
        res.status(400).send()
    }
}, (err, req, res, next) => {
    res.status(500).send({ message: err.message })
})
router.get('/', async (req, res) => {
    try {
        const user = await User.findOne({ email: 'manchikantisaikiran7@gmail.com' })
        res.set('Content-Type', 'image/png')
        res.send(user.image)
    } catch (e) {
        res.status(404).send()
    }
})
module.exports = router