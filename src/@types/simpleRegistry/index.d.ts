declare module 'simple-registry' {
	export function set(key: string, value: any): void;
	export function get(key: string): any;
	export function has(key: string): boolean;
}