--
-- Data for Name: parks; Type: TABLE DATA; Schema: public; Owner: ranger
--

INSERT INTO parks (id, name, address, street, city, state, picture) VALUES (1, 'SPOA', '4440 Lexington Rd, Athens, GA 30605', '4440 Lexington Rd', 'Athens', 'Georgia', '/images/skatepark.jpg');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ranger
--

INSERT INTO users (id, first_name, last_name, email, password) VALUES (8, 'Sean', 'Reid', 'sean@digitalcrafts.com', '$2a$10$aT7y8dK2.uIRRaFHGucDCOyVKSOvKar1QsR52b5BYI1hQ3GbM0zZS');
INSERT INTO users (id, first_name, last_name, email, password) VALUES (12, 'Mat', 'Hoffman', 'mat@hoffman.com', '$2a$10$KwUm9Igi9UA7rmobPcHU1OxoRfHvM./H9wE2CmAZKDLF8s3Pbhe7S');
INSERT INTO users (id, first_name, last_name, email, password) VALUES (13, 'Derp', 'McDerp', 'derp@mcderp.com', '$2a$10$iHsmGvXQTUKulGR8xeYAluZB58CVGnct6hVPGC9daZ3rq6i.3/J6q');


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: ranger
--

INSERT INTO reviews (id, score, content, park_id, user_id) VALUES (1, 4, 'GNARLY DUDE!!!', 1, 8);
