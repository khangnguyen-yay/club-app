CREATE TABLE IF NOT EXISTS clubs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    club_name VARCHAR(100) NOT NULL,
    type VARCHAR(255),
    fb VARCHAR(255),
    ig VARCHAR(255),
    website TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

LOAD DATA INFILE '/var/lib/mysql-files/clubs.csv'
INTO TABLE clubs
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
ESCAPED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(club_name, type, fb, ig, website, notes);
