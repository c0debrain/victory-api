module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    extends: 'airbnb-base',
    'env': {
        browser: false,
        node: true
    },

    // add your custom rules here
    'rules': {
        'global-require': 0,
        'no-param-reassign': 0,
        'import/no-unresolved': 0,
        'import/imports-first': 0,

        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

        'indent': ['warn', 4],
        'linebreak-style': ['warn', 'unix'],
        'comma-dangle': ['warn', 'never'],
        'max-len': ['off', 120],
        'semi': ['warn', 'never'],
        'no-console': ['off']
    }
}