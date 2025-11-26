CREATE TABLE IF NOT EXISTS clubs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    club_name VARCHAR(100) NOT NULL,
    type VARCHAR(255),
    app_date DATETIME,
    fb VARCHAR(255),
    ig VARCHAR(255),
    website TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    display_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS club_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    club_id INT NOT NULL,
    preference ENUM('considering', 'applying', 'applied', 'none') DEFAULT 'none',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (club_id) REFERENCES clubs(id)
);

LOAD DATA INFILE '/var/lib/mysql-files/clubs_dates.csv'
INTO TABLE clubs
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
ESCAPED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(@club_name, @type, @app_date, @fb, @ig, @website, @notes, @extra)
SET 
    club_name = @club_name,
    type = @type,
    app_date = STR_TO_DATE(@app_date, '%Y-%m-%d %H:%i:%s'),
    fb = @fb,
    ig = @ig,
    website = @website,
    notes = LEFT(@notes, 255);