// Not even google can access our restAPI since we've not add them here
const allowedOrigins = [
   'http://localhost:3000',
   'https://www.dandrepairshop.com.',
   'https://dandrepairshop.com',
]

module.exports = allowedOrigins