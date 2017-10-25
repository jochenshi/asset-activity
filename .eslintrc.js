module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        es6: true,
        node: true,
        commonjs: true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'eslint:recommended',
    // required to lint *.vue files
    plugins: [
        'react'
    ],
    // add your custom rules here
    'rules': {
        'no-unused-vars': [
            'warn',
            {
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],
        'no-console': 0
    }
}