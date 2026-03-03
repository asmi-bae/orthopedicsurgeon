/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
        "../../packages/*/src/**/*.{html,ts}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#ecf9ff',
                    100: '#d5efff',
                    200: '#b4e5ff',
                    300: '#81d6ff',
                    400: '#46bdff',
                    500: '#1da1ff',
                    600: '#0684ff',
                    700: '#006eff',
                    800: '#0857c5',
                    900: '#0d4b9b',
                    950: '#0e2d5d',
                },
                secondary: {
                    50: '#f4f4f5',
                    100: '#e4e4e7',
                    200: '#d4d4d8',
                    300: '#a1a1aa',
                    400: '#71717a',
                    500: '#52525b',
                    600: '#3f3f46',
                    700: '#27272a',
                    800: '#18181b',
                    900: '#09090b',
                    950: '#040405',
                },
                accent: {
                    300: '#00f2fe',
                    400: '#4facfe',
                },
                surface: {
                    50: 'rgba(255, 255, 255, 0.03)',
                    100: 'rgba(255, 255, 255, 0.05)',
                    200: 'rgba(255, 255, 255, 0.08)',
                }
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
