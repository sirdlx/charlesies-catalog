![](https://charlesiesbeta.firebaseapp.com/images/charlesies_logo.png)
## Charlesie's Catalog

> A fashion catalog built using Polymer 1.0, StripeJS, and Firebase

## Change Log: 10-26-15
* CHANGED: ‘page-user’ renamed to 'page-login'
*  * ADDED: 'page-account' where logged in users can change name, address, and cards on file
* ADDED: 'catalog-user', inclued firebase login and supports password, facebook, twitter and google auth
*  * ADDED: ‘page-items’ filter with route params matching the 'category' property on 'product' items
* FIXED: ‘app-shell’ profile menu in toolbar (paper-icon-button)
* FIXED: 'drawer-panel' menu items reflecting the current route.
* ADDED: ‘page-cart’ display cart items
* ADDED: 'page-checkout’ select shipping address, select payment method, confirm order
* REMOVED: many folders not related to project
* ADDED: Add to favorites (user has to be logged in)

## NEXT
* StripeJS integration
* 'admin-page' - product builder
* Instagram integration
* Search (by tags)


### Install dependencies

#### Quick-start (for experienced users)

With Node.js installed, run the following one liner from the root of your Polymer Starter Kit download:

```sh
npm install -g gulp bower && npm install && bower install
```

#### Prerequisites

The full starter kit requires the following major dependencies:

- Node.js, used to run JavaScript tools from the command line.
- npm, the node package manager, installed with Node.js and used to install Node.js packages.
- gulp, a Node.js-based build tool.
- bower, a Node.js-based package manager used to install front-end packages (like Polymer).

**To install dependencies:**

1)  Check your Node.js version.

```sh
node --version
```

The version should be at or above 0.12.x.

2)  If you don't have Node.js installed, or you have a lower version, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

3)  Install `gulp` and `bower` globally.

```sh
npm install -g gulp bower
```

This lets you run `gulp` and `bower` from the command line.

4)  Install the starter kit's local `npm` and `bower` dependencies.

```sh
cd polymer-starter-kit && npm install && bower install
```

This installs the element sets (Paper, Iron, Platinum) and tools the starter kit requires to build and serve apps.

### Development workflow

## Application Theming

All theming is located in the file `app/elements/app-theme.html` and imported.

#### Serve / watch

```sh
gulp serve
```

This outputs an IP address you can use to locally test and another that can be used on devices connected to your network.

#### Serve / watch distribution
```sh
gulp serve
```

#### Run tests

```sh
gulp test:local
```

This runs the unit tests defined in the `app/test` directory through [web-component-tester](https://github.com/Polymer/web-component-tester).

#### Build & Vulcanize

```sh
gulp
```

Build and optimize the current project, ready for deployment. This includes linting as well as vulcanization, image, script, stylesheet and HTML optimization and minification.

#### Build & Deploy to Firebase hosting

```sh
gulp dist
```

Build and optimize the current project, and deploy to Firebase hosting using the firebase.json file.
