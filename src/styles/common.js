import { css } from "styled-components";

export const flexCenter = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const horizontalCenter = css`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
`;
