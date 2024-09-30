/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
  output: "export",
  basePath: "/nextjs-github-pages",
  images: {
    unoptimized: true,
  },
};

export default config;
