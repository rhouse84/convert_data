require('dotenv');

module.exports = {

	getDbConnectionString: function() {
		//return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds117739.mlab.com:17739/myapi';
		return 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPWD + '@localhost:27017/booklist';
	}
}