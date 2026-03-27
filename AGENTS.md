# AGENTS.md

Guidance for coding agents working in this repository.
This repo is a React Native/Expo monorepo with multiple workspaces and an `ext/` sub-workspace.

## 1) Repository shape

- Root workspace: `spacecraft-rn` (Expo Router app + local modules).
- Root workspaces: `app`, `base`, `modules/*`.
- Additional nested workspace: `ext/` with its own `apps/*` and `packages/*`.
- Important local modules used by app:
  - `modules/account-module`
  - `modules/cpp-module`
  - `modules/main-module`
  - `base`

## 2) Package manager and execution model

- Primary lockfile at root is `package-lock.json`.
- Prefer `npm` commands at repo root unless working inside `ext/` ecosystem.
- In `ext/`, package scripts are largely `yarn`-oriented in package definitions; use workspace-local command style if needed.
- Do not assume scripts exist in every package; check each `package.json` first.

## 3) Build, lint, test commands

### Root (`/`)

- Install deps: `npm install`
- Start dev server (configured): `npm run start`
  - Note: currently points to `node scripts/start-dev.js`, but `scripts/start-dev.js` is missing in this repo snapshot.
- Metro clean start: `npm run start:clean`
- Run on Android: `npm run android`
- Run on iOS: `npm run ios`
- Run on web: `npm run web`
- Lint (Expo lint): `npm run lint`
- Test (watch mode): `npm test`

### Run a single test (root Jest)

- Preferred: `npx jest app/components/__tests__/ThemedText-test.tsx`
- By name: `npx jest -t "renders correctly"`
- Through npm script (disable watch explicitly):
  - `npm test -- --watchAll=false app/components/__tests__/ThemedText-test.tsx`

### Local Expo modules (`modules/main-module`, `modules/cpp-module`)

- Build: `npm run build`
- Clean: `npm run clean`
- Test: `npm run test`
- Prepare: `npm run prepare`
- Prepublish checks: `npm run prepublishOnly`

### Single test in Expo module packages

- Try: `npm run test -- <testPathOrPattern>`
- If forwarding is unclear, use underlying tool directly:
  - `npx expo-module test <testPathOrPattern>`

### `modules/account-module` and `base`

- These currently do not have real test/build pipelines in scripts.
- `test` scripts intentionally fail with placeholder text.
- If adding tests/builds, align with `expo-module` conventions used by sibling modules.

### `ext/` workspace

- Root ext workspace has no top-level build/lint/test scripts.
- Use per-package scripts below.

### `ext/packages/flightbase`

- Test all: `npm run test`
- Test single file: `npm run test -- src/__tests__/index.test.tsx`
- Test by name: `npm run test -- -t "<name>"`
- Type check: `npm run typescript`
- Lint: `npm run lint`
- Build (bob): `npm run prepare`
- Clean native/example build artifacts: `npm run clean`

### `ext/apps/flight`

- Start Metro: `npm run start`
- Android: `npm run android`
- iOS: `npm run ios`
- Test all: `npm run test`
- Test single: `npm run test -- __tests__/App-test.js`
- Lint: `npm run lint`

### `ext/apps/train`

- Start: `npm run start`
- Android: `npm run android`
- iOS: `npm run ios`
- Web: `npm run web`

### `ext/apps/hotel`

- Start (dev client): `npm run start`
- Android: `npm run android`
- iOS: `npm run ios`
- Web: `npm run web`

## 4) Code style and conventions

These conventions are inferred from current code and config. Follow existing local style when editing.

### Formatting

- TypeScript/TSX code generally uses 2-space indentation.
- Use semicolons consistently in TS/TSX (common in current codebase).
- Prefer single quotes in JS/TS (dominant style in app/modules/ext packages).
- Keep object/array literals readable; avoid dense one-liners for complex logic.

### Imports

- Group imports in this order:
  1) External packages
  2) Blank line
  3) Internal/local imports
- Keep import specifiers minimal; use `type` imports where appropriate.
- Respect workspace dependency boundaries:
  - Root ESLint enforces `workspaces/no-relative-imports` and `workspaces/require-dependency`.
  - Do not cross-package import via relative paths when workspace package import is expected.

### Types and TypeScript

- Root `tsconfig.json` has `"strict": true`; preserve strict typing.
- Prefer explicit interfaces/types for non-trivial object shapes.
- Avoid `any`; if unavoidable, constrain and isolate it.
- Type async return values explicitly when not obvious.
- Use platform-specific files where needed (`*.web.ts`, `*.web.tsx`, native module split files).

### Naming

- Components: PascalCase (`SensorChart`, `ThemedText`).
- Hooks: `useXxx` (`useThemeColor`).
- Utility/local vars and functions: camelCase.
- Constants: UPPER_SNAKE_CASE for true constants (e.g., `SCREEN_WIDTH`).
- Test files: `*.test.*` or `*-test.*` following local package patterns.

### React/React Native patterns

- Functional components + hooks are standard.
- Keep side effects inside `useEffect`; clean up subscriptions/timers.
- Prefer small, focused components and colocated styles via `StyleSheet.create`.
- In Expo modules, keep `index.ts` re-export pattern consistent.

### Error handling

- Do not swallow errors silently.
- For async native/module calls, use `try/catch` and provide actionable error messages.
- Fail fast on invalid inputs in shared modules.
- Preserve existing app behavior; avoid introducing global error side effects unless required.

### Linting and quality gates

- Run lint and tests for affected package(s) before finalizing changes.
- Minimum checks for root app changes:
  - `npm run lint`
  - `npx jest <changed-test-or-pattern>` or full relevant test run
- For `ext/packages/flightbase` changes, run:
  - `npm run lint`
  - `npm run typescript`
  - `npm run test`

## 5) Cursor/Copilot rule files

- No `.cursorrules` found.
- No `.cursor/rules/` directory found.
- No `.github/copilot-instructions.md` found.
- If any of these files are added later, treat them as high-priority guidance and update this document.

## 6) Practical agent workflow

- Determine target workspace first (`/`, `modules/*`, `ext/apps/*`, `ext/packages/*`).
- Run commands from the correct directory for that package.
- Make minimal, scoped edits; avoid cross-workspace refactors unless requested.
- Match surrounding style over generic preferences.
- When adding new scripts/tooling, document them in this file.
