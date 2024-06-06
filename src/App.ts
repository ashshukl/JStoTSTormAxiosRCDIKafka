import bodyParser from "body-parser";
import express, { NextFunction } from "express";

class Application {
  //property holds express server instance
  app: express.Express;

  //Creates Express Object and calls methods to load middlewares
  constructor() {
    this.app = express();
    this.configureMessagingMiddleware();
    this.configureExceptionHandlingMiddleware();
  }

  //Mounts Messaging related middleware
  private configureMessagingMiddleware() {
    //Mounts json parser to parse req.body
    this.app.use(bodyParser.json());
    //Mount parser to parse req.body containing url encoded data
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  //Mounts global exception handlling Middleware
  private configureExceptionHandlingMiddleware() {
    //Mount global exception handling middleware
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: NextFunction
      ) => {
        console.log("Global Exception Handler");
        console.log(JSON.stringify(err));
      }
    );
  }

  public startServer() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(
        `Server started\n`,
        `Server listening on http://localhost:${port}`
      );
    });
  }
}

export const App: Application = new Application();
