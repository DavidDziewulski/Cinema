import { apiClient } from '@/lib/Client/apiClient';
import MockAdapter from 'axios-mock-adapter';
import { movies } from './movies';

export const mockAdapter = () => {
    const mockAxiosAdapter = new MockAdapter(apiClient, {
        // delayResponse: 200,
    });

    mockAxiosAdapter
        .onGet('/movies')
        .reply(200, movies);

    // mockAxiosAdapter
    //     .onGet('/movie/?title=test')
    //     .reply(200, {test1:2});
};
