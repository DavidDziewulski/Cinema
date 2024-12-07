import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/hooks/useStore";
import { paths } from "@/router/Router";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Todo
// 1. Add log-out
// 2. Add re-direct to calendary page
export const Profile = () => {
  const nav = useNavigate();

  
  const { logout } = useStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
          <User className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => nav(paths.myCalendar)}>
          Mój Kalendarz
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Wyloguj się</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
