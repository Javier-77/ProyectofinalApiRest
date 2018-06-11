const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const app = express()

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000

var pilotos = [
    {id: 0, numero: '44', name: 'Lewis', lastName: 'Hamilston', team: 'Mercedes', country: 'Reino Unido', dateBirth: '07/01/1985', placeBirth: 'Stevenage, Inglaterra'},
    {id: 1, numero: '5', name: 'Sebastian', lastName: 'Vettel', team: 'Ferrari', country: 'Alemania', dateBirth: '03/07/1987', placeBirth: 'Heppenheim, Alemania'},
	{id: 2, numero: '3', name: 'Daniel', lastName: 'Ricciardo', team: 'RedBull Racing', country: 'Australia', dateBirth: '01/07/1989', placeBirth: 'Perth, Australia'},
	{id: 3, numero: '77', name: 'Valtteri', lastName: 'Bottas', team: 'Mercedez', country: 'Finlandia', dateBirth: '28/08/19879', placeBirth: 'Nastola, Finlandia'},
	{id: 4, numero: '7', name: 'Kimi', lastName: 'Raikkonen', team: 'Ferrari', country: 'Finlandia', dateBirth: '17/10/1979', placeBirth: 'Espoo, Finlandia'},
	{id: 5, numero: '33', name: 'Max', lastName: 'Verstappen', team: 'RedBull Racing', country: 'Países Bajos', dateBirth: '30/09/1997', placeBirth: 'Hasselt, Belgica'},
	{id: 6, numero: '14', name: 'Fernando', lastName: 'Alonso', team: 'Mclaren', country: 'España', dateBirth: '29/07/1981', placeBirth: 'Oviedo, España'},
	{id: 7, numero: '27', name: 'Nico', lastName: 'Hulkenberg', team: 'Renault', country: 'Alemania', dateBirth: '19/08/1987', placeBirth: 'Emmerich am Rhein, Alemania'},    
];

var users = [
    {id: 0, username: 'Admin', name: 'Admin', lastname: 'Admin', email: '1234', password: '1234'},
	{id: 1, username: 'Admin',name: 'Admin2', lastname: 'Admin', email: '1234', password: '1234'}
];

var escuderias = [
    {id: 0, name: 'Mercedes', points: '206', country: 'Alemania',image: 'https://www.formula1.com/content/fom-website/en/championship/teams/Mercedes/_jcr_content/logo.img.jpg/1486740144183.jpg'},
	{id: 1, name: 'Ferrari', points: '198', country: 'Italia',image: 'https://www.formula1.com/content/fom-website/en/championship/teams/Ferrari/_jcr_content/logo.img.jpg/1521797345005.jpg'},
	{id: 2, name: 'RedBull Racing Tag Heuer', points: '134', country: 'Austria',image: 'https://www.formula1.com/content/fom-website/en/championship/teams/Red-Bull/_jcr_content/logo.img.jpg/1514762875081.jpg'},
	{id: 3, name: 'Renault', points: '56', country: 'Francia',image: 'https://www.formula1.com/content/fom-website/en/championship/teams/Renault/_jcr_content/logo.img.jpg/1509095937427.jpg'},
	{id: 4, name: 'Mclare', points: '40', country: 'Reino unido',image: 'https://www.formula1.com/content/fom-website/en/championship/teams/McLaren/_jcr_content/logo.img.jpg/1515152671364.jpg'},
	{id: 5, name: 'Force Indian', points: '28', country: 'Indi',image: 'https://www.formula1.com/content/fom-website/en/championship/teams/Force-India/_jcr_content/logo.img.jpg/1496922112802.jpg'},
	{id: 6, name: 'Toro-Rosso', points: '19', country: 'Italia',image: 'https://www.formula1.com/content/fom-website/en/championship/teams/Toro-Rosso/_jcr_content/logo.img.jpg/1521797337296.jpg'},
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
        if( (value.username == data.UserName) && (value.password == data.Password) ){
            usersTmp[0]['success'] = true;
            usersTmp[0]['id'] = value.id;
			usersTmp[0]['username'] = value.username;
            usersTmp[0]['name'] = value.name;
            usersTmp[0]['lastName'] = value.lastname;
            usersTmp[0]['email'] = value.email;
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
    let itemUser = {id: consecutive, username: data.UserName, name: data.Name, lastName: data.LastName, email: data.Email, password: data.Password};
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
    let itemPista = {id: consecutive, 
			name: data.Name, 
			firstGrandPrix: data.FirstGrandPrix, 
			numberLaps: data.NumberLaps, 
			circuitLength: data.CircuitLength,
			raceDistance: data.RaceDistance, 
			countryPrix: data.CountryPrix};
    pistas.push(itemPista)
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
// Listar escuderias
app.get('/escuderias', (req, res) => {
    let pos = 0;
    escuderias.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(escuderias)
})

// Crear escuderias
app.post('/escuderias', (req, res) => {
    let data = req.body;
    let consecutive = escuderias.length;
    let itemUser = {id: consecutive,
				name: data.Name, 
				points: data.Points, 
				country: data.Country,
	image: 'https://static8.depositphotos.com/1052036/830/v/950/depositphotos_8302285-stock-illustration-racing-flag-with-shield.jpg'};
escuderias.push(itemUser)
    res.send("New escuderias add")
})

// Actualizar escuderias
app.put('/escuderias/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    escuderias[params.id]['name'] = data.Name;
    escuderias[params.id]['points'] = data.Points;
    escuderias[params.id]['country'] = data.Country;	
    escuderias[params.id]['image'] = data.Image;	
    res.send("escuderias update")
})

// Eliminar escuderias
app.delete('/escuderias/:id',(req, res) => {
    let params = req.params;
    escuderias.splice(params.id, 1);
    res.send('escuderias delete')
})
 
//--------------------------------------------------------------------------------------------------------------------------------------------------



http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})