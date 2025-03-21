# MGen Monorepo

## ENVs

* `MG_SITES_DIR` - **REQUIRED**
  * Must be the path to the folder containing the sites to be built.


## Command

* `pnpm build:static` - Builds the sties, then the frontend
* `pnpm build:sites` - Builds the sites to be rendered by `mgen`
* `pnpm bundle` - Builds the backend and frontend, then copies them into the `repos/mgen/` folder
* `pnpm generate` - Build the sites and bundle, then copy everything into the mgen folder




