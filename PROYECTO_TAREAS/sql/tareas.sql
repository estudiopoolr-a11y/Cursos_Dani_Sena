create database if not exists todo_db;
use todo_db;

create table if not exists tasks (
    id int auto_increment primary key,
    title varchar(255) not null,
    description text,
    is_completed tinyint(1) default 0, --0 = pendiente, 1=completada
    author varchar(100) not null, --Quien creo la tarea (ej: 'andres','profesor')
    created_at timestamp default current_timestamp, --Fecha de creación
    updated_at timestamp default current_timestamp on update current_timestamp --Fecha de actualización
)   engine=InnoDB;

select * from tasks;