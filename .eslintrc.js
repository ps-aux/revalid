module.exports = {
    extends: [
        'plugin:@typescript-eslint/recommended',
        'eslint-config-standard'
        // 'prettier/@typescript-eslint',
    ],
    plugins: ['prettier'],
    parser: 'babel-eslint',
    rules: {
        curly: 'off',
        'space-before-function-paren': 'off',
        'prettier/prettier': 'error',
        // Prettier conflict
        'standard/computed-property-even-spacing': 'off',
        'promise/param-names': 'off',
        indent: 'off',
        // So we can use comma operator
        'no-sequences': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    },
    overrides: [
        {
            files: [
                '*.test.js',
                '*.spec.js',
                '*.test.ts',
                '*.spec.ts',
                'src/_test/**'
            ],
            globals: {
                jest: true,
                it: true,
                expect: true,
                afterAll: true,
                beforeAll: true,
                beforeEach: true,
                describe: true
            }
        },
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module'
            }
        }
    ],

    settings: {}
}
