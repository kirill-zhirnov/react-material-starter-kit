const axios = require('axios');
const mkdirp = require('mkdirp');
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

require('dotenv').config();

function makeI18nFiles() {
	const jsonFilePath = `${__dirname}/runtime/${process.env.I18N_LANG}.json`;

	return mkdirp(`${__dirname}/runtime`)
		.then(() => {
			if (['1', 'true'].includes(process.env.I18N_LOAD_LANG_ON_BUILD)) {
				return axios.get(`${process.env.API_BACKEND_PREFIX}/i18n/get-json/frontend?lang=${process.env.I18N_LANG}`);
			} else {
				return {
					data: {}
				};
			}
		})
		.then(({data}) => writeFile(jsonFilePath, JSON.stringify(data), {encoding: 'utf8', flag: 'w'}))
	;
}

exports.default = makeI18nFiles;