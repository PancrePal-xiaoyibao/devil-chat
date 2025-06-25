# Devil Chat - 胰腺癌医患对话模拟系统

## 项目简介

Devil Chat 是一个基于 React 和 TypeScript 开发的医患对话模拟系统，专门针对胰腺癌相关的医疗咨询场景。该系统通过模拟真实的医患对话，帮助用户了解胰腺癌的诊断、治疗方案和相关医疗知识。

## 项目目的

- **教育普及**：通过交互式对话帮助患者和家属了解胰腺癌相关知识
- **决策支持**：模拟不同治疗方案的咨询过程，辅助医疗决策
- **沟通训练**：为医护人员提供患者沟通技巧的训练平台
- **知识传播**：以生动的对话形式传播准确的医疗信息

## 文件结构

```
devil-chat/
├── README.md                          # 项目说明文档
├── devil-chat-prototype.html           # 原型HTML文件
├── questions                           # 对话场景数据文件
├── rmc6236官宣.md                      # 相关医疗资讯（英文）
├── rmc6236官宣_中文.md                 # 相关医疗资讯（中文）
└── project/                           # React项目主目录
    ├── .bolt/                         # Bolt配置文件
    ├── .gitignore                     # Git忽略文件配置
    ├── dist/                          # 构建输出目录
    ├── src/                           # 源代码目录
    │   ├── App.tsx                    # 主应用组件
    │   ├── index.css                  # 全局样式
    │   ├── main.tsx                   # 应用入口文件
    │   └── vite-env.d.ts             # TypeScript类型定义
    ├── index.html                     # HTML模板
    ├── package.json                   # 项目依赖配置
    ├── package-lock.json              # 依赖锁定文件
    ├── vite.config.ts                 # Vite构建配置
    ├── tailwind.config.js             # Tailwind CSS配置
    ├── postcss.config.js              # PostCSS配置
    ├── eslint.config.js               # ESLint代码规范配置
    ├── tsconfig.json                  # TypeScript配置
    ├── tsconfig.app.json              # 应用TypeScript配置
    └── tsconfig.node.json             # Node.js TypeScript配置
```

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式框架**：Tailwind CSS
- **图标库**：Lucide React
- **代码规范**：ESLint

## 功能特性

- 多场景对话模拟（胰腺癌治疗方案咨询、检查和治疗建议等）
- 交互式问答系统
- 场景选择和切换功能
- 响应式设计，支持多设备访问
- 详细的医疗解释和建议

## 快速开始

1. 进入项目目录：
   ```bash
   cd project
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 构建生产版本：
   ```bash
   npm run build
   ```

5. 预览生产版本：
   ```bash
   npm run preview
   ```

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目。请确保代码符合项目的编码规范。

## 许可证

本项目仅供学习和研究使用，不得用于商业用途。医疗信息仅供参考，不能替代专业医疗建议。