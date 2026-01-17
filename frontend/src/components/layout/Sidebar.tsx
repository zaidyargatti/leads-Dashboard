import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  return (
    <aside className="w-64 border-r bg-background hidden md:block">
      <div className="h-14 flex items-center px-4 border-b font-semibold">
        Lead CRM
      </div>

      <nav className="p-2 space-y-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted",
              isActive && "bg-muted font-medium"
            )
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/leads"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted",
              isActive && "bg-muted font-medium"
            )
          }
        >
          <Users size={18} />
          Leads
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
