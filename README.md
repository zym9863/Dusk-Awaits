**简体中文** | [English](README-EN.md)

# dusk-awaits

一个使用 React Router 构建、支持服务端渲染（SSR）的全栈 React 应用模板。

## 技术栈

- React 19 + React DOM
- React Router 7（@react-router/dev 构建、数据加载与变更）
- Vite 6（开发与打包）
- TypeScript 5（严格模式）
- Tailwind CSS v4（已集成）
- Node.js（Docker 基础镜像为 Node 20）

## 快速开始

建议使用 Node 18+（推荐 20+）。

### 安装依赖

本仓库包含 `pnpm-lock.yaml`，也可以使用 npm。请选择其一：

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm（会生成 package-lock.json）
npm install
```

### 本地开发（HMR）

```bash
npm run dev
```

默认在 http://localhost:5173 运行（Vite）。

### 类型检查

```bash
npm run typecheck
```

### 构建

```bash
npm run build
```

构建输出位于 `build/`：
- `build/client` 静态资源
- `build/server` SSR 服务器入口（`index.js`）

### 生产运行（本机）

```bash
# 先构建
npm run build

# 启动 SSR 服务（默认端口 3000，可用环境变量 PORT 指定）
npm run start
# 或：PORT=8080 npm run start
```

服务默认监听 3000 端口，由 `react-router-serve ./build/server/index.js` 提供服务。

## Docker 部署

本项目提供了多阶段构建的 Dockerfile（Node 20 Alpine）。

```bash
docker build -t dusk-awaits .

# 默认应用监听 3000 端口
# 将容器端口映射到宿主机
docker run -p 3000:3000 dusk-awaits
```

注意：Dockerfile 使用 `npm ci` 并引用 `package-lock.json`。如果你使用 pnpm，请先在本地通过 `npm install` 生成 `package-lock.json` 再构建镜像，或者自行调整 Dockerfile 以适配 pnpm。

可部署到任意支持容器的平台（例如：AWS ECS、Cloud Run、Azure Container Apps、Fly.io、Railway 等）。

## 配置与特性

- SSR 已开启：见 `react-router.config.ts` 中的 `ssr: true`
- Vite 插件：`@react-router/dev/vite`、`@tailwindcss/vite`、`vite-tsconfig-paths`
- TypeScript 路径别名：`~/* -> ./app/*`

## 项目结构（节选）

```
app/
  routes/
    home.tsx
    echo-chamber.tsx
    twilight-plaza.tsx
  utils/
    data-manager.ts
  welcome/
    welcome.tsx
public/
  favicon.ico
```

- 路由与页面置于 `app/routes/`
- 通用工具置于 `app/utils/`
- UI 与样式：Tailwind v4 已配置，可在 `app/app.css` 中扩展

## 可用脚本

- `npm run dev`：开发模式（HMR）
- `npm run build`：产物构建
- `npm run start`：启动生产服务（使用构建产物）
- `npm run typecheck`：类型生成 + TS 校验

## 常见问题

- 端口相关：
  - 开发：Vite 默认 5173
  - 生产：默认 3000（可通过 `PORT` 环境变量覆盖）
- 使用 pnpm 构建 Docker：请调整 Dockerfile（或改用 npm 以生成 package-lock.json）。

---

Made with ❤️ using React Router.
