import 'ignore-styles';
import {run as bootstrapApp} from './server/components/bootstrap';
import {run as runExpress} from './server/components/express';

import path from 'path';

bootstrapApp(path.resolve(__dirname, '../'))
	.then(async () => await runExpress());