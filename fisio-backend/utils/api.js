// En este modulo vamos a importar la apo de chatgpt 3.5 para que esta puede ejcutar 
//Archivos .json y este pueda dar una sugerencia a los medicos que las estan usando//
require ('dotenv').config();
import openia from 'openai';
const openia = new 'OpenAi'({
    apiKey : process.env.apiKey,
});

