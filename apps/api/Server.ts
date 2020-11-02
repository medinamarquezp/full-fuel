import { Express } from "express";

export class Server{
  private app: Express;
  private port = process.env.SERVER_PORT || 8000;

  constructor(app: Express) {
    this.app = app;
  }

  start(): void{
    this.app.listen(this.port, () => console.log(`API server listen on port ${this.port}`));
  }
}
