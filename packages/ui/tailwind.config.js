const baseConfig = require('../config/tailwind.config.base.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
    ...baseConfig,
    content: [
        "./src/**/*.{html,ts}",
    ],
}
