/* eslint-env commonjs */
module.exports = {
    'env': {
        'browser': true,
        'es2020': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'rules': {
        // Strict mode
        'no-unused-vars': [1],
        'no-label-var': [2],
        'no-shadow': [2],
        'no-undef-init': [2],
        'no-undefined': [2],
        'no-use-before-define': [2],


        // Best Practices

        // Stylistic 
        'indent': [2, 4],
        'quotes': [2, 'single'],
        'semi': [2, 'always'],
        'semi-spacing': [2],
        'brace-style': [2],
        'curly': [2],
        'camelcase': [2],
        'comma-spacing': [2],
        'comma-style': [2],
        'computed-property-spacing': [2],
        'consistent-this': [2],
        'eol-last': [2],
        'func-call-spacing': [2],
        'func-name-matching': [2],
        'implicit-arrow-linebreak': [2],
        'key-spacing': [2],
        'keyword-spacing': [2],
        'lines-between-class-members': [2],
        'max-depth': [2],
        'max-len': [2, {'code': 140}],
        'max-lines': [2, {'max': 600}],
        'max-lines-per-function': [2, {'skipComments': true}],
        'max-nested-callbacks': [2, {'max': 10}],
        'max-params': [2, {'max': 6}]
    }
};
