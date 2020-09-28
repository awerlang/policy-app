module.exports = {
    projects: [
        "client",
        "server",
        {
            "displayName": "lint",
            "runner": "eslint",
            "modulePathIgnorePatterns": ['<rootDir>/dist'],
            "testMatch": [
                "<rootDir>/client/src/**/*.ts",
                "<rootDir>/server/src/**/*.ts",
            ],
        },
    ]
}
