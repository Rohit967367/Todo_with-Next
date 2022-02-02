const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  // reactStrictMode: true,

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      env: {
        NEXTAUTH_URL: "http://localhost:3000/",
      },
    };
  }

  return {
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    env: {
      NEXTAUTH_URL: "http://localhost:3000/",
    },
  };
};
