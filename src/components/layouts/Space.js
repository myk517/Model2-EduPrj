import React from "react";
import styled from "styled-components";

const StSpace = styled.div``;

const Space = (data) => {
    return <StSpace>{data.children}</StSpace>;
};

export default Space;
