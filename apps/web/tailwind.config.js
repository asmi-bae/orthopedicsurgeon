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
                    500: '#3b82f6',
                    600: '#2563eb',
                },
                secondary: {
                    50: '#f8fafc',
                    900: '#0f172a',
                }
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
