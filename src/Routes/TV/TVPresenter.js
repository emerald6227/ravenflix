import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
    padding: 0 20px;
`;

const TVPresenter = ({topRated, popular, airingToday, error, loading}) => {
    return (
        <>
            <Helmet>
                <title>TV | Ravenflix</title>
            </Helmet>
        {loading ? (
            <Loader></Loader>
        ) : (
            <Container>
                { topRated && topRated.length > 0 && (
                    <Section title="Top TV">
                        {topRated.map(show => (
                            <Poster 
                                key={show.id} 
                                id={show.id} 
                                imageUrl={show.poster_path} 
                                title={show.original_name} 
                                rating={show.vote_average} 
                                year={show.first_air_date && show.first_air_date.substring(0,4)} 
                                isMovie={false}>
                            </Poster>
                        ))}
                    </Section>
                )}
                { popular && popular.length > 0 && (
                    <Section title="인기있는 TV">
                        {popular.map(show => (
                            <Poster 
                                key={show.id} 
                                id={show.id} 
                                imageUrl={show.poster_path} 
                                title={show.original_name} 
                                rating={show.vote_average} 
                                year={show.first_air_date && show.first_air_date.substring(0,4)} 
                                isMovie={false}>
                            </Poster>
                        ))}
                    </Section>
                )}
                { airingToday && airingToday.length > 0 && (
                    <Section title="오늘 방영하는 TV">
                        {airingToday.map(show => (
                            <Poster 
                                key={show.id} 
                                id={show.id} 
                                imageUrl={show.poster_path} 
                                title={show.original_name} 
                                rating={show.vote_average} 
                                year={show.first_air_date && show.first_air_date.substring(0,4)} 
                                isMovie={false}>
                            </Poster>
                        ))}
                    </Section>
                )}
                {error && <Message text={error} color="#e74c3c"></Message>}
            </Container>
        )}
        </>
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