create database tiendita;
use tiendita;
create table productos(
id_producto INT primary Key auto_increment,
nombre_producto VARCHAR (50), 
descripcion_producto VARCHAR (200),
precio_venta Decimal (18),
activo_producto boolean
);
use tiendita;
SELECT * From productos; -- READ (Leer)

insert into productos (nombre_producto,descripcion_producto,precio_venta,activo_producto)
values ("Colgate","Crema dental blanqueadora",4500,1);

insert into productos (nombre_producto,descripcion_producto,precio_venta,activo_producto)
values 
("Inflable","Flotador circular para piscina", 25000, 2),
("Inflable","Colchoneta flotante inflable", 45000, 1),
("Pelota","Balón inflable gigante para piscina", 15000, 3),
("Pistola de agua","Pistola de agua a presión", 35000, 4),
("Juego","Set de voleibol acuático", 60000, 1),
("Juego","Aros de buceo para piscina", 20000, 2),
("Gafas","Gafas de natación ajustables", 30000, 3),
("Gorro","Gorro de natación de silicona", 15000, 5),
("Sombrilla","Sombrilla de playa y piscina", 85000, 1),
("Toalla","Toalla de microfibra de secado rápido", 25000, 2),
("Bolso","Bolso impermeable para artículos húmedos", 30000, 2);

update productos 
set precio_producto = 2500
where id_producto = 3;

delete from productos
where id_producto = 3;

create table proveedores(
id_proveedor int primary key auto_increment,
nombre_proveedor varchar (50),
precio_docena decimal (18),
entrega_recibida boolean
)

SELECT * From proveedores; -- READ (Leer)

insert into proveedores (nombre_proveedor,precio_docena,entrega_recibida)
values 
("Dulcita",100000,1),
("Aseitin",250000,1),
("granitos",150000,1),
("Recreate",50000,1),
("Inima",190000,1);