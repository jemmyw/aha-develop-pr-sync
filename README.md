# PR Sync
  
It's annoying when your GitHub pull request title gets out of sync with the record in Aha! Develop. Add this extension to keep them in sync. Can sync Aha! -> GitHub, GitHub -> Aha! and Aha! <=> GitHub

## Installing the extension

**Note: In order to install an extension into your Aha! Develop account, you must be an account administrator.**

Requires the official github extension to be installed: https://github.com/aha-develop/github

Install the PR Sync extension by clicking [here](https://secure.aha.io/settings/account/extensions/install?url=).

## Working on the extension

Install [`aha-cli`](https://github.com/aha-app/aha-cli):

```sh
npm install -g aha-cli
```

Clone the repo:

```sh
git clone https://github.com/jemmyw/aha-develop-pr-sync.git
```

**Note: In order to install an extension into your Aha! Develop account, you must be an account administrator.**

Install the extension into Aha! and set up a watcher:

```sh
aha extension:install
aha extension:watch
```

## Building


```sh
aha extension:build
```
