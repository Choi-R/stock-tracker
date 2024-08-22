This is a backend app to track your stock trade using PostgreSQL as the database.

# Preparation
Make a .env file containing these:
NODE_ENV = 'development' #[development, test, production]
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=stock_tracker
PORT=3000

Run ```npx sequelize-cli db:migrate```

# How to Run
Input ```npm start``` in the terminal