/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Générateur de signature - Onefirst`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  jsxRuntime: "automatic",
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        // You can find your read-only API token under the Settings > API tokens
        // section of your administrative area. Make sure to grant both CDA and CMA permissions.
        apiToken: `6826e427293d27a6773e4d6b0f390d`,

        // The project environment to read from. Defaults to the primary environment:
        environment: `main`,

        // If you are working on development/staging environment, you might want to
        // preview the latest version of records instead of the published one:
        previewMode: false,

        // Disable automatic reloading of content when some change occurs on DatoCMS:
        disableLiveReload: false,

        // Custom API base URL (you probably don't need this!)
        // apiUrl: 'https://site-api.datocms.com',

        // Limits page size and can be used to avoid build timeouts.
        // Default is 500 (also the maximum)
        pageSize: 500,
      },
    },
  ],
};