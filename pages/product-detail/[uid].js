import Loading from '@/component/common/Loading';
import DetailSection from '@/component/page/detailSection/DetailSection';
import { useDetailProductApi } from '@/hook/useProductApi';
import { useRouter } from 'next/router';
import React from 'react';

const ProductDetail = () => {
    const router = useRouter();
    const { uid } = router.query;
    const { data, isLoading } = useDetailProductApi(uid);
    console.log('data details', data);
    if (isLoading) {
        return <Loading />;
    }
    return <DetailSection data={data?.data} />;
};

export default ProductDetail;
