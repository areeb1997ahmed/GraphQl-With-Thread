"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./graphQl/index"));
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8000;
const ExpressServer = () => __awaiter(void 0, void 0, void 0, function* () {
    app.get('/', (req, res) => {
        res.json({ message: 'Hello World!' });
    });
    app.use('/graphql', (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(yield (0, index_1.default)()));
    app.listen(port, () => {
        console.log(`Express is listening at http://localhost:${port}`);
    });
});
ExpressServer();
