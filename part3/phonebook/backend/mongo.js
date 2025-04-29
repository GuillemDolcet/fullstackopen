const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://gdolcet:${password}@cluster0.iefmisx.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

const name = process.argv[3];
const number = process.argv[4]

if (name && number) {
    const phone = new Phone({
        name: name,
        number: number,
    })

    phone.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Phone.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(note => {
            console.log(`${note.name} ${note.number}`)
        })
        mongoose.connection.close()
    })
}