import { Dashdata } from "../data/Dashdata";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ role = "donor", onClose }) => {

  // MySQL 
  const safeRole = typeof role === "string" ? role.trim().toLowerCase() : "donor";


  const getSidebarTitle = () => {
    if (safeRole === "admin") return "Admin Portal";
    if (safeRole === "ngo") return "NGO Portal";
    if (safeRole === "volunteer") return "Volunteer Portal";
    return "Donor Portal";
  };

  const filteredMenu = Dashdata.filter((item) =>
    item.roles ? item.roles.includes(safeRole) : true
  );

  return (
    <aside className="w-56 min-h-screen bg-orange-100 p-4 overflow-y-auto border-r border-orange-200 flex flex-col">

    
      <h2 className="text-xl font-extrabold mb-8 text-center text-orange-800 tracking-wide capitalize">
        {getSidebarTitle()}
      </h2>

      <nav className="flex-1">
        <ul className="space-y-1.5">

          {filteredMenu.length === 0 ? (
            <p className="text-sm text-red-600 text-center font-medium mt-4">
              No menu for this role da!
            </p>
          ) : (
            filteredMenu.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                          : "text-gray-700 hover:bg-orange-200/60 hover:text-orange-900"
                      }` 
                    }
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              );
            })
          )}

        </ul>
      </nav>

    </aside>
  );
};