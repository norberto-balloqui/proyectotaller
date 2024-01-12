module.exports = {
  async redirects() {
    return [
      {
        source: '/protected-page',
        destination: '/login',
        permanent: false, // Ajusta según tus necesidades
      },
    ];
  },
  reactStrictMode: true,
  env: {
    SERVIDOR: process.env.SERVIDOR,
  },
};
