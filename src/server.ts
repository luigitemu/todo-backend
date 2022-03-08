import dotenv from "dotenv";

import Server from "./models/server";

/**
 * Start Express server.
 */
dotenv.config();

const server = new Server();
server.listen();
export default server;
