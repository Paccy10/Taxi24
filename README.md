# Taxi24

[![Build Status](https://travis-ci.org/Paccy10/Taxi24.svg?branch=master)](https://travis-ci.org/Paccy10/Taxi24) [![Coverage Status](https://coveralls.io/repos/github/Paccy10/Taxi24/badge.svg?branch=master)](https://coveralls.io/github/Paccy10/Taxi24?branch=master)

## Description

Taxi24 API is an API that will help taxi companies to manage their fleet of drivers and allocate drivers to passengers.

## Installation and Setup

-   Clone the repository

```
git clone https://github.com/Paccy10/Taxi24.git
```

-   Install dependencies

```
npm install
```

-   Create Databases

```
- Open the SQL shell
- Run 'CREATE DATABASE database_name;'
- Run 'CREATE DATABASE test_database_name;'
```

-   Make a copy of the .env.sample file and rename it to .env and update the variables accordingly:

```
DB_USERNAME = YOUR DATABASE USERNAME
DB_PASSWORD = YOUR DATABASE PASSWORD
DB = YOUR DATABASE NAME
TEST_DB_USERNAME = YOUR TEST DATABASE USERNAME
TEST_DB_PASSWORD = YOUR TEST DATABASE PASSWORD
TEST_DB = YOUR TEST DATABASE NAME

```

-   Apply migrations

```
sequelize db:migrate
```

-   Seed initial data to the database

```
sequelize db:seed:all
```

-   Run the application

```
npm start
```

-   Running tests and generating report

```
npm test
```

## API Endpoints

-   GET `/api/v1/drivers` Get all drivers
-   GET `/api/v1/drivers/available` Get all available drivers
-   GET `/api/v1/3km` Get drivers within 3km
-   GET `/api/v1/drivers/:driverID` Get a single driver
-   GET `/api/v1/riders` Get all riders
-   GET `/api/v1/riders/closest` Get 3 closest drivers
-   GET `/api/v1/riders/:riderID` Get a single rider
-   POST `/api/v1/trips` Create a trip
-   PATCH `/api/v1/trips/complete` Complete a trip
-   GET `/api/v1/trips/active` Get all active trips
