import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import './assets/styles/styles.scss'
import './assets/styles/media1550.scss'

import MainPage from "./pages/MainPage"
import AuthPage from "./pages/AuthPage"
import SettingsPage from "./pages/SettingsPage"
import LkPage from "./pages/LkPage"
import NewsPage from "./pages/NewsPage"
import SelNewsPage from "./pages/SelNewsPage"
import DocumentPage from "./pages/DocumentPage"
import TasksPage from "./pages/tasks/TasksPage"
import {Weldingmain} from "./pages/welding/Weldingmain";
import {Yearwelding} from "./pages/welding/Yearwelding";
import {Tabel} from "./pages/welding/Tabel";

function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path='/' element={<AuthPage/>} />
                  <Route path='/main' element={<MainPage/>} />
                  <Route path="/settings" element={<SettingsPage/>} />
                  <Route path="/document" element={<DocumentPage/>} />
                  <Route path="/tasks" element={<TasksPage/>} />
                  <Route path="/welding" element={<Weldingmain />} />
                  <Route path="/obj/:id" element={<Yearwelding />} />
                  <Route path="/lk" element={<LkPage/>} />
                  <Route path="/tabelwelding" element={<Tabel/>} />
                  <Route path="/lk" element={<MainPage/>} />
                  <Route path="/news" element={<NewsPage/>} />
                  <Route path="/selected_news/:id" element={<SelNewsPage/>} />
              </Routes>
          </div>
      </Router>
  )
}

export default App
