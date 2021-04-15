Sean's db integration (see Main branch for break down of tasks):


Implemented MySQL(with Sequelizer) and MongoDb services.
    - ONLY the sign up, login, and create post features are completed. 
    - ONLY works on local, not deployed to Heroku


Quickstart steps:
    Switch services at the following files:
        - src/server.ts
        - src/middleware/passport.middlewares.ts

    MongoDb quickstart 
        1 - Make sure the MongoDb server and connection string is correct at "Mongodb/databaseConnection.ts"
        2 - run "npm run dev" to start app

    MySQL quickstart:
        1 - Create a database named "oop_term_project" in your local MySQL.
        2 - add your password for your MySQL connection to files inside "/config" folder. 
        3 - Run following migration files in folder "/migrations". 
            $ npx sequelize-cli db:migrate --to 20210405172849-create-user.js
            $ npx sequelize-cli db:migrate --to 20210405224337-create-post.js
            $ npx sequelize-cli db:migrate --to 20210407050835-v1.1-upgrade.js
        4 - run "npm run dev" to start app


