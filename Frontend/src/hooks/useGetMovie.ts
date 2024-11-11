import { request } from '@/lib/Client/apiClient';
import { queryKeys } from '@/lib/Client/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { MovieSchema } from '@/api/types/Movie';
import { useParams } from 'react-router-dom';

export const useGetMovie = () => {
    const { id } = useParams<{id: string}>();
    id;


    const query = useQuery({
        queryKey: queryKeys.getMovie('1'),
        queryFn: () =>
            request({
                url: `movie/${1}`,
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
