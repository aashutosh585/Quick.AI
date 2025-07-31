// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  House,
  SquarePen,
  Hash,
  Image,
  Eraser,
  Scissors,
  FileText,
  Users,
  LogOut,
} from "lucide-react";

const navItems = [
  { to: "/ai", label: "Dashboard", icon: House },
  { to: "/ai/write-article", label: "Write Article", icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", icon: FileText },
  { to: "/ai/community", label: "Community", icon: Users },
];

export default function Sidebar({ sidebar, setSidebar }) {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`
        w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center
        max-sm:absolute top-10 bottom-0
        transition-all duration-300 ease-in-out
        ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}
      `}
    >
      {/* Profile Section */}
      <div className="my-7 w-full">
        <img
          src={user.imageUrl}
          alt="User Avatar"
          className="w-13 rounded-full mx-auto o"
        />
        <h1 className="mt-1 text-center ">{user.fullName}</h1>
        <div className="px-6 mt-5 text-gray-600 font-medium ">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded ${
                  {
                    true: "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white",
                    false: "hover:bg-gray-100",
                  }[isActive]
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Profile & Sign Out Buttons */}
      <div className="px-6 py-4 w-full border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => {
              openUserProfile();
              setSidebar(false);
            }}
          >
            <img
              src={user.imageUrl}
              alt={user.fullName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h1 className="text-sm font-medium">{user.fullName}</h1>
              <p className="text-xs text-gray-500">
                <Protect plan="premium" fallback="Free">
                  Premium
                </Protect>{" "}
                Plan
              </p>
            </div>
          </div>
          <LogOut
            onClick={signOut}
            className="w-6 h-6 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
