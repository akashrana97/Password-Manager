let env_url = "http://127.0.0.1:8000/api/";
//let env_url = "https://digiassistants.com/api"

module.exports = {
  api: {
    API_URL: "https://api-node.themesbrand.website",
  },
  env_api: {
    API_URL: env_url,
    REFRESH_TOKEN_URL: `${env_url}token_refresh/`,
  },
};
