const ghPages = require("gh-pages");
const buildPath = `${__dirname}/build`;
const repoURL = "https://github.com/Andros415/command-palette.git";

ghPages.publish(
  buildPath,
  {
    branch: "live-version",
    repo: repoURL,
  },
  (err) => {
    if (err) {
      console.error(`ERROR: ${err}`);
    } else {
      console.log("Successfully published!");
    }
  }
);
