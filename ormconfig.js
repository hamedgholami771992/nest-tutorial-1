module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "pass123",
    database: "postgres",
    entities: ["dist/**/*.entity.js"],   //let typeOrm to know where the entities are located, need to work on compiled files which nest outputs in the /dist folder
    migration: ["dist/migration/*.js"],   //let typeOrm to know where the migrations are located
    cli: {
        migrationsDir: "src/migrations"
    }
}