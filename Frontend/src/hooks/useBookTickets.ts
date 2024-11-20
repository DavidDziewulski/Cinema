import { request } from '@/lib/Client/apiClient';
import { queryKeys } from '@/lib/Client/queryKeys';
import { queryClient } from '@/lib/queryClient/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

const ResponseValidationSchema = z.string();

type InputData = {
    eventId: string;
    amount: number;
}

export const useBokkTickets = () => {
    const { id } = useParams<{id: string}>();

    return useMutation(
        {
            mutationFn:  (input: InputData) => 
                request({
                    url: `event/${input.eventId}/reservation`,
                    method: 'post',
                    schema: ResponseValidationSchema,
                    data: {amount: input.amount},
                }),
            onSuccess: () => {
                queryClient.refetchQueries({
                queryKey: queryKeys.getMovie(id ?? '0')
            })
        }
        },
    )
};
