This is a backend app to track your stock trade and gain better insight of your transaction history. I made this because there are some things that I want to know from my history but my broker app has limitation. 

This app use PostgreSQL as the database. 

The link to the Postman documentation is: https://documenter.getpostman.com/view/11327521/2sAXjF7a7a
Currently live on: https://stock-tracker-wz3m.onrender.com/

# Preparation
Make a .env file containing these:
```
NODE_ENV = 'development' #[development, test, production]
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=stock_tracker
PORT=3000
```
After that, run ```npx sequelize-cli db:migrate```

# How to Run
Input ```npm start``` in the terminal

# Next Improvement
- Stock CRUD
- Activity CRUD
- Google OAuth
- Unit testing
- Docker