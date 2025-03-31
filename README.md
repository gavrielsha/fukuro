# 🦉 Fukuro

![screenshot](./demo.png)

A simple, efficient RSS reader desktop application based on the excellent [Bubo Reader](https://github.com/georgemandis/bubo-rss) by George Mandis and Kevin Fiol's RSS-Reader Fork.

## Features

- Clean, minimal interface for distraction-free reading
- Group feeds by category
- View all articles in one place
- Works entirely offline - no cloud service required
- Easy installation via Flatpak

## Installation

### Option 1: Download the Flatpak

1. Download the latest Flatpak from the [Releases page](https://github.com/gavrielsha/fukuro/releases)
2. Install it with:
   ```
   flatpak install --user ./fukuro.flatpak
   ```

### Option 2: Build from source

```shell
# Clone the repository
git clone https://github.com/yourusername/fukuro.git
cd fukuro

# Install dependencies
npm install

# Run the development version
npm start

# Build the Flatpak
npm run build
flatpak-builder --force-clean build-dir com.gavrielsha.Fukuro.json
flatpak-builder --user --install --force-clean build-dir com.gavrielsha.Fukuro.json
```

## Configuration

Edit `src/feeds.json` to add your own RSS feeds organized by category.

```json
{
  "feeds": [
    "https://hnrss.org/frontpage?points=10&comments=5&count=35"
  ],
  "blogs": [
    "https://kevinfiol.com/atom.xml",
    "https://danluu.com/atom.xml"
  ]
}
```

## License

MIT License
