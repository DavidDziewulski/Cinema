import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from 'lucide-react'
// Todo
// 1. Add log-out
// 2. Add re-direct to calendary page
export const Profile = () => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                    <User className="w-5 h-5" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Mój Kalendarz</DropdownMenuItem>
                <DropdownMenuItem>Wyloguj się</DropdownMenuItem>
            </DropdownMenuContent>
      </DropdownMenu>
    )
}