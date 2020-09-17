module.exports = {
    projects: [
        "client",
        "server",
        {
            "displayName": "lint",
            "runner": "eslint",
            "testMatch": ["<rootDir>/server/**/*.ts"],
        },
    ]
}
