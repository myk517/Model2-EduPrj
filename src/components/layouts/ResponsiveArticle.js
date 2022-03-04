import styled from "styled-components";

const ResponseiveArticle = styled.div`
    display: inline-block;
    padding: 80px 0px 80px 0px;
    min-width: 700px;
    @media only screen and (max-width: 1024px) {
        display: inline;
    }
`;

export default ResponseiveArticle;
