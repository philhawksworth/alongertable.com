# A Longer Table

A set of resources for those in need of support in Santa Clara County.

https://alongertable.com

## Working on this site

This site it built with a static site generator called [Eleventy](https://11ty.io). To build the site locally you will first need:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com/)

### Local bootstrapping

```bash

# clone the repository
git clone git@github.com:philhawksworth/alongertable.com.git

# install the dependencies
$ cd alongertable.com
$ yarn

# run and serve the local build
$ yarn start

```

### Content management

Some content of the site can be managed via an [external Google Sheet](https://docs.google.com/spreadsheets/d/17m9vrk7-0q89-kHBdr7VO7Sews6pTrIquT_l5Lg77qk/edit?usp=sharing). This sheet has multiple tabs, each holding content which populates different sections of the site.

By clicking the "Publish" button on the google sheet, updates to the site will be deployed (which will take a minute or two to complete).


## Site hosting and administration

The site is hosted on [Netlify](https://www.netlify.com) and changes are deployed automatically when:

- commits are pushed to the master branch of this repository
- changes are published from the [Google Sheet](https://docs.google.com/spreadsheets/d/17m9vrk7-0q89-kHBdr7VO7Sews6pTrIquT_l5Lg77qk/edit?usp=sharing)

Further configuration and control over domains and deployments is possible via the [Netlify Admin](https://app.netlify.com/sites/alongertable) for the site. (For authorised users)
