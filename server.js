var statik = require('statik');
statik({
	port: process.env.PORT || 3333,
	root: './build'
});
