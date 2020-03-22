# Vimnote

Take note with Vim.

## Build

```bash
$ docker build -t heronyang/vimnote .
```

## Run

```bash
$ docker run -p 49160:8080 -d heronyang/vimnote
```

It runs on [localhost:49160](http://localhost:49160)

## Lint

```bash
$ npx standard --fix
```
