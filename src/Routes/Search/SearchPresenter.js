import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet"
import Loader from "../../Components/Loader";
import Section from "../../Components/Section";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
    padding: 0 20px;
    margin-top: 30px;
`;

const Form = styled.form`
    margin-bottom: 50px;
`;

const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 100%;
`;

const SearchPresenter = ({movieResults, tvResults, searchTerm, finallyTerm, handleSubmit, handleUpdateTerm, error, loading}) => {
    return (
        <Container>
            <Helmet>
                <title>Search | Ravenflix</title>
            </Helmet>
            <Form onSubmit={handleSubmit}>
                <Input placeholder="검색" value={searchTerm} onChange={handleUpdateTerm}></Input>
            </Form>
            {loading ? <Loader></Loader> : 
                <>
                    {movieResults && movieResults.length > 0 && (
                        <Section title="영화 검색 결과">
                            {movieResults.map(movie => (
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
                    {tvResults && tvResults.length > 0 && (
                        <Section title="TV 검색 결과">
                            {tvResults.map(show => (
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
                    {tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 && <Message color="#95a5a6" text={`'${finallyTerm}'에 대한 검색 결과가 없습니다.`}></Message>}
                </>
            }
        </Container>
    )
};

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    searchTerm: PropTypes.string,
    finallyTerm: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    handleUpdateTerm: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default SearchPresenter;