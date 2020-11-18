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
    })

const errorFormater = e => {
    let errorsobj = {}
    const errors = e.substring(e.indexOf(':') + 1).trim()
    const errorsInArray = errors.split(',').map(err => err.trim())
    errorsInArray.forEach(error => {
        const [key, value] = error.split(':').map(err => err.trim())
        errorsobj[key] = value
    })
    return errorsobj
}

router.post('/save', upload.single('userImage'), async (req, res) => {
    const user = new User(req.body)
    if (req.file) {
        user.image = req.file.buffer
    }

    try {
        await user.save()
        res.status(200).send({ message: 'user data saved' })
    } catch (e) {
        if(e.code === 11000){
            return res.send({error:{dup:'email already exists!'}})
        }
        res.send({ error: errorFormater(e.message) })
    }
}, (err, req, res, next) => {
    res.status(500).send({ message: err.messaage })
})
router.get('/:email', async (req, res) => {
    const email = req.params.email
    try {
        const user = await User.findOne({ email })
        res.set('Content-Type', 'image/png')
        res.send(user.image)
    } catch (e) {
        res.status(404).send()
    }
})
module.exports = router