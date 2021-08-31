import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
    padding: 0 20px 20px 20px;
`;

const HomePresenter = ({nowPlaying, upcoming, popular, error, loading}) => {
    return (
        <>
            <Helmet>
                <title>Movies | Ravenflix</title>
            </Helmet>
            {loading ? (
                <Loader></Loader>
            ) : (
                <Container>
                    { nowPlaying && nowPlaying.length > 0 && (
                        <Section title="상영중인 영화">
                            {nowPlaying.map(movie => (
                                <Poster 
                                    key={movie.id} 
                                    id={movie.id} 
                                    imageUrl={movie.poster_path} 
                                    title={movie.title} 
                                    rating={movie.vote_average} 
                                    year={movie.release_date && movie.release_date.substring(0,4)} 
                                    isMovie={true}>
                                </Poster>
                            ))}
                        </Section>
                    )}
                    { upcoming && upcoming.length > 0 && (
                        <Section title="개봉 예정 영화">
                            {upcoming.map(movie => (
                                <Poster 
                                    key={movie.id} 
                                    id={movie.id} 
                                    imageUrl={movie.poster_path} 
                                    title={movie.title} 
                                    rating={movie.vote_average} 
                                    year={movie.release_date && movie.release_date.substring(0,4)} 
                                    isMovie={true}>
                                </Poster>
                            ))}
                        </Section>
                    )}
                    { popular && popular.length > 0 && (
                        <Section title="인기있는 영화">
                            {popular.map(movie => (
                                <Poster 
                                    key={movie.id} 
                                    id={movie.id} 
                                    imageUrl={movie.poster_path} 
                                    title={movie.title} 
                                    rating={movie.vote_average} 
                                    year={movie.release_date && movie.release_date.substring(0,4)} 
                                    isMovie={true}>
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

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array, 
    upcoming: PropTypes.array,
    popular: PropTypes.array, 
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default HomePresenter;