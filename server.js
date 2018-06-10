const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const app = express()

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000

var pilotos = [
    {id: 0, numero: '44', name: 'Lewis', lastName: 'Hamilston', team: 'Mercedez', country: 'Reino Unido', dateBirth: '07/01/1985', placeBirth: 'Stevenage, Inglaterra'},
    {id: 1, numero: '5', name: 'Sebastian', lastName: 'Vettel', team: 'Ferrari', country: 'Alemania', dateBirth: '03/07/1987', placeBirth: 'Heppenheim, Alemania'},
	{id: 2, numero: '3', name: 'Daniel', lastName: 'Ricciardo', team: 'RedBull Racing', country: 'Australia', dateBirth: '01/07/1989', placeBirth: 'Perth, Australia'},
	{id: 3, numero: '77', name: 'Valtteri', lastName: 'Bottas', team: 'Mercedez', country: 'Finlandia', dateBirth: '28/08/19879', placeBirth: 'Nastola, Finlandia'},
	{id: 4, numero: '7', name: 'Kimi', lastName: 'Raikkonen', team: 'Ferrari', country: 'Finlandia', dateBirth: '17/10/1979', placeBirth: 'Espoo, Finlandia'},
	{id: 5, numero: '33', name: 'Max', lastName: 'Verstappen', team: 'RedBull Racing', country: 'Países Bajos', dateBirth: '30/09/1997', placeBirth: 'Hasselt, Belgica'},
	{id: 6, numero: '14', name: 'Fernando', lastName: 'Alonso', team: 'Mclaren', country: 'España', dateBirth: '29/07/1981', placeBirth: 'Oviedo, España'},
	{id: 7, numero: '27', name: 'Nico', lastName: 'Hulkenberg', team: 'Renault', country: 'Alemania', dateBirth: '19/08/1987', placeBirth: 'Emmerich am Rhein, Alemania'},    
];

var users = [
    {id: 0, userName: 'Admin', name: 'Admin', lastName: 'Admin', email: '1234', password: '1234'},
	{id: 1, userName: 'Admin',name: 'Admin2', lastName: 'Admin', email: '1234', password: '1234'}
];

var pistas = [
    {id: 0, name: 'Circuito grand prix de Melbourne', firstGrandPrix: '1996', numberLaps: '58', circuitLength: '5.303 Km', raceDistance: '307.574 Km', countryPrix: 'Australia'},
    {id: 1, name: 'Circuito internacional de Shangai', firstGrandPrix: '2004', numberLaps: '56', circuitLength: '5.451 Km', raceDistance: '305.066 Km', countryPrix: 'China'},
	{id: 2, name: 'Circuito internacional de Bahrain', firstGrandPrix: '2004', numberLaps: '57', circuitLength: '5.412 Km', raceDistance: '308.238 Km', countryPrix: 'Sakhir'},
	{id: 3, name: 'Autodromo Sochi', firstGrandPrix: '2014', numberLaps: '53', circuitLength: '5.848 Km', raceDistance: '309.745 Km', countryPrix: 'Rusia'},
	{id: 4, name: 'Circuito de Barcelona-Catalunya', firstGrandPrix: '1991', numberLaps: '66', circuitLength: '4.655 Km', raceDistance: '307.104 Km', countryPrix: 'España'},
	{id: 5, name: 'Circuito de Monaco', firstGrandPrix: '1950', numberLaps: '78', circuitLength: '3.337 Km', raceDistance: '206.286 Km', countryPrix: 'Monaco'},
	{id: 6, name: 'Circuito  Gilles-Villenueve', firstGrandPrix: '1978', numberLaps: '70', circuitLength: '4.361 Km', raceDistance: '305.27 Km', countryPrix: 'Canada'},
];

// soporte para body codificados en jsonsupport
app.use(bodyParser.json());
// soporte para body codificados
app.use(bodyParser.urlencoded({ extended: true }));
 
app.get('/', (req, res) => {
  res.status(200).send("HHOLA hola")
})

//--------------------------------------------------------------------------------------------------------------------------------------------------
// Listar pilotos
app.get('/pilotos', (req, res) => {
    let pos = 0;
    pilotos.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(pilotos)
})

// Crear pilotos
app.post('/pilotos', (req, res) => {
    let data = req.body;
    let consecutive = pilotos.length;
    let itemUser = {id: consecutive,
				numero:data.Numero, 
				name: data.Name, 
				lastName: data.LastName, 
				team: data.Team, 
				country: data.Country, 
				dateBirth: data.DateBirth, 
				placeBirth: data.PlaceBirth};
    pilotos.push(itemUser)
    res.send("New piloto add")
})

// Actualizar pilotos
app.put('/pilotos/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    pilotos[params.id]['numero'] = data.Numero;
    pilotos[params.id]['name'] = data.Name;
    pilotos[params.id]['lastName'] = data.LastName;
    pilotos[params.id]['team'] = data.Team;
    pilotos[params.id]['country'] = data.Country;	
    pilotos[params.id]['dateBirth'] = data.DateBirth;	
    pilotos[params.id]['placeBirth'] = data.PlaceBirth;	
    res.send("piloto update")
})

// Eliminar pilotos
app.delete('/pilotos/:id',(req, res) => {
    let params = req.params;
    pilotos.splice(params.id, 1);
    res.send('piloto delete')
})
 
//--------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/validateUser', (req, res) => {
    let data = req.body;
    let usersTmp = [{success: false, id: 0, username: '', name: '',lastName: '', email: '', password: ''}];

    users.some(function (value, index, _arr) {
        if( (value.userName == data.userName) && (value.password == data.Password) ){
            usersTmp[0]['success'] = true;
            usersTmp[0]['id'] = value.id;
			usersTmp[0]['userName'] = value.userName;
            usersTmp[0]['name'] = value.name;
            usersTmp[0]['lastName'] = value.lastname;
            usersTmp[0]['email'] = value.value.email;
            usersTmp[0]['password'] = value.password;
            return true;
        }else{
            return false;
        }
    });

    res.send(usersTmp)
})



// Listar users
app.get('/users', (req, res) => {
    let pos = 0;
    users.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(users)
})


// Crear usuarios
app.post('/users', (req, res) => {
    let data = req.body;
    let consecutive = users.length;
    let itemUser = {id: consecutive, userName: data.UserName, name: data.Name, lastName: data.LastName, email: data.Email, password: data.Password};
    users.push(itemUser)
    res.send("New users add")
})

// Actualizar usuarios
app.put('/users/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    users[params.id]['userName'] = data.UserName;
    users[params.id]['name'] = data.Name;
	users[params.id]['lastName'] = data.LastName;
	users[params.id]['email'] = data.Email;
	users[params.id]['password'] = data.Password;
    res.send("usuario update")
})

// Eliminar usuarios
app.delete('/users/:id',(req, res) => {
    let params = req.params;
    users.splice(params.id, 1);
    res.send('users delete')
})



//--------------------------------------------------------------------------------------------------------------------------------------------------

// Listar pistas
app.get('/pistas', (req, res) => {
    let pos = 0;
    pistas.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(pistas)
})



// Crear pistas
app.post('/pistas', (req, res) => {
    let data = req.body;
    let consecutive = pistas.length;
    let itemUser = {id: consecutive, name: data.Name, firstGrandPrix: data.FirstGrandPrix, numberLaps: data.NumberLaps, circuitLength: data.CircuitLength,
						raceDistance: data.RaceDistance, countryPrix: data.CountryPrix};
    pilotos.push(itemUser)
    res.send("New pistas add")
})

// Actualizar pistas
app.put('/pistas/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    pistas[params.id]['name'] = data.Name;
    pistas[params.id]['firstGrandPrix'] = data.FirstGrandPrix;
    pistas[params.id]['numberLaps'] = data.NumberLaps;
    pistas[params.id]['circuitLength'] = data.CircuitLength;
    pistas[params.id]['raceDistance'] = data.RaceDistance;
    pistas[params.id]['countryPrix'] = data.CountryPrix;
    res.send("pistas update")
})

// Eliminar pistas
app.delete('/pistas/:id',(req, res) => {
    let params = req.params;
    pistas.splice(params.id, 1);
    res.send('pistas delete')
})

//-------------------------------------------------------------------------------------------------------------------------------------------------- 
http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})