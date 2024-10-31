"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
let opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.MYSECRETKEY,
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
    console.log("PAYLOAD", jwt_payload);
}));
exports.default = passport_1.default;
