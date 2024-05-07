const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/request.log');

function requestLogger(req, res, next) {
  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} IP: ${req.ip}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Erro ao gravar o log da solicitação:', err);
    }
  });

  next();
}

module.exports = requestLogger;
