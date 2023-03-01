const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const axios = require('axios');

async function pokemonConfig(PokemonName) {
    const config = {
        method: "get",
        url: `https://pokeapi.co/api/v2/pokemon/${PokemonName}`
    }

    const res = await axios(config)
    return res.data
}

async function makeRequest() {
    const pokemon1 = await pokemonConfig('squirtle')
    const pokemon2 = await pokemonConfig('pikachu')
    const pokemon3 = await pokemonConfig('charizard')

    const map = new Map()
    map.set('squirtle', pokemon1)
    map.set('pikachu', pokemon2)
    map.set('charizard', pokemon3)
    return map
}
app.use( express.static( "./media" ) );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const pokemonData = await makeRequest()
    res.render('index', { title: "Pokemon", header: "List of Pokemon",
                            pokemon1: pokemonData.get('squirtle'),
                            pokemon2: pokemonData.get('pikachu'),
                            pokemon3: pokemonData.get('charizard')
                        })
})

app.listen(port, () => {
    console.log("Server is running on port 3000.")
    console.log("http://localhost:3000`")
})

