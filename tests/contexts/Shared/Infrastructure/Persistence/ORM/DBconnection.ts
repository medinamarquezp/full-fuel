const { Sequelize } = require('sequelize');

let sequelize;

(async() => {
	try {
		sequelize = new Sequelize({
			database: process.env.MYSQL_DATABASE || '',
			username: process.env.MYSQL_USER || '',
			password: process.env.MYSQL_PASSWORD || '',
			host: process.env.MYSQL_HOST || 'localhost',
			port: process.env.MYSQL_PORT || 3306,
			dialect: 'mysql',
			logging: true,
			define: {
				charset: 'utf8',
				collate: 'utf8_general_ci'
			}
		});
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch(error) {
		console.error('Unable to connect to the database:', error);
	} finally {
		await sequelize.close()
	}
})();
