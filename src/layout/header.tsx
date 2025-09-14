"use client";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { sidebarRoutes } from "@/shared/constants/routes";

export default function Header() {
  const pathname = usePathname();

  const matched = sidebarRoutes.find(
    (route) => pathname === route.href || pathname.startsWith(route.href + "/")
  );

  const title = matched?.label ?? "";

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-[#DFE1E3] shadow-sm">
      <div className="text-xl font-semibold">{title}</div>
      <div className="flex items-center gap-6">
        {/* Только одна иконка уведомлений — перед Admin */}
        <div className="flex items-center gap-2">
          <BellOutlined className="text-lg text-gray-600" />
          <p className="font-bold text-gray-800">Admin</p>
        </div>

        <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center">
          <UserOutlined className="text-white" />
        </div>
      </div>
    </header>
  );
}
