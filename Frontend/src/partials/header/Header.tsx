import { useNavigate } from 'react-router-dom';
import { Profile } from './components/Profile';

export const Header = () => {
  const nav = useNavigate();

  return (
    <header style={{ borderBottom: '1px solid #7c7474' }} className="flex items-center justify-evenly px-6 py-4 bg-inherit border-b border-black">
      <img 
        className="w-auto h-7 sm:h-8"
        src="https://merakiui.com/images/logo.svg" 
        onClick={() => nav('/')}
        alt="">
        </img>
      <div className="w-1/3"></div>
      <div className="w-1/3 flex justify-end items-center space-x-4">
        <Profile />
      </div>
    </header>
  )
}