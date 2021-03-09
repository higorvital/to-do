const{ SnakeNamingStrategy } = require('typeorm-naming-strategies');

module.exports = [
    {
        "name": "default",
        "type": "postgres",
        "host": "",
        "port": 5432,
        "username": "",
        "password": "",
        "database": "",
        "entities": [
            "./dist/modules/**/infra/typeorm/models/*.js"
        ],
        "migrations": [
            "./dist/shared/infra/typeorm/migrations/*.js"
        ],
        "cli": {
            "migrationsDir": "./src/shared/infra/typeorm/migrations"
        },
        "namingStrategy": new SnakeNamingStrategy()
    }
]