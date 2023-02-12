/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './component/**/*.{js,ts,jsx,tsx}', './layout/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            dropShadow: {
                xl: ['3px 3px 0px #F6F6F6', '3px 3px 0px #99CCCC'],
            },
            colors: {
                primary: '#0A1D37',
                secondary: '#BE8184',
                third: '#C97E83',
                text: '#999999',
                text_footer: '#ffffffbb',
                grey_deselect: '#7A7B7A',
                danger: '#df2020',
                hero_bg: '#d6e5fb',
            },
            fontFamily: {
                SVNGilroy: 'SVN-Gilroy',
                Inter: 'Inter',
            },
            backgroundImage: {
                'border-small': "url('/images/subject/border-small.png')",
                'border-big': "url('/images/subject/border-big.png')",
            },
            backgroundSize: {
                '100%': '100%',
            },
            keyframes: {
                spin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
            boxShadow: {
                checkbox: ['0px 5px 10px rgba(0, 0, 0, 0.1)'],
                header: ['0px 8px 10px rgba(0, 0, 0, 0.1)'],
                detail: ['0px 2px 1px rgba(0, 0, 0, 0.1)'],
                cartItem: [
                    ' 0px 9px 27px rgba(0, 0, 0, 0.07), 0px 3.75998px 11.28px rgba(0, 0, 0, 0.0503198), 0px 2.01027px 6.0308px rgba(0, 0, 0, 0.0417275), 0px 1.12694px 3.38082px rgba(0, 0, 0, 0.035), 0px 0.598509px 1.79553px rgba(0, 0, 0, 0.0282725), 0px 0.249053px 0.747159px rgba(0, 0, 0, 0.0196802)',
                ],
                login: [
                    '0px 9px 27px rgba(0, 0, 0, 0.07), 0px 3.75998px 11.28px rgba(0, 0, 0, 0.0503198), 0px 2.01027px 6.0308px rgba(0, 0, 0, 0.0417275), 0px 1.12694px 3.38082px rgba(0, 0, 0, 0.035), 0px 0.598509px 1.79553px rgba(0, 0, 0, 0.0282725), 0px 0.249053px 0.747159px rgba(0, 0, 0, 0.0196802)',
                ],
            },
        },
    },
    plugins: [],
    important: true,
};
