"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
class Application {
    //Creates Express Object and calls methods to load middlewares
    constructor() {
        this.app = (0, express_1.default)();
        this.configureMessagingMiddleware();
        this.configureExceptionHandlingMiddleware();
    }
    //Mounts Messaging related middleware
    configureMessagingMiddleware() {
        //Mounts json parser to parse req.body
        this.app.use(body_parser_1.default.json());
        //Mount parser to parse req.body containing url encoded data
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    //Mounts global exception handlling Middleware
    configureExceptionHandlingMiddleware() {
        //Mount global exception handling middleware
        this.app.use((err, req, res, next) => {
            console.log("Global Exception Handler");
            console.log(JSON.stringify(err));
        });
    }
    startServer() {
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server started\n`, `Server listening on http://localhost:${port}`);
        });
    }
}
exports.App = new Application();
//# sourceMappingURL=App.js.map