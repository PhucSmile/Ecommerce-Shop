import React from 'react';
import { Container } from '../common';
import { motion } from 'framer-motion';
import { IconDollar, IconRefresh, IconSecure, IconTruck } from '@/assets/svg';

const serviceData = [
    {
        icon: <IconTruck />,
        title: 'Free Shipping',
        subtitle: 'Lorem ipsum dolor sit amet.',
        bg: '#fdefe6',
    },
    {
        icon: <IconRefresh />,
        title: 'Easy Returns',
        subtitle: 'Lorem ipsum dolor sit amet.',
        bg: '#ceebe9',
    },
    {
        icon: <IconSecure />,
        title: 'Secure Payment',
        subtitle: 'Lorem ipsum dolor sit amet.',
        bg: '#e2f2b2',
    },
    {
        icon: <IconDollar />,
        title: ' Back Guarantee',
        subtitle: 'Lorem ipsum dolor sit amet.',
        bg: '#d6e5fb',
    },
];
const Services = () => {
    return (
        <Container>
            <section className="mt-6 lg:mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 ">
                    {serviceData.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-5 p-5 rounded "
                            style={{ backgroundColor: `${item.bg}` }}
                        >
                            <span className="p-[10px] bg-primary rounded-full text-white  text-center">
                                {item.icon}
                            </span>
                            <div>
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm">{item.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Container>
    );
};

export default Services;
