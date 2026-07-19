import winston from "winston";
import fs from "fs";
import path from "path";

// ensure logs folder exists before winston tries to write to it
const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const { combine, timestamp, printf, colorize, errors } = winston.format;

// custom format for console output
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
  level: "debug", 
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true })
  ),
  transports: [
    // save ALL logs to combined.log
    new winston.transports.File({
      filename: path.join(logsDir, "combined.log"),
    }),

    // save ONLY errors to error.log
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error",
    }),

    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "HH:mm:ss" }),
        consoleFormat
      ),
    }),
  ],
});

export default logger;