import { useGetMovies } from "@/hooks/useGetMovies";

export const useMovieListVm = () => {    
    const { data,isError,isLoading } = useGetMovies();
    return {
        data,
        isError,
        isLoading,
    }
} 