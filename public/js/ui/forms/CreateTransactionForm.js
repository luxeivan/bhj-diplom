/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (response && response.data) {
          this.element.querySelector('.accounts-select').innerHTML = '';
          for (const elem of response.data) {
            this.element.querySelector('.accounts-select').insertAdjacentHTML('beforeend', `
              <option value="${elem.id}">${elem.name}</option>
            `);
          }
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.update();
        App.getModal('new' + data.type.charAt(0).toUpperCase() + data.type.slice(1)).close();
      }
    });
  }
}