const mongoose = require('mongoose')
// process.env.MONGODBURL
mongoose.connect(process.env.MONGODBURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})