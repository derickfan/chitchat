import styled from "@emotion/styled";

interface StyleProps {
	direction?: "row" | "column" | "row-reverse";
	justify?: string;
	align?: string;
	textAlign?: string;
	height?: string;
	width?: string;
	flex?: number | string;
	outline?: string;
	padding?: string;
	margin?: string;
	onClick?: () => void;
}

interface IProps extends StyleProps {
	children: JSX.Element | JSX.Element[] | string;
}

const FlexContainer = (props: IProps) => {
	const { children, onClick, ...styles } = props;

	return <StyledFlexContainer {...styles} onClick={onClick}>{children}</StyledFlexContainer>;
};

export default FlexContainer;

const StyledFlexContainer = styled.div<StyleProps>`
	display: flex;
	justify-content: ${(p) => p.justify || "center"};
	text-align: ${(p) => p.textAlign || "center"};
	align-items: ${(p) => p.align || "center"};
	/* flex: ${(p) => p.flex || "0 1 auto"}; */
	height: ${(p) => p.height || "100%"};
	width: ${(p) => p.width || "100%"};
	flex-direction: ${(p) => p.direction || "column"};
	/* outline: ${(p) => p.outline || "1px solid white"}; */
	padding: ${(p) => p.padding || "0"};
	margin: ${(p) => p.margin || "0"};
`;
