require('dotenv');

module.exports = {

	getDbConnectionString: function() {
		return 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPWD + process.env.DBURL;
	}
}
