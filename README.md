### Instructions to build JB customer theme from Scratch - Zero Files - Turbo Super Fast Theme ###
## {Read Instructions and Workflow Setup}
Instructions link - https://tinyurl.com/JBX334 
### Dummy Products data
import the CSV on this link https://github.com/shopifypartners/product-csvs

### Workflow Setup
1. Do your CSS in SCSS Files under `Styles` folder and all JS work to be done under `Scripts`
2. Do not write CSS but write SCSS , it should be written in Styles Folder in various sub folders as per components
3. All JS should be worked in Scripts folder, 
4. All liquid work is to be done as we do normall in any shoipfy theme, in templates, snippets, sections etc. Àdd sections like, Banner, navigation, announcemnt bar, and many other sections as we see in themes.


## Github Setup

Setup Github with these steps

1. Clone the repo

2. Create a new branch from development branch

3. Work in your new branch

4. Push your branch

5. Create a Pull request to pull your branch to devleopment

development <- your branch

## Project Setup

To build this project:

1. Clone repo locally

2. Get themekit password, ID and store name

3. Update config.yml file

4. Run `npm install`

5. Run `theme get --env=development`

once theme is downloaded compaletely 

6. Run `npm run JB-Start`

``` yaml
# password, theme_id, and store variables are required......

development:
  password: [your-api-password]
  theme_id: "[your-theme-id]"
  store: [your-store].myshopify.com
  ignores:
    -themekit.ignores
  ignore_files:
      - config/settings_data.json
      - config/settings_schema.json

staging:
  password: [your-api-password]
  theme_id: "[your-theme-id]"
  store: [your-store].myshopify.com
  ignores:
    -themekit.ignores
  ignore_files:
      - config/settings_data.json
      - config/settings_schema.json

production:
  password: [your-api-password]
  theme_id: "[your-theme-id]"
  store: [your-store].myshopify.com
  timeout: 100s
  readonly: true

```

6. Get password from a private app (All developers at The Taproom use the same app per client)

- **New Client**
  - Shopify admin => Apps => Private Apps => Manage Private Apps => Create New
    Private App
    - Enter App Name (e.g. Jas Brar Development) and Contact Email (e.g. jasbrar585@gmail.com) 
    - _Theme templates and theme assets_ set to **Read Write** access.
    - Save
    - Copy **Password**

    See gif below for walkthrough

- **Previous Client**
  - Shopify admin => Apps => Private Apps => Manage Private Apps => App Name (e.g. Taproom Theme Development)
    => Password

    Gif for walkthrough:
    ![Custom App Walkthrough](../setup-docs/shopify-local-theme-development-generate-api.gif)


## Cypress

[Cypress](https://www.cypress.io/) allows for a complete end-to-end testing experience and provides
in-browser testing. This allows us to accurately test Shopify stores from both
the live url and with preview links added.

To get started with Cypress, check out [their get started guide.](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Step-2-Query-for-an-element)

It is also recommended to checkout Cypress' [Best Practices guide](https://docs.cypress.io/guides/references/best-practices.html).

Live url for project is set as an environment variable in the `cypress.json`
file already. This will be the default url that is loaded.

### Cypress Dev Setup

If you would like to test themes that aren't live, follow these steps.

1. Add `cypress.env.json` file to the project root.

2. In `cypress.env.json` add the following code:

``` json
{
  "dev-query": "?preview_theme_id=xxxxx",
  "is-dev": "true"
}
```

_Note: Change out theme id to your preview theme id_

3. Start any new file with this inside the `describe` block:

``` javascript
let url = Cypress.env("url");
let devQuery = "";

if(Cypress.env("is-dev") == "true") {
  devQuery = Cypress.env("dev-query");
}
```

4. When visiting in `spec` file, url can be referenced as:

``` javascript
cy.visit(`${url}${devQuery}`);
```

5. To remove the preview query param from being appended to the url, change `is-dev` to `false` in `cypress.env.json`.
