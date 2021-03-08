"use strict";
var SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;
module.exports = [
    {
        "name": "default",
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "docker",
        "database": "todo",
        "entities": [
            "./src/modules/**/infra/typeorm/models/*.ts"
        ],
        "migrations": [
            "./src/shared/infra/typeorm/migrations/*.ts"
        ],
        "cli": {
            "migrationsDir": "./src/shared/infra/typeorm/migrations"
        },
        "namingStrategy": new SnakeNamingStrategy()
    }
];
