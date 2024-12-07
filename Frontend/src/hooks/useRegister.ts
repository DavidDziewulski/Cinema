import { request } from '@/lib/Client/apiClient';
import { paths } from '@/router/Router';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

const ResponseValidationSchema = z.string();

type InputData = {
    name: string;
    email: string;
    password: string;
}

export const useRegister = () => {
    const naviaget = useNavigate();

    return useMutation(
        {
            mutationFn:  (input: InputData) => 
                request({
                    url: `/auth/register`,
                    method: 'post',
                    schema: ResponseValidationSchema,
                    data: input,
                }),
            onSuccess: () => {
                toast.success('Pomyślnie zostało utworzone konto, prosimy o zalogowanie się');

                naviaget(paths.login);
            },
            onError: () => {
                toast.error('Nie udało się utworzyć konta');
            }
        },
    )
};
