CREATE TABLE Rol (
    rol_id INT AUTO_INCREMENT PRIMARY KEY,
    rol_name VARCHAR(30) NOT NULL
);

INSERT INTO Rol (rol_name) VALUES ('Administrador');
INSERT INTO Rol (rol_name) VALUES ('Cliente');

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(15) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    rol_id INT DEFAULT 2,
    FOREIGN KEY (rol_id) REFERENCES Rol(rol_id)
);

INSERT INTO Users (username, email, password, rol_id) VALUES
    ('admin', 'admin@example.com', '$2b$10$oYPec2vEvQhcdjbDNL82f.5H6lSElUhP2OVHR19LfSKzLJpaIs0sm', 1);

CREATE TABLE Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- Crear categorías
INSERT INTO Category (category_name)
VALUES
    ('Procesador'),
    ('Motherboard'),
    ('Cooler CPU'),
    ('Memoria RAM'),
    ('GPU'),
    ('Fuente de alimentación'), 
    ('Almacenamiento'), 
    ('Gabinete');


CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(30) NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(11, 2) NOT NULL,
    photo VARCHAR(300),
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);


CREATE TABLE CartItems (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

INSERT INTO Products (name, brand, category_id, price, photo, description) VALUES
    ('Motherboard PRIME H510M-K R2.0', 'ASUS', 2, 85999, 'https://drive.google.com/uc?id=1k9ghllnjg8_PYkA-FIiOxZOPDpsEqfLP', 'Placa madre LGA1200.'),
    ('Procesador Core i3-10100F 4.3GHz 6MB Comet Lake LGA1200 c/ Cooler', 'Intel', 1, 71999, 'https://drive.google.com/uc?id=12cFgHQvtzWZCqOMNJhCXZKzMSXZeTCgf', 'Procesador LGA1200.'),
    ('RAM FURY Beast DDR4 8GB 3200MHz CL16', 'Kingston', 4, 22999, 'https://drive.google.com/uc?id=1h6abTWZeYop3pmjBpAXer8VXPV7g845-', 'Memoria RAM DDR4.'),
    ('Fuente MWE 750 Bronze V2 750W 80+ Bronze', 'Cooler Master', 6, 56999, 'https://drive.google.com/uc?id=1AAS0UbrrSJCadgs-xocizhql68raTRh6', 'Fuente de poder 750W.'),
    ('SSD A400 240GB sata 2.5"', 'Kingston', 7, 18799, 'https://drive.google.com/uc?id=1RCBBmsRbVq3vSikmM3BmiuZ-fo5IIbOS', 'Disco sólido 240GB.'),
    ('GPU NVIDIA GeForce RTX 3080 VENTUS 3X PLUS OC 10GB GDDR6X PCIe 4.0 LHR', 'MSI', 5, 579999, 'https://drive.google.com/uc?id=12P6BgCfLtj8F9xtDFaggqORKhntAW65v', 'Placa de video PCIe 4.0 x16.'),
    ('Gabinete MasterBox TD500 Mesh Negro 3xFan ARGB + Controlador', 'Cooler Master', 8, 89999, 'https://drive.google.com/uc?id=14RVE4VtovxUD_fI7L8BOrbQ4LCkFYya4', 'Motherboard Support Mini ITX, Micro ATX, ATX, SSI CEB, E-ATX*, (*support for up to 12" x 10.7", will limit cable management features).'),
    ('Air Cooler CPU UX100 66.1mm TDP 65W ARGB AMD Intel', 'Thermaltake', 3, 18499, 'https://drive.google.com/uc?id=1JczuJrd13Wdgdy6ZuK78_i3OQOFnGq76', 'Disco sólido 240GB.'),
    ('Motherboard B450 AORUS Elite V2', 'GIGABYTE', 2, 114999, 'https://drive.google.com/uc?id=129oVwGoMYvjdmw10IfKTUiJR42Obbi1l', 'Socket AM4 y tamaño ATX.'),
    ('Procesador  Ryzen 5 5600X 4.6GHz 32MB Zen3 AM4 c/ Cooler', 'AMD', 1, 194999, 'https://drive.google.com/uc?id=1sVLhvJy3LZsnCClDksAdiaa69f7Z_mlE', 'Socket AM4.'),
    ('GPU AMD Radeon RX 6800 XT Phantom Gaming D OC 16GB GDDR6 PCIe4.0 ARGB + STARFIELD', 'ASRock', 5, 574999, 'https://drive.google.com/uc?id=1bFTTdcxYVKPaL7xET4qmBRHtq2iEIT0A', 'Placa de video PCIe 3.0 x16.');


