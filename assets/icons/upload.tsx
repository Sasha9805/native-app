import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const UploadIcon = () => (
	<Svg width={24} height={24} fill="none">
		<Path
			stroke="#fff"
			strokeLinecap="round"
			strokeWidth={1.5}
			d="M6.286 19C3.919 19 2 17.104 2 14.765c0-2.34 1.919-4.236 4.286-4.236.284 0 .562.028.83.08m7.265-2.582a5.765 5.765 0 0 1 1.905-.321c.654 0 1.283.109 1.87.309m-11.04 2.594a5.577 5.577 0 0 1-.354-1.962C6.762 5.528 9.32 3 12.476 3c2.94 0 5.361 2.194 5.68 5.015m-11.04 2.594a4.29 4.29 0 0 1 1.55.634m9.49-3.228C20.392 8.78 22 10.881 22 13.353c0 2.707-1.927 4.97-4.5 5.52"
		/>
		<Path
			stroke="#fff"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M12 16v6m0-6 2 2m-2-2-2 2"
		/>
	</Svg>
);

export default UploadIcon;
