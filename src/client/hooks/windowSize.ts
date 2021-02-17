import {useState, useEffect} from 'react';

export function useWindowSize() {
	const [windowSize, setWindowSize] = useState<{
		width?: number;
		height?: number;
	}>({width: undefined, height: undefined});

	useEffect(() => {
		const handleResize = () => setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight
		});

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
}