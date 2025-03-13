<h1 align="center">Seminars list</h1>
<h3 align="center">A simple list of seminars that is displayed using cards </h3>
<h3 align="left">Implemented features:</h3>
  <ul>
    <li>Rename seminar;</li>
    <li>Deleting a seminar;</li>
  </ul>

<h2>
  Commands to work on the project.
</br>
  To run locally on your machine (make sure that you have node.js and npm installed):
</h2>

#### clone the repository
```
git clone https://github.com/andomiele/seminars.git
```
#### install dependencies and let your system run the package
```
npm ci
```
## Development build
#### start backend server
```
make start-server
```
#### start frontend
```
make start-frontend
```
## Production build
#### build project
```
make build
```
#### start project
```
make start
```
## Uses
<ul>
  <li>Vite</li>
  <li>React</li>
  <li>React RTK Query</li>
  <li>Redux (reduxjs/toolkit)</li>
  <li>i18next</li>
</ul>

# Initial assignment

Необходимо развернуть локально `json-server` и загрузить в него данные **seminars**. Используйте любые удобные технологии, но обязательно с использованием React для реализации следующих функций:

1. **Запрос данных**

   - Запросите данные с семинарами из `json-server`.

2. **Отрисовка списка семинаров**

   - Отобразите список семинаров на странице.

3. **Удаление семинара**

   - Реализуйте кнопку удаления семинара, которая при клике открывает окно подтверждения.
   - При подтверждении удаления отправьте `DELETE` запрос на сервер.

4. **Редактирование семинара**

   - Реализуйте кнопку редактирования семинара.
   - Редактирование должно происходить в модальном окне.

5. **Размещение на GitHub**
   - Залейте проект на GitHub и пришлите ссылку.
   - **Важно:** `json-server` должен находиться в том же репозитории, что и приложение.

## Дополнительные рекомендации

- Используйте современные подходы (например, React Hooks, функциональные компоненты).
- Обратите внимание на обработку ошибок и состояния загрузки.
- Добавьте комментарии в код для пояснения ключевых моментов реализации.

