DROP TABLE IF EXISTS note;
DROP TABLE IF EXISTS tag;

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE note (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text TEXT,
    archived BOOLEAN DEFAULT FALSE,
    tag_id INT REFERENCES tag(id) ON DELETE SET NULL
);

INSERT INTO tag (name)
VALUES
    ('sports'),
    ('work'),
    ('studies'),
    ('home'),
    ('family'),
    ('hobby');




