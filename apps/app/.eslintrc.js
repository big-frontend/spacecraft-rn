module.exports = {
    root: true,
    plugins: ['workspaces'],
    rules: {
        'workspaces/no-relative-imports': 'error',
        'workspaces/require-dependency': 'error',
    },
}
