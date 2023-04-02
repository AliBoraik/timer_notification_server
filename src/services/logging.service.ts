import { createLogger, format, transports } from "winston";
import morgan from "morgan";

const options = {
    level: "debug",
    handleExceptions: true,
    format: format.json(),
    transports: [
        new transports.Console({
            format: format.simple(),
        }),
    ],
};

export const logger = createLogger(options);

export const httpLogMiddleware = morgan(
    (tokens, req, res) => {
        return [
            tokens["remote-addr"](req, res),
            `username: ${req.username}`,
            tokens.date(req, res, "clf"),
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
        ].join(" ");
    },
    {
        stream: {
            write: (message) => {
                logger.http(message);
            },
        },
    }
);
