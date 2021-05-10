import _trim from 'lodash/trim';

export default function isAccessAllowed(route: string, roleAlias: string | undefined): boolean {
	const parts = _trim(route, '/').toLowerCase().split('/');

	if (['dashboard'].includes(parts[0])) {
		if (!roleAlias || !['admin', 'super-admin', 'client'].includes(roleAlias)) {
			return false;
		}
	}

	return true;
}