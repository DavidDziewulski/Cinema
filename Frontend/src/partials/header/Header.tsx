
import { useNavigate } from 'react-router-dom';
import { Profile } from './components/Profile';

type Props = {
  isSearch?: boolean;
}

export const Header = ({isSearch = true }: Props) => {
  const nav = useNavigate();

  return (
    <header className="flex items-center justify-evenly px-6 py-4 bg-background border-b">
      <img 
        className="w-auto h-7 sm:h-8"
        src="https://merakiui.com/images/logo.svg" 
        onClick={() => nav('/')}
        alt="">
        </img>
      <div className="w-1/3"></div>
      {/* {isSearch && (
        <SearchBar />
      )} */}
      <div className="w-1/3 flex justify-end items-center space-x-4">
        {/* <span className="text-sm font-medium">HOME</span> */}
        <Profile />
      </div>
    </header>
  )
}