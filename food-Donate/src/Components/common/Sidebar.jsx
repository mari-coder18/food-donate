import { Dashdata } from "../data/Dashdata";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ role = "donor",onClose }) => {

  // safety check
  const safeRole = role?.trim().toLowerCase();

  const finalRole = safeRole === "donor" ? "donor" : safeRole;

  const filteredMenu = Dashdata.filter((item) =>
    item.roles ? item.roles.includes(finalRole) : true
  );

  return (
    <aside className="w-56 min-h-screen bg-orange-200 p-4  overflow-y-auto">

      <h1 className="text-2xl font-bold mb-8 text-center">
        Food donor
      </h1>

      <nav>
        <ul className="space-y-2">

          {filteredMenu.length === 0 ? (
            <p className="text-sm text-red-600">
              No menu for this role
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
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                      ${
                        isActive
                          ? "bg-white text-black shadow"
                          : "text-black hover:bg-slate-300"
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