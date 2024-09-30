const express = require('express');
const cors = require('cors');


const app = express()
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
const {fakerDE, fakerRO, fakerPL} = require('@faker-js/faker');

function generateFakeData(startIndex, limit, seed, locale) {
    let data = [];
    let fakerLocale = locale === 'DE' ? fakerDE : locale === 'PL' ? fakerPL : fakerRO
    if (seed) {
        fakerLocale.seed(seed);
    }

    for (let i = 0; i < limit; i++) {

        data.push({
            number: startIndex + i + 1,
            id: fakerLocale.string.uuid(),
            phone: fakerLocale.phone.number({style: 'national'}),
            fullName: fakerLocale.person.fullName() + ' ' + fakerLocale.person.firstName('male'),
            address: fakerLocale.location.buildingNumber(),
        });
    }
    return data;
}

function filterData(data, filters) {
    if (filters.name) {
        data = data.filter(item => item.name.toLowerCase().includes(filters.name.toLowerCase()));
    }
    if (filters.email) {
        data = data.filter(item => item.email.toLowerCase().includes(filters.email.toLowerCase()));
    }
    return data;
}

app.post('/params', (req, res) => {
    const page = req.body.page || 1;
    const limit = page === 1 ? 20 : 10;

    const startIndex = (page === 1 ? page - 1 : page) * limit;

    const seed = req.body.seed || null;
    const locale = req.body.region.locale || 'RO'

    let data = generateFakeData(startIndex, limit, seed, locale);

    const filters = req.body.filters || {};

    data = filterData(data, filters);

    const response = {
        page,
        limit,
        users: data,
        seed: seed
    };

    res.json(response);
})


app.listen(3000, () => {
    console.log("Start")
})
