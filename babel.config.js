module.exports = {
    presets: ['@babel/preset-env', '@babel/typescript'],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        [
            'module-resolver',
            {
                extensions: ['.js', '.ts'],
                root: ['.']
            }
        ]
    ]
}
