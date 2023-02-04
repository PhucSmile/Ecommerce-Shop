import React from 'react';
import { Container } from '../common';

const CommonSection = ({ title, image }) => {
    return (
        <section
            className="py-[80px] lg:py-[100px] bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${image})` }}
        >
            <Container>
                <h3 className="text-primary text-[22px] lg:text-[32px] font-bold tracking-[5px]">{title}</h3>
            </Container>
        </section>
    );
};

export default CommonSection;
