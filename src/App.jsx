import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataProvider from './context/DataContext';
import FileUploader from './components/FileUploader';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import ActorsPage from './views/ActorsPage';
import Movie from './components/Movie';
import Actor from './components/Actor';

function App() {

  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
              <Route path='/' element ={<FileUploader />}/>
              <Route path='/home' element={<HomePage />}  />
              <Route path='/movies' element={<MoviesPage />}/>
              <Route path='/actors' element={<ActorsPage />} />
              <Route path='/movie/:id' element={<Movie />}/>
              <Route path='/actor/:id' element={<Actor />}/>
            </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
