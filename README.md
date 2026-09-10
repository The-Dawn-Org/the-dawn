# The Dawn - Web

React 19 + TypeScript + Vite SPA for the air-defense investigation platform.
MUI v9 (RTL, dark "command room" theme), react-router, `@mui/x-charts`.

Target runtime: Node 22.

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
```

The dev server proxies `/finance` to `http://localhost:3000` (see
`vite.config.ts`), so run `the-dawn-server` alongside it.

## Environment variables

These are the frontend's variables only. The API's variables (`DB_*`, `PORT`,
`ENVIRONMENT`, `LOGFARE_API_KEY`) are documented in `the-dawn-server/README.md`
- none of them belong here.

### Build time (baked into the bundle by `vite build` - `VITE_` prefix)

| Variable | Default | Notes |
| --- | --- | --- |
| `VITE_FINANCE_API_URL` | `""` (empty) | Base URL for the finance API in `src/api/economicAnalysisAPI.ts`. Empty means same-origin relative requests (`/finance/...`), which the vite proxy handles in dev and nginx handles in the image. Set it to an absolute URL only to bypass the proxy. |

Because Vite inlines these at build time, changing one requires a **rebuild** -
setting it on a running container has no effect.

### Runtime (read by nginx inside the image)

| Variable | Default | Notes |
| --- | --- | --- |
| `API_URL` | `http://localhost:3000` | Where nginx forwards `/finance/` requests. The default is wrong anywhere but your own machine. Running the container against a server on your Mac, use `http://host.docker.internal:3000`. In GKE, the server's Service URL, e.g. `http://the-dawn-server:3000`. **This is the only variable the deployment has to set.** |

### The listen port is not a variable

nginx listens on **8080**, hard-coded in `nginx.conf.template` (`listen 8080;`)
and mirrored by `EXPOSE 8080`. There is no env var for it, so a ConfigMap entry
would do nothing - the Service just needs `targetPort: 8080`. Making it
configurable means templating the `listen` directive. Note that `EXPOSE`
publishes nothing on its own; `-p` locally and `containerPort` in GKE are what
actually route traffic.

### Known gap

`src/api/axios.ts` hard-codes `baseURL: "http://localhost:3000/"`. That
instance is **not configurable** and will break once deployed - it needs to move
to a relative base (so the nginx proxy covers it) or read a `VITE_` variable
before the app ships to GKE.

## Docker

### Build

```bash
docker build -t the-dawn-web:local .
```

```bash
# with an absolute finance API instead of the nginx proxy
docker build --build-arg VITE_FINANCE_API_URL=https://api.example.com -t the-dawn-web:local .
```

Multi-stage: `node:22-alpine` runs `tsc -b && vite build`, then the static
output is served by `nginxinc/nginx-unprivileged:alpine`.

### Run locally

The container listens on **8080**. The server's CORS allowlist is
`http://localhost:5173`, so publish on 5173 when testing against it:

```bash
docker run --rm -p 5173:8080 \
  -e API_URL=http://host.docker.internal:3000 \
  the-dawn-web:local
```

Then open http://localhost:5173

`API_URL` is substituted into `/etc/nginx/conf.d/default.conf` from
`nginx.conf.template` at container start by the official nginx entrypoint.

### GKE notes

- Container listens on **8080** as UID 101 - satisfies `runAsNonRoot` and the
  no-privileged-ports policy. Point the Service at `targetPort: 8080`.
- Set `API_URL` to the in-cluster server Service so `/finance/` resolves.
- `nginx.conf.template` includes an SPA fallback (`try_files ... /index.html`)
  so deep links like `/operational-performance` load on refresh.
- The image is static - no `VITE_` variable can be changed after build.
