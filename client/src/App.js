import React, {useContext, useEffect} from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import './assets/styles/styles.scss'
import './assets/styles/media1550.scss'

import MainPage from "./pages/old/MainPage"
import AuthPage from "./pages/AuthPage"
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
import {EconomistMenu} from "./pages/economist/EconomistMenu";
import OgmPage from "./pages/econom/OgmPriceRouter";
import {ItogTabel} from "./pages/tabel/ItogTabel";
import {AllTabels} from "./pages/tabel/AllTabels";
import {HrMenu} from "./pages/hr/HrMenu";
import HrRouter from "./pages/hr/HrRouter";
import {Welcomepage} from "./pages/welcomepage/Welcomepage";
import {Fz152} from "./pages/welcomepage/Fz152";
import {MakeLogin} from "./pages/welcomepage/MakeLogin";
import {TnEnter} from "./pages/welcomepage/TnEnter";
import WeldingRouter from "./pages/welding/WeldingRouter";
import EditorRouter from "./pages/editor/EditorRouter";
import SurveyPage from "./pages/survey/SurveyPage";
import ByePage from "./pages/survey/ByePage";

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

    if(store.isCreated) return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/*" element={<Welcomepage />} />
                    <Route path="/fz152" element={<Fz152 />} />
                </Routes>
            </div>
        </Router>
    )
    if(store.isTn) return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/*" element={<MakeLogin />} />
                </Routes>
            </div>
        </Router>
    )

    if(store.t13.onboard){
        const dateOnboard = new Date(store.t13.onboard.split('.').reverse().join('-'));
        const dateSurvei = new Date('2024-04-25')
        if(dateSurvei<=dateOnboard && !store.isSurvey) return (
            <Router>
                <div className="App">
                    <Routes>
                        <Route path='*' element={<SurveyPage flag={true} onLand={true} id={10}/>} />
                    </Routes>
                </div>
            </Router>
        )
    }

    if(!store.isAuth) return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='*' element={<AuthPage/>} />
                    <Route path="/tnenter" element={<TnEnter />} />
                </Routes>
            </div>
        </Router>
    )

    if(store.t13.term || !store.t13.tn) return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='*' element={<ByePage/>} />
                </Routes>
            </div>
        </Router>
    )

    return (
        <DataProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path='/*' element={<NewstartPage/>}/>
                        <Route path='/loadpayslip' element={<OgmPage page={6}/>}/>
                        <Route path='/ktulist' element={<OgmPage page={5}/>}/>
                        <Route path='/ktu' element={<OgmPage page={4}/>}/>
                        <Route path='/t13' element={<OgmPage page={3}/>}/>
                        <Route path='/workprice' element={<OgmPage page={2}/>}/>
                        <Route path='/ogmprice' element={<OgmPage page={1}/>}/>
                        <Route path='/gpkh' element={<HrRouter page={1}/>}/>
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
                        <Route path="/weldingmenu" element={<WeldingRouter page={1} />} />
                        <Route path="/weldingsett" element={<WeldingRouter page={2} />} />
                        <Route path="/weldingloadtypes" element={<WeldingRouter page={3} />} />
                        <Route path="/createtask" element={<CreateTaskPage />} />
                        <Route path="/testtaskpage/:params" element={<TestTaskPage />} />
                        <Route path="/lk" element={<LkPage/>} />
                        <Route path="/tab-welding" element={<WelTabel/>} />
                        <Route path="/economist" element={<EconomistMenu/>} />
                        <Route path="/hr" element={<HrMenu/>} />
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
                        <Route path="/alltabels" element={<AllTabels />} />
                        {store.user.unit === 99 || store.user.account === 'superadmin' ? <Route path="/editor" element={<EditorRouter page={1} />} /> : null }
                        {store.user.unit === 99 || store.user.account === 'superadmin' ? <Route path="/peoplesstat" element={<EditorRouter page={2} />} /> : null }
                        {store.user.unit === 99 || store.user.account === 'superadmin' ? <Route path="/sociality" element={<EditorRouter page={3} />} /> : null }
                        {store.user.unit === 99 || store.user.account === 'superadmin' ? <Route path="/createsocial" element={<EditorRouter page={4} />} /> : null }
                        {store.user.unit === 99 || store.user.account === 'superadmin' ? <Route path="/userbranchs" element={<EditorRouter page={5} />} /> : null }
                        {store.user.unit === 99 || store.user.account === 'superadmin' ? <Route path="/cmsstructure" element={<EditorRouter page={6} />} /> : null }


                    </Routes>
                </div>
            </Router>
        </DataProvider>
    )
}

export default observer(App)
