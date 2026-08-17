# Yuxuan Studio

宇轩的个人作品集与视觉探索站点，聚焦 AI 产品、Agent 工作流、复杂系统，以及西西与小光的创作世界。

站点采用“极简编辑式排版 + 蓝天草地视觉 + 轻量滚动交互”的设计方向，把产品案例、工作方法与持续探索组织成一个仍在生长的个人空间。

## 页面

- `index.html`：个人主页、精选项目、产品方法与联系方式。
- `explore.html`：四座岛屿组成的探索世界，介绍 AI 产品、复杂系统、产品方法与创作实践。
- `blog.html`：Product Notes 目录页。
- `notes/`：站点文章的唯一维护目录。

## 技术栈

- HTML / CSS / 原生 JavaScript
- Vite 8
- 本地图片与 SVG 资源，无运行时后端依赖

## 本地开发

需要 Node.js 18+（推荐使用当前 LTS 版本）。

```bash
npm install
npm run dev
```

启动后打开终端输出的本地地址即可预览。生产构建：

```bash
npm run build
npm run preview
```

## 项目结构

```text
.
├── index.html          # 作品集首页
├── explore.html        # 探索世界页面
├── blog.html           # Product Notes 目录
├── notes/              # 文章源文件，同时作为 Vite 页面入口
├── styles.css          # 全站样式与响应式布局
├── assets/             # 图片、插画与图标资源
├── design-archive/     # 历史设计探索稿，仅作归档
└── package.json        # 开发与构建脚本
```

## 部署

这是一个可部署到 GitHub Pages、Cloudflare Pages、Netlify 或其他静态托管服务的 Vite 项目。构建产物目录为 `dist/`，该目录已加入 `.gitignore`，部署平台应在构建时执行：

```bash
npm install
npm run build
```

并将 `dist/` 作为发布目录。

## 维护说明

- 修改页面文案或结构时，优先保持首页与探索页之间的导航锚点一致。
- 博客文章直接在 `notes/` 中维护；`scripts/build-notes.mjs` 仅保留为旧版文章导入工具，不参与日常构建。
- `../site/blog/` 是迁移前的历史目录，不再作为文章或图片的真源，也不应继续写入。
- 新增图片请放入 `assets/`，并为内容图片提供有意义的 `alt` 文本；纯装饰图片使用空 `alt`。
- `design-archive/` 用于保留设计迭代，不参与主站入口。

## License

本仓库主要用于个人作品集展示。除另有说明外，文案、图片、插画与视觉设计不授予未经许可的复制、再发布或商业使用权。
