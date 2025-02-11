import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class LoggerService extends Logger {
  private readonly winstonLogger: winston.Logger;

  constructor() {
    super();

    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    this.winstonLogger = winston.createLogger({
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [
        new winston.transports.File({
          filename: path.join(logDir, 'error.log'),
          level: 'error',
        }),
        new winston.transports.File({
          filename: path.join(logDir, 'combined.log'),
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    super.log(message, context);

    this.winstonLogger.info({ message, context });
  }

  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context);

    this.winstonLogger.error({ message, trace, context });
  }

  productCreated(productId: string, productName: string) {
    this.log(`Nouveau produit créé - ID: ${productId}, Nom: ${productName}`, 'ProductsService');
  }

  productUpdated(productId: string, productName: string) {
    this.log(`Produit mis à jour - ID: ${productId}, Nom: ${productName}`, 'ProductsService');
  }

  productDeleted(productId: string) {
    this.log(`Produit supprimé - ID: ${productId}`, 'ProductsService');
  }
}
