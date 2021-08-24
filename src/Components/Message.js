import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    margin-top: 30px;
`;

const Text = styled.span`
    color: ${props => props.color };
    font-weight: 600;
    font-size: 18px;
`;

const Message = ({text, color}) => {
    return (
        <Container>
            <Text color={color}>
                {text}
            </Text>
        </Container>
    )
};

Message.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}

export default Message;