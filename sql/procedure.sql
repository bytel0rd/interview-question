USE CHAKA;

SELECT *, users.name AS username, merchants.name AS merchant from UserStocks 
	JOIN Users users
	JOIN Merchants merchants
	WHERE merchantId = "id" 
		AND userId = "id"
        AND merchants.id = merchantId;