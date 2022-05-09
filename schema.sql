--  database sql code 


DROP TABLE IF EXISTS moves;
CREATE TABLE IF NOT EXISTS moves (
    id SERIAL PRIMARY KEY ,
    title VARCHAR (225),
    release_date VARCHAR (225),
    poster_path VARCHAR (225),
    overview VARCHAR (225)
);