import React from "react";
import styled from "styled-components";

const StSpan = styled.span`
    text-align: left;
    padding: 8px 0px 8px 0px;
    font-weight: bold;
    font-size: 1.2rem;
`;

const Span = (data) => {
    return <StSpan style={data.style}>{data.value}</StSpan>;
};

export default Span;
