import React from "react";
import styled from "styled-components";

const StResponsiveRowArticle = styled.div`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    display: flex;

    @media only screen and (max-width: 1024px) {
        flex-direction: column;
        display: inline;
    }
`;
const ResponsiveRowArticle = (data) => {
    return (
        <StResponsiveRowArticle style={{ ...data.style }}>
            {data.children}
        </StResponsiveRowArticle>
    );
};

export default ResponsiveRowArticle;
