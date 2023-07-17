import cors from 'cors';

export const corsAsync = (options: cors.CorsOptions) => {
  const corsMiddleware = cors(options);
  return (req: any, res: any) =>
    new Promise<void>((resolve, reject) =>
      corsMiddleware(req, res, (err) => {
        err ? reject(err) : resolve();
      })
    );
};
