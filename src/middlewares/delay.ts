import { Request, Response, NextFunction } from 'express';

// Middleware para adicionar delay às respostas
const delayMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const delay = parseInt(process.env.DELAY_MS || "500"); // Define o delay em milissegundos

  // console.log('delay: ', delay);

  setTimeout(() => {
    next(); // Continua para o próximo middleware ou rota
  }, delay);
};

export default delayMiddleware;
