import Sidebar from "./sidebar";
import Header from "./header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 min-h-screen bg-white p-6">{children}</main>
      </div>
    </div>
  );
}
