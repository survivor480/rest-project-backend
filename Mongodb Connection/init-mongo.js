db.createUser(
    {
        user: "restuser",
        pwd: "qwerty78",
        roles: [
        {
            role: "readWrite",
            db: "rest"
        }
        ]
    }
);
db.createCollection('users');
db.users.insertOne(
    {
        name: 'Bill Palmer'
    }
);