import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import shebang from 'rollup-plugin-add-shebang';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/docs-cli.js',
        format: 'cjs'
    },
    plugins: [
        typescript(),
        nodeResolve({
            exportConditions: ['node'],
            preferBuiltins: false,
        }),
        commonjs(),
        json(),
        shebang({
            include: 'dist/docs-cli.js',
        }),
        terser()
    ]
};
