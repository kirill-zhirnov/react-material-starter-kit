const {series} = require('gulp');
const axios = require('axios');
const mkdirp = require('mkdirp');
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

require('dotenv').config();

function makeI18nFiles() {
	const daPath = `${__dirname}/runtime/ru.json`;

	return mkdirp(`${__dirname}/runtime`)
		.then(() => axios.get(`${process.env.API_BACKEND_PREFIX}/i18n/get-json/frontend?lang=ru`))
		.then(({data}) => writeFile(daPath, JSON.stringify(data), {encoding: 'utf8', flag: 'w'}))
	;
}

exports.default = makeI18nFiles;