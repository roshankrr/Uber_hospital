import { Bell, Mail, Search, UserCog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-blue-200 bg-white">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
          <UserCog className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-blue-900">Administrator</h1>
          <p className="text-sm text-blue-600">Hospital Management System</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-blue-400" />
          <Input
            placeholder="Search"
            className="pl-8 w-64 bg-blue-50 border-blue-200 text-blue-900 placeholder-blue-300"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
        >
          <Mail className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="text-sm text-blue-600">July 2024</div>
        </div>
      </div>
    </div>
  );
}
