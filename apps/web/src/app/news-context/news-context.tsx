import {createContext, ReactNode, Dispatch, useReducer, useEffect} from 'react';

export interface PeaceOfNews {
  id: number,
  title: string,
  description: string,
  createdAt: number
}

export type News = PeaceOfNews[];

export enum Types {
  Init = 'INIT_NEWS',
  Add = 'ADD_NEWS'
}

export type Action = { type: Types.Init, news: News } | { type: Types.Add, news: PeaceOfNews };

export const NewsContext = createContext<News>([]);
export const NewsDispatchContext = createContext<Dispatch<any>>(() => null);

interface Props {
  children: ReactNode
}

const sortNews = (news: PeaceOfNews[]) => {
  return news.sort((a, b) => a.createdAt - b.createdAt)
}

export function NewsProvider({ children } : Props) {
  const [news, dispatch] = useReducer(
    newsReducer,
    initialNews
  )

  useEffect(() => {
    fetch('http://localhost:3333/api/news')
      .then(response => response.json())
      .then(news => {
        const sortedNews = sortNews(news);

        dispatch({
          type: Types.Init,
          news: sortedNews,
        })
      })
  }, []);

  return (
    <NewsContext.Provider value={news}>
      <NewsDispatchContext.Provider value={dispatch}>
        {children}
      </NewsDispatchContext.Provider>
    </NewsContext.Provider>
  )
}


function newsReducer(news: News, action: Action) {
  switch (action.type) {
    case Types.Init: {
      return [...action.news];
    }
    case Types.Add: {
      return [...news, action.news];
    }
  }
}

const initialNews = [] as News;
