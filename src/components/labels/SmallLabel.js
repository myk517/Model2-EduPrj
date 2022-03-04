import React from "react";
import styled from "styled-components";

const StSmallLabel = styled.label`
    padding: 2px 8px 2px 8px;
    height: 10px;
    text-align: left;
    font-size: 0.8rem;
`;

const SmallLabel = (data) => {
    return <StSmallLabel style={data.style}>{data.value}</StSmallLabel>;
};

export default SmallLabel;
