module.exports = {
    projects: [
        "client",
        "server",
        {
            "displayName": "lint",
            "runner": "eslint",
            "modulePathIgnorePatterns": ['<rootDir>/dist'],
            "testMatch": ["<rootDir>/server/**/*.ts"],
        },
    ]
}
