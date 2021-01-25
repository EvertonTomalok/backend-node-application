# CHANGELOG.md

## 1.1.0 (2021-01-24) # Release

Features:

- Tests was implemented


## 1.0.0 (2021-01-24) # Release

Features:

- Release V1.0.0 (tag)
- CRUD tools
- Create and auth user
- Swagger documentation
- Docker, scripts and others implementation

Security:

- Improving Operations on database using informations retrieved from JWT, like userId.
- Using middlewares to auth user. Only passing a valid JWT (valid for 1 hour) someone can operate the API.