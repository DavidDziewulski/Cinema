import { request } from '@/lib/Client/apiClient';
import { queryKeys } from '@/lib/Client/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { MovieSchema } from '@/api/types/Movie';
import { useParams } from 'react-router-dom';

export const useGetMovie = () => {
    const { id } = useParams<{id: string}>();
    console.log('params',id);
    const query = useQuery({
        queryKey: queryKeys.getMovie(id ?? '0'),
        queryFn: () =>
            request({
                url: `movies/${id}`,
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
