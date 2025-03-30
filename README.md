# 🦉 Fukuro

![screenshot](./demo.png)

[Demo Site](https://kevinfiol.com/rss-reader/)

This is a personal fork of the excellent [Bubo Reader](https://github.com/georgemandis/bubo-rss) by George Mandis and Kevin Fiol's RSS-Reader Fork.

## How to build

Node `>=18.x` required.

```shell
npm install
npm run build
```

## How to host on Github Pages

1. Fork this repo!
2. Enable [Github Pages](https://pages.github.com/) for your repo (either as a project site, or user site)
3. Configure `.github/workflows/build.yml` to your liking
    * Uncomment the `schedule` section to enable scheduled builds
