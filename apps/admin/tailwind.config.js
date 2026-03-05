const baseConfig = require('../../packages/config/tailwind.config.base.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
    ...baseConfig,
    darkMode: 'class',
    content: [
        "./src/**/*.{html,ts}",
        "../../packages/*/src/**/*.{html,ts}"
    ],
}
