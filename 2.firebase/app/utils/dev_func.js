export const log = (DEV_MODE)
  ? console
    .log
    .bind(window.console)
  : (() => '');