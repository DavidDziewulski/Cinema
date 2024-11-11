import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export const SearchBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const paramsValue = searchParams.get('title') || '';

    const handleInputChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
      const newValue = event.target.value;

      if(newValue === ""){
          searchParams.delete('title')
          
          setSearchParams(searchParams);
          return;
      }

      setSearchParams({ title: event.target.value });
    };

    return (
    <div className="w-1/3 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Szukaj..."
            className="pl-10 pr-4 w-full border border-black" 
            value={paramsValue}
            onChange={handleInputChange}
          />
        </div>
    </div> 
    )
}