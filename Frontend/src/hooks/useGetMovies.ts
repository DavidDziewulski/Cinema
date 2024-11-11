import { request } from '@/lib/Client/apiClient';
import { queryKeys } from '@/lib/Client/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { MoviesSchema } from '@/api/types/Movie';
import { useSearchParams } from 'react-router-dom';

export const useGetMovies = () => {
    const [ searchParams ] = useSearchParams();

    const title = searchParams.get('title');

    const search = title ? `/movies/?title=${title}` : '/movies'

    const query = useQuery({
        queryKey: queryKeys.getMovies(title ?? ''),
        queryFn: () =>
            request({
                url: search,
                method: 'GET',
                schema: MoviesSchema,
                onError: error => {
                    console.log({ error });
                },
            }),
    });

    return {
        ...query,
    };
};
