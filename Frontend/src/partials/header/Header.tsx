
import { Profile } from './components/Profile'
import { SearchBar } from './components/SearchBar'

export const  Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
      <div className="w-1/3"></div>
      <SearchBar />
      <div className="w-1/3 flex justify-end items-center space-x-4">
        <span className="text-sm font-medium">HOME</span>
        <Profile />
      </div>
    </header>
  )
}