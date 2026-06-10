# timphongho.com

Mobile-first rental contact page for `timphongho.com`.

## Run Locally

```powershell
npm start
```

Open:

```text
http://localhost:3000/
```

## Deploy To Vercel

This project is configured for Vercel with `vercel.json`.

Use these settings if Vercel asks:

```text
Framework Preset: Other
Build Command: None
Output Directory: frontend
Install Command: None
```

Only `frontend/` is deployed. The `app/` folder is just a local static server for development.

## Structure

```text
.
|-- app/
|   `-- server.js                 # Local static server
|-- frontend/
|   |-- index.html                # Page markup and render hooks
|   |-- data/
|   |   `-- profile.json          # Editable profile content and links
|   `-- assets/
|       |-- css/
|       |   `-- styles.css        # Mobile-first UI
|       `-- js/
|           `-- script.js         # Loads profile.json and renders content
|-- package.json                  # Project scripts
|-- start-server.ps1              # Windows helper for background server
|-- vercel.json                   # Vercel static deployment config
`-- README.md
```

## Where To Edit

- Rental profile, phone number, tags, and links: `frontend/data/profile.json`
- Mobile interface: `frontend/assets/css/styles.css`
- Data rendering: `frontend/assets/js/script.js`
- Static server: `app/server.js`

This keeps the project ready for a future admin/backend without mixing it into the frontend.
