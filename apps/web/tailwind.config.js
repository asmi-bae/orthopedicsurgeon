const baseConfig = require('../../packages/config/tailwind.config.base.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
    ...baseConfig,
    darkMode: 'class',
    content: [
        "./src/**/*.{html,ts}",
        "../../packages/*/src/**/*.{html,ts}"
    ],
    theme: {
        extend: {
            ...(baseConfig.theme?.extend || {}),
            colors: {
                ...(baseConfig.theme?.extend?.colors || {}),
                primary: {
                    500: '#298afaff',
                    600: '#1249c0ff',
                },
                secondary: {
                    50: '#f8fafc',
                    900: '#050e39ff',
                }
            },
            fontFamily: {
                ...(baseConfig.theme?.extend?.fontFamily || {}),
                inter: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [
        ...(baseConfig.plugins || [])
    ],
}
