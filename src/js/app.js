import "./plugins"; //При импорте папки оттуда будет браться index.js файл по умолчанию
import "../css/style.css";
import locations from "./store/locations";
import formUi from "./views/form";
import currencyUi from "./views/currency";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUi.form;

  //* Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmitForm();
  });

  //* Handlers
  async function onSubmitForm() {
    //собрать данные из инпутов в объект
    const origin = locations.getCityCodeByKey(formUi.originValue);
    const destination = locations.getCityCodeByKey(formUi.destinationValue);
    const depart_date = formUi.departDateValue; //умышленно создаём такие переменные, т.к. они будут возвращаться на сервер в таком виде
    const return_date = formUi.returnDateValue;
    const currency = currencyUi.currencyValue;

    console.log(origin, destination, depart_date, return_date, currency);
    locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    });
    // CODE, CODE, 2019-09, 2019-10
  }

  async function initApp() {
    await locations.init();
    formUi.setAutoCompleteData(locations.shortCitiesList);
  }
});
