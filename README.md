# AH Vocal Songs

A sleek web player for vocal songs with non-downloadable audio.

## Setup

1. **Add your audio files** to `assets/audio/`:
   - `song1.mp3`
   - `song2.mp3`
   - `song3.mp3`

2. **Replace cover images** in `assets/covers/` with your own (JPG, PNG, or SVG). Update `index.html` if you use different filenames.

3. **Edit track metadata** in `index.html` (song titles, artist names) and `player.js` (audio file paths if different).

## Running locally

Open `index.html` in your browser (double-click or drag into a tab). It works with both `file://` and when hosted on a server.

## GitHub Pages deployment

1. Push the project to a GitHub repo.
2. **Settings** → **Pages** → set **Source** to the branch that has the files (e.g. `main`).
3. Save. The site will be available at `https://<username>.github.io/<repo-name>/`.

The `.nojekyll` file ensures all assets are served correctly. Paths work for both project sites (`/repo-name/`) and user sites (`/`).

## Audio protection

- Custom controls only (no native download button)
- Custom controls hide the native download option
- Right-click disabled on artwork and controls
