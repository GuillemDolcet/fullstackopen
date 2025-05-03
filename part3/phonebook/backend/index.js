require('dotenv').config()

const express = require('express')
const app = express()
const Persons = require('./models/persons')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', async (request, response) => {
    Persons.countDocuments({})
        .then(count => {
            response.send(`
                <div>Phonebook has info for ${count} people</div>
                <br />
                <div>${new Date()}</div>
            `)
        })
})

app.get('/api/persons', (request, response, next) => {
    Persons.find({})
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Persons.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Persons({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    const update = { name, number }

    Persons.findByIdAndUpdate(request.params.id, update, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
    Persons.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})