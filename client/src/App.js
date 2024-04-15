import React, {useContext, useEffect} from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import './assets/styles/styles.scss'
import './assets/styles/media1550.scss'

import MainPage from "./pages/old/MainPage"
import AuthPage from "./pages/old/AuthPage"
import SettingsPage from "./pages/old/SettingsPage"
import LkPage from "./pages/old/LkPage"
import NewsPage from "./pages/old/NewsPage"
import SelNewsPage from "./pages/old/SelNewsPage"
import DocumentPage from "./pages/old/DocumentPage"
import CreateTaskPage from "./pages/tasks/old/CreateTaskPage";
import { DataProvider } from './context/DataContext';
import TestTaskPage from "./pages/tasks/old/TestTaskPage";
import DocumentsPage from "./pages/documents/DocumentsPage";
import FileManagerPage from "./pages/documents/fileManagerPage";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import PhonebookPage from "./pages/old/PhonebookPage";
import PeoplesPage from "./pages/old/PeoplesPage";
import ODataPage from "./pages/old/ODataPage";
import ChatPage from "./pages/conference/ChatPage";
import NewstartPage from "./pages/NewstartPage";
import LkNewPortal from "./pages/lknewportal/LkNewPortal";
import NewPayList from "./pages/NewPayList";
import NewPhoneBook from "./pages/NewPhoneBook";
import MainTasks from "./pages/tasks/MainTasks";
import ThisTask from "./pages/tasks/ThisTask";
import Createnews from "./pages/news/Createnews";
import Viewnews from "./pages/news/Viewnews";
import AllListNews from "./pages/news/AllListNews";
import Listnews from "./pages/news/Listnews";
import ListFastBtns from "./pages/fastbtns/ListFastBtns";
import PollsPage from "./pages/survey/PollsPage";
import PollsCms from "./pages/survey/PollsCms";
import HallEdit from "./pages/hallofframe/HallEdit";
import ContestPage from "./pages/kidscontest/ContestPage";
import LoadPage from "./pages/kidscontest/LoadPage";
import MainCms from "./pages/news/MainCms";
import Message from "./pages/message/Message";
import TaskRouter from "./pages/tasks/TaskRouter";
import StructureRouter from "./pages/structure/StructureRouter";
import NewPageObjects from "./pages/objects/NewPageObjects";
import ThisObj from "./pages/objects/ThisObj";
import {ListTab} from "./pages/objects/ListTabelNewPortal";
import {ThisTableTabel} from "./pages/objects/TableTabel";
import Statements from "./pages/documents/Statements";
import {WelMY} from "./pages/welding/WelMY";
import {WelTabel} from "./pages/welding/WelTabel";
import {WelControll} from "./pages/controll/ControllNew";
import {WelSett} from "./pages/welding/WeldingSett";
import {EconomistMenu} from "./pages/economist/EconomistMenu";

import OgmPage from "./pages/econom/OgmPriceRouter";
import {ItogTabel} from "./pages/tabel/ItogTabel";


function App() {
    const {store} = useContext(Context)
    useEffect(() => {
        if(localStorage.getItem('token')){
            store.checkAuth()
        }
    },[])
    if(store.isLoading){
        return <div>Загрузка...</div>
    }
    if(!store.isAuth) return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='*' element={<AuthPage/>} />
                </Routes>
            </div>
        </Router>
    )
    return (
        <DataProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path='/ktulist' element={<OgmPage page={5}/>}/>
                        <Route path='/ktu' element={<OgmPage page={4}/>}/>
                        <Route path='/t13' element={<OgmPage page={3}/>}/>
                        <Route path='/workprice' element={<OgmPage page={2}/>}/>
                        <Route path='/ogmprice' element={<OgmPage page={1}/>}/>
                        <Route path='/tasks/list' element={<TaskRouter page={3}/>}/>
                        <Route path='/structure' element={<StructureRouter/>}/>
                        <Route path='/tasks' element={<TaskRouter/>}/>
                        <Route path='/settingmain' element={<MainCms/>}/>
                        <Route path="/load-contest" element={<LoadPage/>} />
                        <Route path="/kids-contest" element={<ContestPage/>} />
                        <Route path="/7897564" element={<NewsPage/>} />
                        <Route path="/" element={<NewstartPage/>} />
                        <Route path="/new_lk" element={<LkNewPortal/>} />
                        <Route path='/main' element={<MainPage/>} />
                        <Route path='/statements' element={<Statements/>}/>
                        <Route path="/newpaylist" element={<NewPayList/>} />
                        <Route path="/polls" element={<PollsPage/>} />
                        <Route path="/maintasks" element={<MainTasks/>} />
                        <Route path="/thistask" element={<ThisTask/>} />
                        <Route path="/polls/cms" element={<PollsCms/>} />
                        <Route path="/documents" element={<FileManagerPage/>} />
                        <Route path="/olddocuments" element={<DocumentsPage/>} />
                        <Route path="/settings" element={<SettingsPage/>} />
                        <Route path="/phonebook" element={<PhonebookPage/>} />
                        <Route path="/newphonebook" element={<NewPhoneBook />} />
                        <Route path="/document" element={<DocumentPage/>} />
                        <Route path="/welcontroll" element={<WelControll />} />
                        <Route path="/weldingsett" element={<WelSett />} />
                        <Route path="/createtask" element={<CreateTaskPage />} />
                        <Route path="/testtaskpage/:params" element={<TestTaskPage />} />
                        <Route path="/lk" element={<LkPage/>} />
                        <Route path="/tab-welding" element={<WelTabel/>} />
                        <Route path="/economist" element={<EconomistMenu/>} />
                        <Route path="/lk" element={<MainPage/>} />
                        <Route path="/selected_news/:id" element={<SelNewsPage/>} />
                        <Route path="/peoples" element={<PeoplesPage />} />
                        <Route path="/odata" element={<ODataPage />} />
                        <Route path="/conference" element={<ChatPage />} />
                        <Route path="/createnews" element={<Createnews/>} />
                        <Route path="/settingnews" element={<Listnews/>} />
                        <Route path="/viewpost" element={<Viewnews />} />
                        <Route path="/alllistnews" element={<AllListNews />} />
                        <Route path="/listfastbtns" element={<ListFastBtns />} />
                        <Route path="/halledit" element={<HallEdit />} />
                        <Route path="/messages" element={<Message />} />
                        <Route path="/objectsportal" element={<NewPageObjects />} />
                        <Route path="/thisobjsportal" element={<ThisObj />} />
                        <Route path="/tabelportal" element={<ListTab />} />
                        <Route path="/thistabelportal" element={<ThisTableTabel />} />
                        <Route path="/welwel" element={<WelMY />} />
                        <Route path="/itogtabel" element={<ItogTabel />} />
                    </Routes>
                </div>
            </Router>
        </DataProvider>
    )
}

export default observer(App)
