
import { renderPage } from "./main.js"


export function render(data) {

  const container = document.createElement('div');
  container.classList.add('container', 'd-flex', 'justify-content-between', 'flex-wrap', 'py-4')
  let count = 1;


  for (const film of data.results) {
    const filmCard = document.createElement('a');
    const image = document.createElement('img');
    const cardBody = document.createElement('div');
    const title = document.createElement('h5');

    filmCard.style.width = '28%';
    filmCard.classList.add('card', 'my-2');
    // linkDetals.classList.add('card-link');
    image.classList.add('card-img-top', 'film-img');
    filmCard.id = count
    image.id = 'card-img' + count;
    cardBody.classList.add('card-body');
    title.classList.add('card-title');

    filmCard.append(image);
    filmCard.append(cardBody);
    cardBody.append(title);
    title.textContent = count + ':' + film.title;

    filmCard.addEventListener('click', async (e) => {
      console.log(filmCard.id)
      e.preventDefault()
      window.addEventListener('popstate', () => { })
      history.pushState(null, '', `?filmId=${filmCard.id}`)
      let main = await import('./main.js')
      main.renderPage('./detals.js',
        `https://swapi.dev/api/films/${filmCard.id}`,
        "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css",
        "./style.css")
    })
    container.append(filmCard);
    count++;
  }
  return container;
}