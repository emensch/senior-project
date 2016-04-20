// Set these to your values and rename file to env.config.js
process.env['RETHINK_AUTHKEY'] = 'authkey';
process.env['RETHINK_DBNAME'] = 'dbname';

process.env['JWT_SECRET'] = 'supersecret';

// Genetic vars
process.env['CROSSOVER_PERCENTAGE'] = 0.5;
process.env['MUTATION_RATE'] = 0.02;
process.env['POP_SIZE'] = 10;
process.env['FITNESS_THRESHOLD'] = 10;