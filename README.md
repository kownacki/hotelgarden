# hotelgarden.pl

## Install dependencies

```
$ npm install
```

## Run for development

```
$ npm run dev
```

## Build TS

```
$ npm run build-ts
```

## Generate files

Generate all using:

```
$ npm run generate-all
```

Or separately:

* index.html: `$ npm run generate-index`

* lodashBundle: `$ npm run generate-lodash`

* docs: `$ npm run generate-docs`

## Building
```
$ npm run build
```

## Deployment

### Hosting

Before deploying:
1. Install deps.
2. Generate all files.
3. Build.
4. Run `npm run firebase-login` if you're not logged in to firebase.

```
$ npm run deploy-hosting
```

### Functions

Before deploying:
1. Install deps in `functions/`.
2. Run `npm run build` in `functions/`
3. Run `npm run firebase-login` if you're not logged in to firebase.

From root project directory:
```
$ npm run deploy-functions
```
