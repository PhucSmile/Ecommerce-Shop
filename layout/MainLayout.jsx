import ScrollToTop from 'react-scroll-to-top';
import { BackToTop, Footer, Header } from './component';
import { useRouter } from 'next/router';
import TabsBottom from '@/component/tabsBottom/TabsBottom';

export function MainLayout({ children, authPage = false }) {
    const router = useRouter();
    const isShowTabs = router.pathname === '/login' && router.pathname === '/register';
    console.log('isShowTabs', isShowTabs);
    return (
        <div className="relative">
            <Header />
            <main>{children}</main>
            {!isShowTabs && (
                <div className="fixed bottom-0 right-0 left-0 z-0">
                    <TabsBottom />
                </div>
            )}
            <ScrollToTop
                smooth
                className="!rounded-[50%] sm:bottom-[14%] md:bottom-[14%] lg:bottom-[14%] w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] z-40"
                component={<BackToTop />}
            />
            <Footer />
        </div>
    );
}
