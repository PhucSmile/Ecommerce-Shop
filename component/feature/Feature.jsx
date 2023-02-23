import React from 'react';
import { Container } from '../common';
import Title from '../common/Title';
import FeatureSlider from '../featureSlider/FeatureSlider';
import { useProductApi } from '@/hook/useProductApi';
import Loading from '../common/Loading';

const Feature = () => {
    const { data: dataFeatured, isLoading } = useProductApi();
    // if (isLoading) {
    //     return <Loading />;
    // }
    return (
        <Container className="most__product relative mt-7 lg:mt-0">
            <Title title="Featured products" setRight />
            {dataFeatured && <FeatureSlider data={dataFeatured} />}
        </Container>
    );
};

export default Feature;
