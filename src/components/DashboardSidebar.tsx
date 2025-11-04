"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Settings,
  Menu,
  X,
  Folder,
  BarChart3,
  MessageSquare,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Projects", href: "/dashboard/projects", icon: Folder },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const DashboardSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 animate-in fade-in-0">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <CheckSquare className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">TaskFlow</h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-8 px-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 mb-1 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-64 bg-white shadow-xl border-r border-gray-200">
          <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">TaskFlow</h1>
              <p className="text-xs text-gray-500">Project Management</p>
            </div>
          </div>
          <nav className="mt-8 px-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 mb-1 group ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Upgrade Card */}
          <div className="mt-8 mx-4 p-4 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl text-white">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Upgrade to Pro</h3>
              <p className="text-xs opacity-90 mb-3">
                Get access to all features
              </p>
              <button className="w-full bg-white text-orange-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
