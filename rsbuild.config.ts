import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import ESLintPlugin from 'eslint-webpack-plugin';

export default defineConfig({
  plugins: [pluginReact(), pluginSvgr()],
  tools: {
    bundlerChain(chain) {
      chain.plugin('eslint-plugin').use(ESLintPlugin, [
        {
          extensions: ['.js', '.ts', '.jsx', 'tsx', '.mjs', '.cjs'],
        },
      ]);
    },
  },
});
