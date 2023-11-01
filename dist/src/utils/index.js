"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
const generateResponse = (success = false, data = null, error = null) => {
    let temp = {
        success,
        data,
        error,
        metadata: {
            timestamp: new Date(),
        }
    };
    if (data !== null && Array.isArray(data)) {
        temp.metadata.length = data.length;
    }
    return temp;
};
exports.generateResponse = generateResponse;
