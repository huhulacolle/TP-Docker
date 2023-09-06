import winston from 'winston';

const {
  format: { combine, colorize, timestamp, json },
} = winston;

const consoleTransport = new winston.transports.Console({
  format: combine(
    timestamp(),
    json()
  ),
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [consoleTransport], // Ajout de consoleTransport
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

export default logger;