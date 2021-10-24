import { Grid } from "@mui/material";
import React from "react";
import * as ReactIs from "react-is";

interface InitialProps {
	children: JSX.Element[];
}

const GridItems = (props: InitialProps) => {
	const { children } = props;

	const renderFragmentChildren = (fragment: JSX.Element) => {
		return React.Children.map(
			fragment.props.children,
			(child: JSX.Element, idx: number) => (
				<Grid xs={12} item={true} key={idx}>
					{child}
				</Grid>
			)
		);
	};

	return (
		<>
			{children.map((element, idx) =>
				ReactIs.isFragment(element) ? (
					renderFragmentChildren(element)
				) : (
					<Grid xs={12} key={idx} item>
						{element}
					</Grid>
				)
			)}
		</>
	);
};

export default GridItems;
