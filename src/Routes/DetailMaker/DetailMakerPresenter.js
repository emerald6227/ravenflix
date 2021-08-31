import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import noPosterSmall from "../../assets/noPosterSmall.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 20px;
`;

const CountriesWrapper = styled.div``;

const CountriesTitle = styled.span`
    display: block;
    font-size: 20px;
`;

const CompaniesContainer = styled.div`
    display: grid;
    gap: 10px 20px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 30px;
`;

const CompaniesWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const CompaniesImage = styled.img`
    max-width: 200px;
    min-height: 100px;
    max-height: 100px;
`;

const CompaniesTitle = styled.span`
    margin-top: 10px;
    font-size: 16px;
`;

const NoInfoSpan = styled.span`
    font-size: 20px;
    color: #e74c3c;
`;

const DetailMakerPresenter = ({ productionCompanies, productionCountries, loading, error }) => {
    return (
        loading ? (
            <Loader />
        ) : ( 
            <Container>
                <CountriesWrapper>
                    { productionCountries &&  productionCountries.length > 0 ?
                        productionCountries.map((country, index) => (<CountriesTitle key={index}>Country: {country.name}</CountriesTitle>))
                        : <NoInfoSpan>제작 국가 정보가 없습니다.</NoInfoSpan>
                    }
                </CountriesWrapper>
                <CompaniesContainer>
                    { productionCompanies &&  productionCompanies.length > 0 ?
                        productionCompanies.map((company, index) => (
                            <CompaniesWrapper key={index}>
                                { company.logo_path && company.logo_path !== "" && company.logo_path !== null && company.logo_path !== undefined  ? 
                                    <CompaniesImage src={`https://image.tmdb.org/t/p/original${company.logo_path}`}></CompaniesImage>
                                    : <CompaniesImage src={noPosterSmall}></CompaniesImage>
                                }
                                <CompaniesTitle>{company.name}</CompaniesTitle>
                            </CompaniesWrapper>))
                        : <NoInfoSpan>제작 회사 정보가 없습니다.</NoInfoSpan>
                    }
                </CompaniesContainer>
            </Container>
        )
    );
};

DetailMakerPresenter.propTypes = {
    productionCompanies: PropTypes.array,
    productionCountries: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default DetailMakerPresenter;