import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-rubik">
      {/* Header */}
      <Header />

      {/* Body with Sidebar and Main Content */}
      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-64px)] space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
