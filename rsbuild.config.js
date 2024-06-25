import { defineConfig, loadEnv, rspack } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginSass } from '@rsbuild/plugin-sass';

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

export default defineConfig({
    html: {
        template: './public/index.html',
    },
    output: {
        sourceMap: false,
        distPath: {
            root: './build',
        },
        minify: true,
    },
    performance: {
        removeConsole: true,
    },
    dev: {
        startUrl: 'http://localhost:<port>',
    },
    server: {
        proxy: {
            '/api/': {
                target: 'http://www.xxx.com:20055',
                // pathRewrite: { '^/api': '' }
            }
        }
    },
    plugins: [
        pluginReact(),
        pluginSvgr({ mixedImport: true }),
        pluginSass(),
    ],
    tools: {
        rspack: {
            plugins: [
                new rspack.ProvidePlugin({
                    dayjs: 'dayjs',
                }),
            ]
        },
    },
    source: {
        define: publicVars,
        include: [{ not: /[\\/]core-js[\\/]/ }],
        alias: () => {
            return {
                '@': './src/',
            };
        },
    },
});
