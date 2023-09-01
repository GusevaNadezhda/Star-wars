


// Переменные

let cssPromise = {};


// 1. функция работы сайта

// 2. функция создания DOM-элементов главной страницы.  
// На ней загружается и показывается список эпизодов с указанием номера и названия в каждом элементе. 
// Элементы должны быть ссылками на детальную страницу эпизода.

// 3. функция загрузки ресурса: данные с сервера, js модуль или css файл

export function loadResurse(src){
if(src.endsWith('.js')){
  // модули грузим через динамический import
  return import(src)
}
if(src.endsWith('.css')){
  if(!cssPromise[src]){
     // создаем подключение link
  const link = document.createElement('link');
  link.rel = "stylesheet";
  link.href = src;
  cssPromise[src] = new Promise(resolve => {
    link.addEventListener('load', () => resolve());
  })
    document.head.append(link);
  }
 return cssPromise[src]
}

return fetch(src).then(res => res.json())
}

// // загрузка модуля server
// loadResurse('./server.js')
// // загрузка модуля detals
// loadResurse('./detals.js')
// // загрузка стилей Bootstrap
// loadResurse("https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css")
// // загрузка всех серий
// loadResurse("https://swapi.dev/api/films/")

const appContainer = document.getElementById('app')
const searchParams = new URLSearchParams(location.search)


const filmId = searchParams.get('filmId')

export function renderPage(moduleName, apiUrl, bootstrapCss, styleCss){
  Promise.all([moduleName, apiUrl, bootstrapCss, styleCss].map(src => loadResurse(src)))
  .then(([pageModule, data]) => {
    appContainer.innerHTML = '';
    appContainer.append(pageModule.render(data))
  })
}

if(filmId){
  renderPage('./detals.js',
  `https://swapi.dev/api/films/${filmId}`,
  "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css",
  "./style.css")

}else{
  renderPage('./films-list.js',
  "https://swapi.dev/api/films/",
  "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css",
  "./style.css")
}
