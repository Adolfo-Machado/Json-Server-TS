import { Request, Response, NextFunction } from 'express';

const logService = (req: Request, res: Response, next: NextFunction) => {
    let logs: string[] = [];

    logs.push(`\n${req.method} ${req.originalUrl}`);

    if(req.params && Object.keys(req.params).length > 0)
        logs.push(`PARAMS: ${JSON.stringify(req.params)}`);

    if(req.query && Object.keys(req.query).length > 0)
        logs.push(`QUERY: ${JSON.stringify(req.query)} `);

    if(req.headers && Object.keys(req.headers).length > 0)
        logs.push(`HEADERS: ${JSON.stringify(req.headers, null, 2)}`);

    if(req.body && Object.keys(req.body).length > 0)
        logs.push(`BODY: ${JSON.stringify(req.body)}`);

    console.log(logs.join('\n'));

    next();
  };

export default logService;


