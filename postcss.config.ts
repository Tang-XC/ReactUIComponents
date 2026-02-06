// postcss.config.ts
export default {
  plugins: {
    // 1. Tailwind CSS (生成原子类)
    '@tailwindcss/postcss': {},

    // 2. PostCSS Preset Env (将现代 CSS 转换为大多数浏览器可理解的 CSS)
    'postcss-preset-env': {
      stage: 3, // 默认使用阶段 3 的特性
      features: {
        'nesting-rules': false, // 如果你使用 Tailwind 的嵌套，建议关闭这个以避免冲突
      },
    },

    // 3. Autoprefixer (添加浏览器厂商前缀)
    // 注意：postcss-preset-env 实际上已内置了 autoprefixer，
    // 但显式添加它通常更安全，或者你可以用于覆盖特定配置。
    autoprefixer: {},
  },
}