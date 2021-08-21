import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";


const Container = styled.div`
    padding: 0 10px;
`;

const TVPresenter = ({topRated, popular, airingToday, error, loading}) => {
    return (
        loading ? (
            <Loader></Loader>
        ) : (
            <Container>
                { topRated && topRated.length > 0 && (
                    <Section title="TopRated Shows">
                        {topRated.map(show => show.name)}
                    </Section>
                )}
                { popular && popular.length > 0 && (
                    <Section title="Popular Shows">
                        {popular.map(show => show.name)}
                    </Section>
                )}
                { airingToday && airingToday.length > 0 && (
                    <Section title="AiringToday Shows">
                        {airingToday.map(show => show.name)}
                    </Section>
                )}
            </Container>
        )
    );
};

TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array, 
    airingToday: PropTypes.array, 
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default TVPresenter;