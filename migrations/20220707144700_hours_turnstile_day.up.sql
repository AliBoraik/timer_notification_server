alter table hours_turnstile add column day date not null;
alter table hours_turnstile drop column value;
alter table hours_turnstile add column value integer;