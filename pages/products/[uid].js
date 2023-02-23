import { productApi } from '@/apiClient/productApi';
import Loading from '@/component/common/Loading';
import DetailSection from '@/component/page/detailSection/DetailSection';
import { useDetailProductApi } from '@/hook/useProductApi';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export async function getStaticPaths() {
    const data = await productApi.getAll();
    const arrPaths = data.data.products.map((item) => ({
        params: { uid: item.id.toString() },
    }));

    return {
        paths: arrPaths || [],
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const queryClient = new QueryClient();
    const { params } = context;
    await Promise.all([
        queryClient.prefetchQuery([`get-detail-product`, params.uid], async () => {
            const res = await productApi.getDetail(params.uid);
            return res.data;
        }),
    ]);
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 10,
    };
}

const ProductDetail = () => {
    const router = useRouter();
    const { uid } = router.query;

    const { data, isLoading } = useDetailProductApi(uid);
    // console.log('data details', data.data);
    if (isLoading) {
        return <Loading />;
    }
    return <DetailSection data={data?.data} />;
};

export default ProductDetail;
