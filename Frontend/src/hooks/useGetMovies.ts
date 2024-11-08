import { request } from '@/lib/Client/apiClient';
import { queryKeys } from '@/lib/Client/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { MovieSchema } from '@/api/types/Movie';

export const useGetMovies = () => {
    const query = useQuery({
        queryKey: queryKeys.getMovies(),
        queryFn: () =>
            request({
                url: '/movies',
                method: 'GET',
                schema: MovieSchema,
                onError: error => {
                    console.log({ error });
                },
            }),
    });

    return {
        ...query,
    };
};
