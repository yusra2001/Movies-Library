--  database sql code 

DROP TABLE IF EXISTS movei;

CREATE TABLE IF NOT EXISTS movei (
    id varchar(255),
    title varchar(255),
    releasedate varchar(255),
    posterpath varchar(255)
);
