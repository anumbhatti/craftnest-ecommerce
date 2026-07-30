import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;