import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ Get user email safely
  const user = localStorage.getItem("user");
  const email: string | null = user ? JSON.parse(user).email : null;

  // ✅ Avatar initials (first letter)
  const avatarText = email
    ? email.charAt(0).toUpperCase()
    : "U";

  return (
    <header className="h-14 border-b bg-background flex items-center justify-end px-4 gap-4">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="font-medium">
          {avatarText}
        </AvatarFallback>
      </Avatar>

      <Button variant="ghost" size="icon" onClick={logout}>
        <LogOut size={18} />
      </Button>
    </header>
  );
};

export default Topbar;
