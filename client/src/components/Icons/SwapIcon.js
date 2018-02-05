import React from "react";
import PropTypes from "prop-types";

const SwapIcon = ({style}) => {
	return (
		<svg style={style} fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			<path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
			<path d="M0 0h24v24H0z" fill="none"/>
		</svg>
	);
};

SwapIcon.propTypes = {
	style: PropTypes.object
};

export default SwapIcon;