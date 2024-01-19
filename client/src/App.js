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
import CreateTaskPage from "./pages/tasks/CreateTaskPage";
import {Weldingmain} from "./pages/welding/Weldingmain";
import {Yearwelding} from "./pages/welding/Yearwelding";
import {Tabel} from "./pages/welding/Tabel";

import { DataProvider } from './context/DataContext';
import TestTaskPage from "./pages/tasks/TestTaskPage";

function App() {
    return (
        <DataProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path='/' element={<AuthPage/>} />
                        <Route path='/main' element={<MainPage/>} />
                        <Route path="/settings" element={<SettingsPage/>} />
                        <Route path="/document" element={<DocumentPage/>} />
                        <Route path="/tasks" element={<TasksPage/>} />
                        <Route path="/welding" element={<Weldingmain />} />
                        <Route path="/createtask" element={<CreateTaskPage />} />
                        <Route path="/testtaskpage/:params" element={<TestTaskPage />} />
                        <Route path="/obj/:id" element={<Yearwelding />} />
                        <Route path="/lk" element={<LkPage/>} />
                        <Route path="/tabelwelding" element={<Tabel/>} />
                        <Route path="/lk" element={<MainPage/>} />
                        <Route path="/news" element={<NewsPage/>} />
                        <Route path="/selected_news/:id" element={<SelNewsPage/>} />
                    </Routes>
                </div>
            </Router>
        </DataProvider>
    )
}

export default App
