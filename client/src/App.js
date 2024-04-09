import React, {useContext, useEffect} from "react"
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
import TasksPage from "./pages/tasks/old/TasksPage"
import CreateTaskPage from "./pages/tasks/old/CreateTaskPage";
import {Weldingmain} from "./pages/welding/Weldingmain";
import {Yearwelding} from "./pages/welding/Yearwelding";
import {Tabel} from "./pages/welding/Tabel";
import {TabelObj} from "./pages/tabel/Tabel";
import {TableTabel} from "./pages/tabel/TableTabel";
import { DataProvider } from './context/DataContext';
import TestTaskPage from "./pages/tasks/old/TestTaskPage";
import {ListTasks} from "./pages/listtasks/ListTasks";
import ObjectsPage from "./pages/objects/ObjectsPage";
import DocumentsPage from "./pages/documents/DocumentsPage";
import FileManagerPage from "./pages/documents/fileManagerPage";
import Thisproject from "./pages/objects/Thisproject";
import AdminDashboardPage from "./pages/administrator/AdminDashboardPage";
import {Controll} from "./pages/controll/Controll";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import PayslipPage from "./pages/payslip/PayslipPage";
import PhonebookPage from "./pages/PhonebookPage";
import {CrewsPage} from "./pages/welding/CrewsPage";
import PeoplesPage from "./pages/PeoplesPage";
import ODataPage from "./pages/ODataPage";
import ChatPage from "./pages/conference/ChatPage";
import NewstartPage from "./pages/NewstartPage";
import LkNewPortal from "./pages/newportal/lknewportal/LkNewPortal";
import NewPayList from "./pages/NewPayList";
import NewPhoneBook from "./pages/NewPhoneBook";
import MainTasks from "./pages/newportal/tasks/MainTasks";
import ThisTask from "./pages/newportal/tasks/ThisTask";
import Createnews from "./pages/newportal/news/Createnews";
import {ViewPOST} from "./components/newportal/news/ViewPOST";
import Viewnews from "./pages/newportal/news/Viewnews";
import AllListNews from "./pages/newportal/news/AllListNews";
import Listnews from "./pages/newportal/news/Listnews";
import ListFastBtns from "./pages/newportal/fastbtns/ListFastBtns";
import PollsPage from "./pages/survey/PollsPage";
import PollsCms from "./pages/survey/PollsCms";
import HallEdit from "./pages/newportal/hallofframe/HallEdit";
import ContestPage from "./pages/kidscontest/ContestPage";
import LoadPage from "./pages/kidscontest/LoadPage";
import MainCms from "./pages/newportal/news/MainCms";
import Message from "./pages/newportal/message/Message";
import TaskRouter from "./pages/tasks/TaskRouter";
import StructureRouter from "./pages/structure/StructureRouter";
import NewPageObjects from "./pages/newportal/objects/NewPageObjects";
import ThisObj from "./pages/newportal/objects/ThisObj";
import NewTabel from "./pages/newportal/objects/NewTabel";
import {ListTab} from "./pages/objects/ListTabelNewPortal";
import {ThisTableTabel} from "./pages/newportal/objects/TableTabel";
import Statements from "./pages/documents/Statements";
import OgmPage from "./pages/ogmprice/OgmPriceRouter";

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
                        <Route path='/worksprices' element={<OgmPage page={2}/>}/>
                        <Route path='/ogmprices' element={<OgmPage page={1}/>}/>
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
                        {/*<Route path="/paylist" element={<PayslipPage/>} />*/}
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
                        <Route path="/welding" element={<Weldingmain />} />
                        <Route path="/crews" element={<CrewsPage />} />
                        <Route path="/obj" element={<Yearwelding />} />
                        <Route path="/controll" element={<Controll />} />
                        <Route path="/createtask" element={<CreateTaskPage />} />
                        <Route path="/testtaskpage/:params" element={<TestTaskPage />} />
                        <Route path="/lk" element={<LkPage/>} />
                        <Route path="/tabelwelding" element={<Tabel/>} />
                        <Route path="/lk" element={<MainPage/>} />
                        <Route path="/selected_news/:id" element={<SelNewsPage/>} />
                        <Route path="/docpasslist" element={<ListTasks/>} />
                        <Route path="/objects" element={<ObjectsPage/>} />
                        <Route path="/dashboard" element={<AdminDashboardPage/>} />
                        <Route path="/tabel" element={<TabelObj/>} />
                        <Route path="/table-tabel" element={<TableTabel/>} />
                        <Route path="/thisproject" element={<Thisproject />} />
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

                    </Routes>
                </div>
            </Router>
        </DataProvider>
    )
}

export default observer(App)
