import React from "react";
import { moviesApi, tvApi } from '../../api';
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "code",
        error: null,
        loading: false
    };

    componentDidMount() {
        this.handleSubmit();
    }

    handleSubmit = () => {
        const { searchTerm } = this.state;
        if (searchTerm !== "") {
            this.searchByTerm();
        }
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
                error: "영화 정보를 찾을 수 없습니다."
            })
        } finally {
            this.setState({
                loading: false
            })
        }
    };

    render() {
        const { movieResults, tvResults, searchTerm, error, loading } = this.state;
        console.log("search상태", this.state);
        return (
            <SearchPresenter movieResults={movieResults} tvResults={tvResults} searchTerm={searchTerm} error={error} loading={loading} />
        );
    }
}