#!/bin/sh

set -e

psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "postgres" <<-EOSQL
  CREATE TABLE pingpongs (
   created_at TIMESTAMP NOT NULL
);
EOSQL
