create table Results (
    id SERIAL PRIMARY KEY,
    result varchar NOT NULL,
    log_game timestamp NOT NULL DEFAULT now()
);
