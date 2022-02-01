const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  // reactStrictMode: true,

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        NEXTAUTH_URL: "http://localhost:3000/",
      },
    };
  }

  return {
    env: {
      NEXTAUTH_URL: "http://localhost:3000/",
    },
  };
};
