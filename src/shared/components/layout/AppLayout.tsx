import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';

interface AppLayoutProps {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="w-full">{children ?? <Outlet />}</main>
      <Footer />
    </section>
  );
}
