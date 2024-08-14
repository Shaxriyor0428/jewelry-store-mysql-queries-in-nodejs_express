SHOW DATABASES;
CREATE DATABASE IF NOT EXISTS Zargar_stores;

USE zargar_stores;

CREATE TABLE Customers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address VARCHAR(255),
    passport_info VARCHAR(255)
);


CREATE TABLE Products (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255),
    price DECIMAL(10, 2),
    category_id INT,
    stock_quantity INT,
    gramms INT,
    description VARCHAR(255)
);

CREATE TABLE Categories (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE Installment_Plans (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    months INT,
    months_rate INT
);


CREATE TABLE Contract (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    status_id INT,
    customer_id INT,
    product_id INT,
    contract_date DATE,
    initial_payment DECIMAL(10, 2),
    installment_id INT,
    total_price DECIMAL(10,2),
    months_payment DECIMAL(10,2)
);

CREATE TABLE Payments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    contract_id INT,
    payment_date DATE,
    amount DECIMAL(10, 2)
);


CREATE TABLE Status (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    contract_status VARCHAR(255)
);


INSERT INTO Customers (full_name, email, phone, address, passport_info) VALUES
('Ali Ahmedov', 'ali.ahmedov@example.com', '+998901234567', 'Tashkent, Uzbekistan', 'AA1234567'),
('Gulnara Karimova', 'gulnara.karimova@example.com', '+998902345678', 'Samarkand, Uzbekistan', 'GK2345678'),
('Olimjon Tursunov', 'olimjon.tursunov@example.com', '+998903456789', 'Bukhara, Uzbekistan', 'OT3456789'),
('Dilorom Ibragimova', 'dilorom.ibra@example.com', '+998904567890', 'Andijan, Uzbekistan', 'DI4567890'),
('Azizbek Murodov', 'azizbek.murodov@example.com', '+998905678901', 'Namangan, Uzbekistan', 'AM5678901'),
('Shirin Yusupova', 'shirin.yusupova@example.com', '+998906789012', 'Ferghana, Uzbekistan', 'SY6789012'),
('Ravshanbek Rahimov', 'ravshanbek.rahimov@example.com', '+998907890123', 'Karakalpakstan, Uzbekistan', 'RR7890123'),
('Yulduzbek Mamatov', 'yulduzbek.mamatov@example.com', '+998908901234', 'Kashkadarya, Uzbekistan', 'YM8901234'),
('Svetlana Ivanova', 'svetlana.ivanova@example.com', '+998909012345', 'Jizzakh, Uzbekistan', 'SI9012345'),
('Nodirbek Djalilov', 'nodirbek.djalilov@example.com', '+998910123456', 'Qarshi, Uzbekistan', 'ND0123456');



INSERT INTO Products (product_name, price, category_id, stock_quantity, gramms, description) VALUES
('Gold Ring', 250.00, 1, 50, 10, 'Elegant gold ring with diamond'),
('Silver Necklace', 150.00, 2, 30, 20, 'Stylish silver necklace with pearl'),
('Diamond Earrings', 500.00, 1, 20, 5, 'Exquisite diamond earrings set'),
('Emerald Bracelet', 300.00, 3, 25, 15, 'Emerald bracelet with intricate design'),
('Platinum Watch', 1000.00, 4, 15, 50, 'Luxury platinum watch with leather strap'),
('Sapphire Pendant', 350.00, 2, 40, 8, 'Beautiful sapphire pendant in gold'),
('Ruby Ring', 400.00, 1, 35, 12, 'Elegant ruby ring with gold setting'),
('Pearl Earrings', 200.00, 3, 45, 4, 'Classic pearl earrings in silver'),
('Jade Necklace', 180.00, 2, 20, 30, 'Jade necklace with traditional design'),
('Gold Bracelet', 220.00, 1, 25, 14, 'Classic gold bracelet with fine detailing');



INSERT INTO Categories (name, description) VALUES
('Gold Jewelry', 'Jewelry made from gold'),
('Silver Jewelry', 'Jewelry made from silver'),
('Precious Stones', 'Jewelry featuring precious stones'),
('Luxury Watches', 'High-end luxury watches');


INSERT INTO Installment_Plans (months, months_rate) VALUES
(35,3),
(45, 6),
(20, 12);



INSERT INTO Contract (status_id, customer_id, product_id, contract_date, initial_payment, installment_id, total_price, months_payment) VALUES
(1, 1, 1, '2024-08-01', 50.00, 1, 250.00, 50.00),
(2, 2, 2, '2024-08-05', 30.00, 2, 150.00, 15.00),
(3, 3, 3, '2024-08-10', 100.00, 3, 500.00, 25.00),
(1, 4, 4, '2024-08-15', 75.00, 1, 300.00, 75.00),
(2, 5, 5, '2024-08-20', 200.00, 2, 1000.00, 83.33),
(3, 6, 6, '2024-08-25', 150.00, 3, 350.00, 29.17),
(1, 7, 7, '2024-09-01', 80.00, 1, 400.00, 80.00),
(2, 8, 8, '2024-09-05', 60.00, 2, 200.00, 16.67),
(3, 9, 9, '2024-09-10', 100.00, 3, 180.00, 15.00),
(1, 10, 10, '2024-09-15', 70.00, 1, 220.00, 70.00);



INSERT INTO Payments (contract_id, payment_date, amount) VALUES
(1, '2024-08-01', 50.00),
(2, '2024-08-05', 30.00),
(3, '2024-08-10', 100.00),
(4, '2024-08-15', 75.00),
(5, '2024-08-20', 200.00),
(6, '2024-08-25', 150.00),
(7, '2024-09-01', 80.00),
(8, '2024-09-05', 60.00),
(9, '2024-09-10', 100.00),
(10, '2024-09-15', 70.00);


INSERT INTO Status (name, contract_status) VALUES
('Active', 'Active'),
('Completed', 'Pending'),
('Pending', 'Completed');



SELECT p.product_name FROM products p
LEFT JOIN contract c ON p.id = c.product_id
WHERE c.contract_date BETWEEN  "2024-08-02" AND "2024-08-08"


SELECT c.contract_date,p.product_name, i.months_rate as shartnoma_muddati,
i.months as qoyilgan_foiz,p.price,
((p.price - pay.amount ) * (i.months / 100)) + p.price  as customer_tolashi_kerak,
CURRENT_DATE() - DATE(c.contract_date) as otib_ketgan_kunlari FROM customers cus
LEFT JOIN contract c ON cus.id = c.customer_id
LEFT JOIN products p ON p.id = c.product_id
LEFT JOIN installment_plans i ON c.installment_id = i.id
LEFT JOIN Payments pay ON c.id = pay.contract_id
WHERE c.contract_date < "2024-08-15";


SELECT ((p.price - pay.amount ) * (i.months / 100)) + p.price tolanishi_kerak FROM contract c 
LEFT JOIN payments pay ON c.id = pay.contract_id
LEFT JOIN installment_plans i ON c.installment_id = i.id
LEFT JOIN products p ON p.id = c.product_id

SELECT ((p.price - pay.amount ) * (i.months / 100)) + p.price tolanishi_kerak FROM contract c 
LEFT JOIN payments pay ON c.id = pay.contract_id
LEFT JOIN installment_plans i ON c.installment_id = i.id
LEFT JOIN products p ON p.id = c.product_id

SELECT (((p.price - pay.amount ) * (i.months / 100)) + p.price) / i.months_rate as oyma_Oy_tolanishi_kerak FROM contract c 
LEFT JOIN payments pay ON c.id = pay.contract_id
LEFT JOIN installment_plans i ON c.installment_id = i.id
LEFT JOIN products p ON p.id = c.product_id



SELECT * FROM contract;


