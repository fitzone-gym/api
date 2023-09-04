import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5400;

export const config = {
  server: {
    port: PORT,
  },
};
