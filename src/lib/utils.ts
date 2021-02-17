import {FormikProps, FormikValues} from 'formik';
import {FormikHandlers} from 'formik/dist/types';
import _forEach from 'lodash/forEach';
import _isObject from 'lodash/isObject';

interface IFieldAttrs {
	name: string;
	error: boolean;
	value: string;
	onChange: FormikHandlers['handleChange'];
	helperText?: string;
}

export function fieldAttrs<V extends FormikValues>(field: string, formikProps: FormikProps<V>, helperText: string = ''): IFieldAttrs {
	const {errors, values, handleChange} = formikProps;

	let error = false;
	if (field in errors && errors[field]) {
		error = true;
		helperText = errors[field] as string;
	}

	const out: IFieldAttrs = {
		name: field,
		error,
		value: '',
		onChange: handleChange
	};

	if (field in values) {
		out.value = values[field];
	}

	if (helperText)
		out.helperText = helperText;

	return out;
}

export function makeBackendUrl(url: string, getParams: TGetParams | null = null) {
	let finalUrl: string = `${process.env.API_BACKEND_PREFIX}${url}`;

	if (getParams) {
		finalUrl += `?${createGetStr(getParams)}`;
	}

	return finalUrl;
}

export function yiiErrors2Formik(errors: {field: string; message: string}[]) {
	const out: {[field: string]: string} = {};

	if (Array.isArray(errors)) {
		errors.forEach(({field, message}) => out[field] = message);
	}

	return out;
}

export function	prepareFormikValues<T = {[key: string]: string}>(attrs: {[key: string]: any}): T {
	const out: {[key: string]: string} = {};
	Object.keys(attrs).forEach((key) => {
		out[key] = (attrs[key] === null) ? '' : String(attrs[key]);
	});

	return out as unknown as T;
}

export type TGetParams = {[param: string]: string | object | number} | string[];
export function createGetStr(params: TGetParams, skipRoot: string[] = [], prefix: string = '') {
	const out: string[] = [];
	const isArray = Array.isArray(params);

	_forEach(params, (val, key) => {
		if (skipRoot.indexOf(key) !== -1)
			return;

		let name;
		if (prefix !== '') {
			name = (!isArray) ? `${prefix}[${key}]` : `${prefix}[]`;
		} else {
			name = key;
		}

		if (_isObject(val) || Array.isArray(val)) {
			out.push(createGetStr(val as {}, [], name));
		} else {
			if (val === null) {
				val = '';
			}

			val = encodeURIComponent(val as string);
			out.push(`${name}=${val}`);
		}
	});

	return out.join('&');
}

export function extractPaginationFromHeaders(headers: {[key: string]: string}) {
	const headers2Keys = {
		'x-pagination-total-count': 'totalCount',
		'x-pagination-page-count': 'pageCount',
		'x-pagination-current-page': 'currentPage',
		'x-pagination-per-page': 'perPage'
	};

	const pagination: {
		totalCount?: number,
		pageCount?: number,
		currentPage?: number,
		perPage?: number
	} = {};

	for (const [header, key] of Object.entries(headers2Keys)) {
		if (header in headers) {
			//@ts-ignore
			pagination[key] = parseInt(headers[header]);
		}
	}

	return pagination;
}