# Vimnote

Take note with Vim.

## Run Locally

Install

```bash
$ npm install
```

Run

```bash
$ npm run
```

## Run in Docker

Build

```bash
$ docker build -t heronyang/vimnote .
```

Run

```bash
$ docker run -p 8080:8080 -d heronyang/vimnote
```

## Lint

```bash
$ npx standard --fix
```
