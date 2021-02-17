const tutorRegExp = /^\/tutor($|\/)/;
const studentRegExp = /^\/student($|\/)/;

export default function isAccessAllowed(route: string, roleAlias: string | undefined): boolean {
	if (
		tutorRegExp.test(route)
		&& (!roleAlias || !['admin', 'super-admin', 'teacher'].includes(roleAlias))
	) {
		return false;
	}

	if (
		studentRegExp.test(route)
		&& (!roleAlias || !['tutor-course'].includes(roleAlias))
	) {
		return false;
	}

	return true;
}