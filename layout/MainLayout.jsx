import ScrollToTop from 'react-scroll-to-top';
import { BackToTop, Footer, Header } from './component';

export function MainLayout({ children, authPage = false }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <ScrollToTop smooth className="!rounded-[50%]" component={<BackToTop />} />
            <Footer />
        </div>
    );
}
