import './news.module.scss';
import {useContext} from 'react';
import {NewsContext} from '../news-context/news-context';

export function News() {

  const news = useContext(NewsContext);

  return (
    <div>
      <h1>Последние новости</h1>
      <ul>
      {news.map(peaceOfNews => {
        return <li key={peaceOfNews.id}>
          <h2>{peaceOfNews.title}</h2>
          <p>{peaceOfNews.description}</p>
          <hr/>
        </li>
      })}
      </ul>
    </div>
  );
}

export default News;
