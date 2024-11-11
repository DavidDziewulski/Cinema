import { useGetMovies } from "@/hooks/useGetMovies";
import { useNavigate } from "react-router-dom";

export const useMovieListVm = () => {    
    const navigate = useNavigate();
    
    const { data,isError,isLoading } = useGetMovies();
    return {
        data,
        isError,
        isLoading,
        navigate,
    }
} 