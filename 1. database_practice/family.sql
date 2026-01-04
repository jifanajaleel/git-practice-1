create table if not exists family(
	member_id serial primary key,
	member_name varchar(15) unique not null,
	sex varchar(10),
	age smallint not null
);
select * from family;
insert into family() 