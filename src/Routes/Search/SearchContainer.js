import React from "react";
import { moviesApi, tvApi } from '../../api';
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        finallyTerm: "",
        error: null,
        loading: false
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if (searchTerm !== "") {
            this.searchByTerm();
            this.setState({
                finallyTerm: searchTerm
            });
        }
    };

    handleUpdateTerm = (event) => {
        const { target: { value } } = event;
        this.setState({
            searchTerm: value
        })
    };

    searchByTerm = async () => {
        const { searchTerm } = this.state;
        this.setState({
            loading: true
        });

        try {
            const { data: { results: movieResults }} = await moviesApi.search(searchTerm);
            const { data: { results: tvResults }} = await tvApi.search(searchTerm);

            this.setState({
                movieResults,
                tvResults,
            });
        } catch {
            this.setState({
                error: "검색 결과가 없습니다."
            })
        } finally {
            this.setState({
                loading: false
            })
        }
    };

    render() {
        const { movieResults, tvResults, searchTerm, finallyTerm, error, loading } = this.state;
        return (
            <SearchPresenter movieResults={movieResults} tvResults={tvResults} searchTerm={searchTerm} finallyTerm={finallyTerm} handleSubmit={this.handleSubmit} handleUpdateTerm={this.handleUpdateTerm} error={error} loading={loading} />
        );
    }
}