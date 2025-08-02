const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo;

beforeAll(async () => {
        // Mock the connectDB function to prevent it from being called during tests
    jest.mock('./config/db', () => () => {
        console.log('✅ Mocking database connection for tests.');
    });

    mongo = await MongoMemoryServer.create();
    const url = mongo.getUri();

    await mongoose.connect (url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
});

afterAll (async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (let key in collections) {
        await collections[key].deleteMany( {} );
    }
});