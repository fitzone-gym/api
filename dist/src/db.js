"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
    host: "fitzone.mysql.database.azure.com",
    user: "fitzoneAdmin",
    password: "gymmgnt123*",
    port: 3306,
    database: "fit_zone",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};
exports.default = dbConfig;
