# Server

It is a REST application that serves connection with a PostgreSQL database. At this moment it doesnt use any external file storage (although im planning S3), or authentication (JWT planned). To make it run properly please follow the instructions below.

### Project requirements:

Begin with installing all project dependencies:
`npm i`

To use all functionalities you'll need to set up a PostgreSQL on your machine and create any empty database with the name of your choice. Then add corresponding credentials to your **.env** file in the main project directory. It should look like this:

```
PGUSER=your postgreSQL username (by default - postgres)
PGPASSWORD=Password for your PostgreSQL server
PGHOST=host of your database (by default - localhost)
PGPORT=Your db port (by default - 5432)
PGDATABASE=Name of the database you created.
```

After running the app all relevant tables will be created.

And that should be all! To run the app use command:

`npm run start`

And thats it! I hope you'll enjoy using this application!
