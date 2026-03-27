# 变更日志

## [最新版本]

### ✨ 新功能

- **Monorepo 架构**：项目已成功改造成 monorepo 结构，包含以下目录：
  - `apps/`：包含应用宿主包
  - `base/`：基础模块包
  - `modules/`：业务模块包，包括 account-module、cpp-module 和 main-module

- **Cool App**：新增了 cool-app 示例应用，展示了 Expo 55.0.6 的新特性

- **按钮功能**：在应用中实现了按钮功能，包括点击计数和状态管理

### 🔧 改进

- **Expo 升级**：将 app 工程从旧版本升级到 Expo 55.0.6，并更新了相关依赖包

- **依赖管理**：统一了 expo-modules-core 的版本，确保与 Expo 55.0.6 兼容

- **路径别名**：修复了 tsconfig.json 中的路径别名配置，将错误的 `./scr/*` 改为正确的 `./src/*`

- **项目结构**：优化了项目结构，将应用代码移动到 `src/` 目录下，提高了代码组织的清晰度

### 🐛 修复

- **Metro 错误**：修复了 `(0 , _expoModulesCore.requireOptionalNativeModule) is not a function` 错误，通过更新 expo-modules-core 的版本解决

- **路径解析**：修复了无法解析 `@/hooks/useColorScheme` 的问题，通过修正 tsconfig.json 中的路径别名配置解决

- **依赖冲突**：解决了不同模块间的依赖版本冲突问题，确保所有模块使用兼容的依赖版本

### 📦 模块更新

- **base 模块**：基础模块，提供共享功能和组件

- **account-module**：账户相关功能模块

- **cpp-module**：C++ 相关功能模块，已更新依赖版本

- **main-module**：主功能模块，已更新依赖版本

## 技术细节

- **包管理**：使用 npm 作为主要包管理器，在根目录管理所有依赖

- **工作区**：配置了 npm 工作区，包括 app、base 和 modules/* 目录

- **构建工具**：使用 Expo 官方推荐的构建工具和配置

- **代码风格**：遵循项目现有的代码风格和规范

## 下一步计划

- 进一步完善各个模块的功能
- 添加更多测试用例
- 优化应用性能
- 增强用户界面和交互体验
