const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function generarToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: '4h' });
}

function verificarToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { generarToken, verificarToken };
// This code provides utility functions for generating and verifying JSON Web Tokens (JWTs) using the 'jsonwebtoken' library.
// The `generarToken` function creates a JWT with a payload and a secret key, setting it to expire in 4 hours.
// The `verificarToken` function checks the validity of a given token against the secret key.
// Both functions are exported for use in other parts of the application, such as authentication and authorization processes.
// Ensure that the JWT_SECRET environment variable is set in your .env file for secure token handling.
// This setup is crucial for implementing secure user authentication in web applications.