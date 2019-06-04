insert into users
    (first_name, last_name, email)
values
    ('Sean', 'Reid', 'sean@digitalcrafts.com')
;

insert into parks
    (name, address, street, city, state, picture)
values
    ('SPOA', '4440 Lexington Rd, Athens, GA 30605', '4440 Lexington Rd', 'Athens', 'Georgia', '/images/skatepark.jpg')
;

insert into reviews
    (score, content, park_id, user_id)
values
    (4, 'GNARLY DUDE!!!', 1, 1)
;