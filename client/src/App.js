import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import './assets/styles/styles.scss'

import MainPage from "./pages/MainPage"
import AuthPage from "./pages/AuthPage"
import SettingsPage from "./pages/SettingsPage"
import LkPage from "./pages/LkPage"
import NewsPage from "./pages/NewsPage"
import SelNewsPage from "./pages/SelNewsPage"
function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path='/' element={<AuthPage/>} />
                  <Route path='/main' element={<MainPage/>} />
                  <Route path="/settings" element={<SettingsPage/>} />
                  <Route path="/lk" element={<LkPage/>} />
                  <Route path="/news" element={<NewsPage/>} />
                  <Route path="/selected_news/:id" element={<SelNewsPage/>} />
              </Routes>
          </div>
      </Router>
  )
}

export default App
