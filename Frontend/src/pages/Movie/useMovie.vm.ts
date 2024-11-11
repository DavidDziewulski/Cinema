import { useGetMovie } from "@/hooks/useGetMovie";

export const useMovieVm = () => {
    const {data, isLoading, isError} = useGetMovie();

    return {
        data,
        isError,
        isLoading,
    }
}