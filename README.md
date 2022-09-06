# E-Commerce API

[E=Commerce API URL](https://e-commerce-api-cj.herokuapp.com/)

#### Setup

```bash
npm install && (npm start || npm run dev)
```

#### .env file

```bash
1. Setup .env in the root
2. Add MONGO_URI with correct value of mongodb database URI
3. Add JWT_LIFETIME for the life time of cookies (1d or any other)
4. Add JWT_SECRET for jwt token
```

#### Routers

- auth
- order
- product
- user
- review

#### DataBase Model

- User Model
- Product Model
- Review Model
- Order Model

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit
