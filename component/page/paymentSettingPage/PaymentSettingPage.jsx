import Breadcrumb from '@/component/breadcrumbs/Breadcrumb';
import { Container } from '@/component/common';
import Loading from '@/component/common/Loading';
import ListPayment from '@/component/listPayment/ListPayment';
import { useAuth } from '@/hook/useAuthApi';
import { useSession } from 'next-auth/react';

const path = {
    pathOne: 'home',
    pathTwo: 'payment',
    pathThree: 'Payment settings',
};
const PaymentSettingPage = () => {
    const { data: session } = useSession();
    const { data: dataProfile, isLoading } = useAuth(session?.user?.id);
    if (isLoading) {
        return <Loading />;
    }
    return (
        <Container>
            {/* Breadcrumb */}
            <div className="mt-[10px] mb-[55px]">
                <Breadcrumb path={path} />
            </div>
            <ListPayment data={dataProfile?.data.bank} />
        </Container>
    );
};

export default PaymentSettingPage;
