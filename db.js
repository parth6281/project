const mongoose = require('mongoose');
const { dbUrl } = require('./config');

mongoose.connect(dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'financeDB'
    });

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbUrl}`);
    global.Mongoose = mongoose;
    global.Mongoose.Promise = global.Promise;
})

mongoose.connection.on('error', err => console.log(`Mongoose connection error: ${err}`));

mongoose.connection.on('disconnected', () => console.log(`Mongoose disconnected`));

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    })
};

process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    })
});

process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    })
})

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    })
})

require('./models/users');
require('./models/emidates');
require('./models/expenseCategory');
require('./models/incomeCategory');
require('./models/expense');
require('./models/income');
require('./models/devteam');