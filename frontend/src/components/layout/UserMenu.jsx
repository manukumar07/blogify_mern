import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { User, LogOut, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserMenu = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  if (!user || !token) return null;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-[#E5DEFF]"
        >
          <Avatar className="h-10 w-10">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user?.avatar || "https://github.com/shadcn.png"}
                alt={user?.username || user?.email}
              />
              <AvatarFallback className="bg-[#E5DEFF] text-[#6E59A5] font-bold font-montserrat">
                {(user?.username || user?.email)?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-[#FFFFFF] text-[#221F26] font-sans"
        align="end"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            {/* <p className="text-sm font-medium">
              {user.username || user.email.split("@")[0]}
            </p> */}
            <p className="text-sm font-medium">
              {user?.username || user?.email?.split("@")[0] || "Guest"}
            </p>
            <p className="text-md text-[#6B7280]">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => navigate("/profile")}
          className="hover:bg-[#F1F0FB] font-medium text-md cursor-pointer"
        >
          <User className="mr-2 h-4 w-4 text-[#6E59A5]" /> Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/dashboard")}
          className="hover:bg-[#F1F0FB] font-medium text-md cursor-pointer"
        >
          <BarChart2 className="mr-2 h-4 w-4 text-[#33C3F0]" /> Dashboard
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-[#EF4444] font-medium text-md hover:bg-[#FEE2E2] cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
