import express from "express";
import path from "path";
import session from "express-session";
import morgan from "morgan";
import flash from "connect-flash";
import redis from "redis";
import connectRedis from "connect-redis";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

module.exports = (app) => {
  // Static File Serving and Post Body Parsing
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));
  app.set("views", path.join(__dirname, "..", "areas"));
  app.set("view engine", "ejs");

  // Logging Middleware
  app.use(morgan("tiny"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  function getStore() {
    if (process.env.IS_HEROKU) {
      const RedisStore = connectRedis(session);
      const redisClient = redis.createClient({
        port: parseInt(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
      });
      return new RedisStore({ client: redisClient });
    }
  }

  // Session Configuration
  app.use(
    session({
      store: getStore(), // If nothing returned, expect to use MemoryStore?
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );
  app.use(flash());
};
