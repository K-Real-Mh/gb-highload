import './create-news.module.scss';
import React, {ChangeEvent, useContext, useState} from 'react';
import {NewsDispatchContext, Types} from '../news-context/news-context';

function CreateNews() {
  const [state, setState] = useState({title: '', description: ''});

  const dispatch = useContext(NewsDispatchContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('http://localhost:3333/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    })
      .then(response => response.json())
      .then(data => {
        alert(state.title + ' успешно создана!');
        setState({
          title: '',
          description: ''
        });
        dispatch({
          type: Types.Add,
          news: {
            ...data,
            createdAt: Date.now(),
          }
        })
      })
      .catch(() => {
        alert('Ошибка :-(');
      });
  }

    return (
      <form onSubmit={handleSubmit}>
        <h1>Создание новости</h1>
        <p>
          <label>
            <legend>Заголовок</legend>
            <input required name="title" type="text" value={state.title} onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            <legend>Текст</legend>
            <textarea required name="description" value={state.description} onChange={handleChange} />
          </label>
        </p>
        <input type="submit" value="Добавить" />
      </form>
    );

}

export default CreateNews;
