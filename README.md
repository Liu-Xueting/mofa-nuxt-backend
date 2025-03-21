# 膜法集市后台项目

本项目实现膜法集市的 **后端** 和 **后台页面**。

## 1. 特性

- [x] 🚀 [Nuxt 3](https://nuxt.com/) + [TypeScript](https://www.typescriptlang.org/)
- [x] ✨ UI 使用 [Element-Plus](https://element-plus.org/)
- [x] 🎨 [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) 多主题适配，自定义主题
- [x] 🍍 [Pinia](https://pinia.vuejs.org/) 自动导入、持久化 + SSR 支持
- [x] 🎇 [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new) 自动修复，无需 Prettier
- [x] 🪝 [Simple Git Hooks](https://github.com/toplenboren/simple-git-hooks) + [commitlint](https://commitlint.js.org/) 规范提交
- [x] 🐳 Docker 用于开发及构建、生产

使用 VS Code 可获得最佳开发体验，安装推荐插件即可。

## 2. 开始

默认使用 Node.js 22，如果没有安装推荐使用 NVM/FVM 安装。

```bash
nvm install 22 --lts
nvm use 22
```

如果没有安装 `pnpm`，请先安装 `pnpm`：

```bash
corepack enable
corepack install -g pnpm@latest
pnpm setup
```

如果没有 `corepack` 或安装过程中出错，请更新 `corepack`：

```bash
npm i -g corepack@latest
```

安装依赖：

```bash
pnpm i
```

开发：

```bash
pnpm dev
```

构建：

```bash
pnpm build
```

可视化查看数据库：

```bash
pnpm studio
```

在开发模式中可以查看 API 文档 <http://localhost:3000/docs>。
