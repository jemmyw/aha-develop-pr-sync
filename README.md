# PR Sync
  
It's annoying when your GitHub pull request title gets out of sync with the record in Aha! Develop. Add this extension to keep them in sync. Can sync Aha! -> GitHub, GitHub -> Aha! and Aha! <=> GitHub

## Installing the extension

**Note: In order to install an extension into your Aha! Develop account, you must be an account administrator.**

Requires the official github extension to be installed: https://github.com/aha-develop/github

Install the PR Sync extension by clicking [here](https://secure.aha.io/settings/account/extensions/install?url=https://github.com/jemmyw/aha-develop-pr-sync/releases/download/1.0.0/jemmyw.pr-sync-v1.0.0.gz).

To sync to GitHub you must supply a personal access token with repo access from https://github.com/settings/tokens

![Screenshot_20210614_121045](https://user-images.githubusercontent.com/8016/121826002-9699e580-cd09-11eb-9c5b-e07f1dab3acb.png)

## Working on the extension

Install [`aha-cli`](https://github.com/aha-app/aha-cli):

```sh
npm install -g aha-cli
```

Clone the repo:

```sh
git clone https://github.com/jemmyw/aha-develop-pr-sync.git
```

Install and setup the github graphql types:

```sh
yarn install
yarn run codegen
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
