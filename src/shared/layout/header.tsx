"use client";
import { UserOutlined } from "@ant-design/icons";
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
        {/* <BellOutlined className="text-xl cursor-pointer" /> */}
        <p className="font-bold">Admin</p>
        <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center">
          <UserOutlined />
        </div>
      </div>
    </header>
  );
}
