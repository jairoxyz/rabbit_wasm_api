# rabbit_wasm_api

Rabbitstream and Megacloud wasm extractor by drblgn.

Extracts the sources for the given embed id.
<br>
<br>

**Examples:**

`http://localhost:3000/megacloud.tube/{xrax}`

`http://localhost:3000/pepepeyo.xyz/{xrax}` 
<br>
<br>

## Installation

Created npm script tags and dockerfile to containerize the web app.
<br>

**Node**

To build: `npm run build`

To run: `npm run start`

**Docker**

To build: `docker build -t rabbit_wasm_api .`

To run: `docker run -restart=always --name rabbit_wasm_api -d -p 3000:3000 rabbit_wasm_api`
