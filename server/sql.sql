CREATE DATABASE wocky;

CREATE TABLE signup(
    username VARCHAR(255);
    address VARCHAR(42);
    photoPath VARCHAR(255);
    ipfs VARCHAR(255);
)

ALTER TABLE signup ADD COLUMN ipfs VARCHAR(255);