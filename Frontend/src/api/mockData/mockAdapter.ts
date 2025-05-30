import { apiClient } from '@/lib/Client/apiClient';
import MockAdapter from 'axios-mock-adapter';
import { moviesEuropa, movies, movie } from './movies';

export const mockAdapter = () => {
    const mockAxiosAdapter = new MockAdapter(apiClient, {
        // delayResponse: 2000,
    });

    mockAxiosAdapter
        .onGet('/movies/?title=europa')
        .reply(200,[moviesEuropa]);

    mockAxiosAdapter
        .onGet('/movies')
        .reply(200, movies);

    mockAxiosAdapter
        .onGet('/movie/1')
        .reply(200,movie);
};
