export default {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md"
      }
    ],
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        // 默认: ['CHANGELOG.md', 'package.json', 'package-lock.json', 'npm-shrinkwrap.json']
        // assets: []
      }
    ]
  ],
  repositoryUrl: "http://home.siaikin.website:20017/nbicc/common-components.git"
};
