CREATE FUNCTION moddatetime() RETURNS TRIGGER AS
$$
BEGIN
    new.updated_at = now();
    RETURN NEW;
END;
$$
    LANGUAGE plpgsql;

-- сотрудники
create table employees
(
    id   serial primary key,
    name text
);

-- пользователи
create table users
(
    id           serial primary key,
    username     text unique not null,
    display_name text,
    empl_id      integer
        references employees (id),
    email        text,
    phone        text,
    birthday     date,
    skills       text,
    created_at   timestamp default now(),
    updated_at   timestamp
);

CREATE TRIGGER update_updated_at
    BEFORE UPDATE
    ON users
    FOR EACH ROW
EXECUTE PROCEDURE moddatetime(updated_at);

-- уведомления
create table notifications
(
    id         serial primary key,
    title      text,
    body       text,
    full_text  text,
    user_id    integer
        references users (id),
    is_read boolean default false,
    created_at timestamp default now(),
    updated_at timestamp
);

CREATE TRIGGER update_updated_at
    BEFORE UPDATE
    ON notifications
    FOR EACH ROW
EXECUTE PROCEDURE moddatetime(updated_at);

-- устройства
create table devices
(
    id         serial primary key,
    name       text,
    type       text,
    user_id    integer
        references users (id),
    created_at timestamp default now(),
    updated_at timestamp
);

CREATE TRIGGER update_updated_at
    BEFORE UPDATE
    ON devices
    FOR EACH ROW
EXECUTE PROCEDURE moddatetime(updated_at);


-- мобильные устройства
create table mobile_devices
(
    id   serial primary key,
    name text,
    os   text
);

create table renting_devices
(
    id               serial primary key,
    mobile_device_id integer
        references mobile_devices (id),
    user_id          integer
        references users (id),
    created_at       timestamp default now(),
    updated_at       timestamp
);

-- проекты
create table projects
(
    id   serial primary key,
    name text
);

create table user_projects
(
    id         serial primary key,
    user_id    integer
        references users (id),
    project_id integer
        references projects (id)
);

-- таймер
create table hours_turnstile
(
    id         serial primary key,
    value      timestamp,
    user_id    integer
        references users (id),
    created_at timestamp default now(),
    updated_at timestamp
);

CREATE TRIGGER update_updated_at
    BEFORE UPDATE
    ON hours_turnstile
    FOR EACH ROW
EXECUTE PROCEDURE moddatetime(updated_at);

create table hour_timers
(
    id       serial primary key,
    type     text,
    user_id  integer
        references users (id),
    start_at timestamp,
    end_at   timestamp
);