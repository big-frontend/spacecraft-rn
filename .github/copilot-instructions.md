# Copilot 指引

## 仓库概览

这是一个 React Native/Expo monorepo，包含两个应用和多个本地 Expo 原生模块。

**工作区**（根目录 `package.json`）：`apps/*`、`base`、`modules/*`

| 工作区 | 用途 |
|--------|------|
| `apps/app` | 主应用，基于 Expo Router（传感器数据、模块演示） |
| `apps/cool-app` | 次要应用，无测试，UI 较新 |
| `modules/main-module` | 本地 Expo 原生模块（JSI，`requireNativeModule`） |
| `modules/cpp-module` | 本地 Expo 原生模块（C++ 桥接） |
| `modules/account-module` | 本地 Expo 原生模块（账户功能） |
| `base` | 共享本地 Expo 原生模块 |

## 构建、测试与 Lint 命令

**根目录 `package.json` 没有任何脚本**，所有命令须在对应工作区目录下执行。

### `apps/app`
```sh
cd apps/app
expo start               # 启动开发服务器
expo start --android     # Android
expo start --ios         # iOS
npx react-native start --reset-cache  # 清除 Metro 缓存重启
expo lint                # 代码检查
jest --watchAll          # 测试（监听模式）

# 运行单个测试
npx jest src/components/__tests__/ThemedText-test.tsx
npx jest -t "renders correctly"
```

### `apps/cool-app`
```sh
cd apps/cool-app
expo start / expo start --android / expo start --ios / expo start --web
expo lint
```

### 本地模块（`modules/main-module`、`modules/cpp-module`）
```sh
cd modules/main-module   # 或 cpp-module
npm run build            # expo-module build
npm run test             # expo-module test
npm run prepare          # expo-module prepare
npm run clean            # expo-module clean

# 运行单个测试
npm run test -- <testPathPattern>
# 或直接调用：
npx expo-module test <testPathPattern>
```

> **`base` 和 `modules/account-module`** 没有真正的测试/构建流程，其 `test` 脚本仅为占位符。

## 架构说明

### Expo Router（文件系统路由）
两个应用均使用 Expo Router，路由文件位于 `src/app/`：
- `_layout.tsx` — 根 Stack/Tab 容器
- `(tabs)/` — Tab 组（文件名即路由名）
- 各屏幕文件自动注册为路由

`apps/app` 的根布局目前渲染的是一个 `Stack`，包含命名屏幕（`main-module`、`settings`），`(tabs)` 组在 `_layout.tsx` 中被注释掉了，未在顶层暴露。

### 本地 Expo 原生模块
所有本地模块遵循统一结构：

```
src/
  NativeModule.ts        # requireNativeModule<Interface>('ModuleName')
  NativeModule.web.ts    # Web 端 stub（接口相同）
  NativeModule.types.ts  # 共享类型（事件、Props）
  NativeModuleView.tsx   # 原生视图组件
  NativeModuleView.web.tsx
index.ts                 # 从 src/ 统一重新导出
```

- 原生模块通过 `expo-modules-core` 的 `requireNativeModule` 加载（基于 JSI）。
- Web 端会自动解析 `.web.ts` 而非 `.ts`——添加平台差异逻辑时，两个文件都需创建。
- `expo-module.config.json` 驱动每个模块的构建。

### 路径别名
`apps/app` 和 `apps/cool-app` 中，`@/*` 映射到 `./src/*`：
```ts
import { useColorScheme } from '@/hooks/useColorScheme';
import SensorChart from '@/components/SensorChart';
```
在应用内有 `@/` 可用时，不要使用 `../../` 相对路径导入。

### 平台特定文件
`*.web.ts` / `*.web.tsx` 模式用于 Web 端覆写，Metro 和 Expo 打包器会自动解析。当平台实现差异较大时，优先使用此模式而非 `Platform.OS` 判断。

## 关键约定

### 状态管理
无外部状态库（无 Redux、Zustand 等）。所有状态均使用本地 `useState`/`useRef`，主题上下文由 React Navigation 的 `ThemeProvider` 管理。传感器订阅通过 `useEffect` 清理函数 + `useRef` 缓冲数据。

### 主题组件
`ThemedText` 和 `ThemedView` 接受 `lightColor`/`darkColor` props，通过 `useThemeColor()` hook 解析颜色。色板定义在 `src/constants/Colors.ts`。新建 UI 组件时应遵循此模式，不要硬编码颜色。

### 测试
- `apps/app` 使用 `jest-expo` preset，以快照测试为主。
- 测试文件位于 `src/components/__tests__/`（与组件同级）。
- 快照文件（`.snap`）需提交到仓库。

### TypeScript
- 所有 `tsconfig.json` 均开启 `strict: true`，不允许隐式 `any`。
- 模块 API 需定义显式接口（参考 `MainModule.types.ts` 的模式）。
- 仅用于类型的导入优先使用 `type` 关键字。

### EAS 构建配置
`eas.json` 中有三个构建档位：`development`（开发客户端，内部分发）、`preview`（内部分发）、`production`（自动递增版本号）。`appVersionSource: remote`。

### Git Hooks
根目录存在 `lefthook.yml`，但所有 hook 均已注释——当前无 pre-commit/pre-push 强制检查。

### 模块依赖
应用通过包名声明本地模块依赖（如 `"main-module": "*"`），不要用相对路径跨包导入，始终使用包名。

### 路由注意：`sensor.tsx`
`apps/app/src/app/(tabs)/sensor.tsx` 文件存在，但**未在** `(tabs)/_layout.tsx` 中注册——不会自动出现为 Tab。如需使用，需添加 `<Tabs.Screen name="sensor" .../>` 条目。
