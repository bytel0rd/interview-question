# creates the chaka stocks database
CREATE DATABASE CHAKA;

# switch to chaka's database
USE CHAKA;

# creates the merchant table containing their corresponding biodatas
CREATE TABLE Merchants(
id VARCHAR(100),
  name VARCHAR(100), 
  short_name VARCHAR(100),
  # the exhange where the stock is being sold
  market VARCHAR(100),
  dividends FLOAT,
  volume INT,
  PRIMARY KEY(id)
  );
  
# creates the users table containing their user biodatas
CREATE TABLE Users(
id VARCHAR(100),
  name VARCHAR(100), 
    PRIMARY KEY(id)
  );
  
# creates the MarketStock table containing stocks daily performance
CREATE TABLE MarketStocks(
id INT AUTO_INCREMENT,
  merchantId VARCHAR(100), 
  date DATE,
  price DOUBLE,
  PRIMARY KEY(id)
  );
  
  # creates the MarketStock table containing stocks daily performance
CREATE TABLE UserStocks(
id INT AUTO_INCREMENT,
  merchantId VARCHAR(100),
  userId VARCHAR(100), 
  buying_date DATE,
  buying_price DOUBLE,
  PRIMARY KEY(id)
  );
  
  