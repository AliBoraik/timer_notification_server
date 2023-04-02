alter table hours_turnstile drop column day;
alter table hours_turnstile drop column value;
alter table hours_turnstile add column value timestamp;