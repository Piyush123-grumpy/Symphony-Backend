import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDirectory = path.join(__dirname, '..', 'logs');
const logFilePath = path.join(logsDirectory, 'audit_log.txt');

const auditLogger = (_id, email, action) => {
  // Create the logs directory if it doesn't exist
  if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
  }

  const logEntry = `${new Date().toISOString()} - User ID: ${_id}, Username: ${email}, Action: ${action}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Error writing to audit log:', err);
    }
  });
};

export default auditLogger;
