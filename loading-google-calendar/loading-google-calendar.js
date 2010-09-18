/*
 * Nodejs
 * http://www.nodejs.es
 *
 * EJemplo de lectura de un calendario de google utilizando un HTTP Client
 * @author Damian Suarez
 *
 */
var http = require('http')

  // necesitamos un calendario publicode ejemplo.
  , calendar= {
    'id': 'jgqs3n5kh7d327jq6bgok30klo@group.calendar.google.com',
    'path': '/calendar/feeds/',
    'private-type': 'public',
    'type': 'basic',
    'data-type': 'json'
  }
  ,  url = calendar.path + calendar.id + '/' + calendar['private-type'] + '/' + calendar['type'] + '?' + 'alt=' + calendar['data-type']

  // definimos una variable que irá acumulando los chunks hasta completar el body
  ,  bodyCalendar = ''

  // creamos un objeto HTTP cliente
  ,  googleCalendar = http.createClient(80, 'www.google.com')

  // realizamos una peticion del servidor
  ,  request = googleCalendar.request('GET', url, {
      'host': 'www.google.com'
    });


// agregamos un listener 'response' al objeto request.
request.on('response', function (response) {
  // seteamos codificacion
  response.setEncoding('utf8');

  // Agregamos el evento 'data' ...
  response.on('data', function(chunk){

    // ... para recibir los chunks y acumularlos en el string bodyCalendar
    bodyCalendar+= chunk;
  });

  // escuchamos el evento 'end' para finalmente imprimir el calendario tomado.
  response.on('end', function(){
    // guardamos en dataCalendar el parseo del string a una estructura JSON
    var dataCalendar = JSON.parse(bodyCalendar);

    console.log(dataCalendar);
  });

});

// finalizamos el request.
request.end();