import { request } from '@/lib/Client/apiClient';
import { queryKeys } from '@/lib/Client/queryKeys';
import { queryClient } from '@/lib/queryClient/queryClient';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

const ResponseValidationSchema = z.object({
    id: z.string(),
});

type InputData = {
    id: string;
    amount: number;
}

export const useGetMovie = () => {
    return useMutation(
        {
            mutationFn:  (input: InputData) => 
                request({
                    url: `movie/${1}`,
                    method: 'post',
                    schema: ResponseValidationSchema,
                    data: input,
                }),
            onSuccess: (_,variable) => queryClient.refetchQueries({
                queryKey: queryKeys.getMovie(variable.id)
            }),
        },
    )

};
