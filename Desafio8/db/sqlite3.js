const options = {
    client: 'sqlite3',
    connection: { filename: './mydb.sqlite' }
    //genera un archivo con toda la base de datos en binario 
}
  
  module.exports = {
    options
  }

  //Configuracion de sqlite3