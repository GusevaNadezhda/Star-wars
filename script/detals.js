
import { loadResurse } from "./main.js";

// функция создания DOM-элементов страницы с деталями

export  function render(data){
  console.log("детали" , data)

  const container = document.createElement('div');
  const filmTitle = document.createElement('h1');
  const filmBack = document.createElement('a');
  const article = document.createElement('article');
  const descr = document.createElement('p');
  const colums = document.createElement('div');

  container.classList.add('container', 'justify-content-between', 'flex-wrap', 'py-4', 'hidden');
  filmTitle.classList.add('film-title');
  filmBack.classList.add("btn", "btn-back")
  descr.classList.add('alert', 'alert-info', "film-descr");
  colums.classList.add('row');

  filmTitle.textContent = data.title + " " + data.episode_id;
  filmBack.textContent = "Back to episodes";
  descr.textContent = data.opening_crawl;

  for (let i = 0; i < 3; i++) {
    const colum = document.createElement('div');
    const infoListTitle = document.createElement('h2');

    colum.classList.add('col-sm');
    infoListTitle.classList.add('list_title');
    colum.dataset.num = "colum-" + (i+1)

    colum.style.width = '28%';
    

    Promise.all([
      data.characters,
      data.planets,
      data.species,
      ].map(list => createInfoList(list))).then(([list1, list2,list3]) => {

        console.log(list1)
        switch (colum.getAttribute("data-num")) {
          case "colum-1":
            infoListTitle.textContent = "Список героев"
            colum.append(infoListTitle)
            colum.append(list1)
            colums.append(colum);
            break
          case "colum-2":
            infoListTitle.textContent = "Список планет"
            colum.append(infoListTitle)
            colum.append(list2)
            colums.append(colum);
          break
          
          case "colum-3":
            infoListTitle.textContent = "Список рас"
            colum.append(infoListTitle)
            colum.append(list3)
            colums.append(colum);
          break
        }
        container.classList.remove('hidden')
      })
  }


  filmBack.addEventListener('click', async (e)=>{
    e.preventDefault()
    window.addEventListener('popstate', ()=>{})

    history.pushState(null, '', `?films`)
    let main = await import('./main.js')
      main.renderPage('./films-list.js',
    "https://swapi.dev/api/films/",
    "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css",
    "./style.css") 
    })

  container.append(filmTitle);
  container.append(filmBack);
  container.append(article);
  container.append(colums);
  article.append(descr);

  return container;
}

export async function  createInfoList(arr){
  const list = document.createElement('ul');

  list.classList.add("info_list")

  for(let item of arr){
    const listItem = document.createElement('li');
    const dataItem = await loadResurse(item);

    listItem.textContent = dataItem.name;
    list.append(listItem);
  }
  return list
}



    