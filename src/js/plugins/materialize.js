import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

//Init select
const select = document.querySelectorAll("select");
M.FormSelect.init(select);

export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}

//Init autocompleate
const autocompleate = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(autocompleate);

export function getAutocompleateInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

//Init datepickers
const datepickers = document.querySelectorAll(".datepicker");
M.Datepicker.init(datepickers, {
  showClearBtn: true,
  format: 'yyyy-mm'
});

export function getDatePickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}
