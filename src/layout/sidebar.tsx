"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sidebarRoutes } from "@/shared/constants/routes";
import Logo from "../../../public/logo.png";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[#DFE1E3] min-h-screen py-6 px-4">
      <Link href="/main" className="mb-8 block">
        <div className="flex justify-center">
          <Image src={Logo} alt="Hypers" width={100} height={50} priority />
        </div>
      </Link>
      <nav className="flex flex-col gap-4">
        {sidebarRoutes.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 text-sm rounded-lg px-3 py-2 transition 
                ${
                  isActive
                    ? "bg-[#F3F4F8] text-black font-semibold"
                    : "text-[#8B909A] hover:bg-[#F3F4F8] font-normal"
                }
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
