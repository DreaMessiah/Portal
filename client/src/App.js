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
import {TabelObj} from "./pages/tabel/Tabel";
import {TableTabel} from "./pages/tabel/TableTabel";
import { DataProvider } from './context/DataContext';
import TestTaskPage from "./pages/tasks/TestTaskPage";
import {ListTasks} from "./pages/listtasks/ListTasks";
import ObjectsPage from "./pages/objects/ObjectsPage";
import AdminDashboardPage from "./pages/administrator/AdminDashboardPage";

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
                        <Route path="/docpasslist" element={<ListTasks/>} />
                        <Route path="/objects" element={<ObjectsPage/>} />
                        <Route path="/dashboard" element={<AdminDashboardPage/>} />
                        <Route path="/tabel" element={<TabelObj/>} />
                        <Route path="/table-tabel" element={<TableTabel/>} />
                    </Routes>
                </div>
            </Router>
        </DataProvider>
    )
}

export default App
