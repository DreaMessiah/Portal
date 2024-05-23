import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";
import {disconnectSocket, getSocket} from "../http/socket";

export default class Store {
    user = {}
    uni = {}
    avatar = ''
    t13 = {}
    onboard = ''
    hrmcheck = false
    isAuth = false
    isTn = false
    isSurvey = false
    isCreated = false
    isLoading = false
    constructor() {
        makeAutoObservable(this)
    }
    setAuth(bool){
        this.isAuth = bool
    }
    setHrmcheck(bool){
        this.hrmcheck = bool
    }
    setSurvey(bool){
        this.isSurvey = bool
    }
    setTn(bool){
        this.isTn = bool
    }
    setIsCreated(bool){
        this.isCreated = bool
    }
    setUser(user){
        this.user = user
        if(!this.user.avatar) this.user.avatar = 'face.png'
    }
    setUni(uni){
        this.uni = uni
    }
    setAvatar(avatar){
        this.user.avatar = avatar
        if(!avatar) this.user.avatar = 'face.png'
    }
    setT13(t13){
        this.t13 = t13
    }
    setOnboard(onboard){
        this.onboard = onboard
    }
    setLoading(bool){
        this.isLoading = bool
    }
    async login(login,password) {
        try{
            const response = await AuthService.login(login,password)
            localStorage.setItem('token',response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            await this.checkT13()
        }catch (e){
            return e
        }
    }
    async tnenter(tn) {
        try{
            const response = await AuthService.tnenter(tn)
            this.setTn(true)
            this.setUni(response.data.uni)
        }catch (e){
            return e
        }
    }
    async createUser(login,password) {
        try {
            const response = await AuthService.createUser(login,password,this.uni.tn,this.uni.name,this.uni.developer)
            this.setIsCreated(true)
            this.setUser(response.data.user)
            this.setUni(response.data.uni)
        }catch (e) {
            return e
        }
    }
    async setFz152(tn) {
        await AuthService.setFz152(tn)
        this.setUni({})
        this.setTn(false)
        this.setIsCreated(false)
    }
    async registration(login,password,tn,full_name,email,inn,moderator,account,unit) {
        try{
            const response = await AuthService.registration(login,password,tn,full_name,email,inn,moderator,account,unit)
            localStorage.setItem('token',response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }
    async logout() {
        try{
            disconnectSocket()
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth(){
        this.setLoading(true)
        try{
            const response = await axios.get(`${API_URL}/auth/refresh`,{withCredentials:true})
            localStorage.setItem('token',response.data.accessToken)
            this.setIsCreated(!!!response.data.user.checked)
            this.setHrmcheck(response.data.hrmcheck)
            this.setSurvey(response.data.survey)
            this.setAuth(true)
            this.setUser(response.data.user)
            this.setAvatar(response.data.user.avatar)
            await this.checkT13()
        }catch (e){
            console.log(e.response?.data?.message)
        }finally {
            this.setLoading(false)
        }
    }
    async checkT13(){
        this.setLoading(true)
        try{
            const response = await AuthService.get13(this.user.id)
            this.setT13(response.data.t13)
            this.createStazh(this.t13.onboard)
        }catch (e) {
            console.log(e.response?.data?.message)
        }finally {
            this.setLoading(false)
        }
    }
    createStazh(string){
        const parts = string.split(".");
        const formattedDateString = `${parts[2]}-${parts[1]}-${parts[0]}`;
        const targetDate = new Date(formattedDateString);
        const currentDate = new Date();
        const timeDiff = targetDate.getTime() - currentDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * -24));
        let Stazh = ''
        const Years = parseInt(daysDiff/365)
        if(Years) {
            Stazh = Stazh + Years
            if(Years%10 === 1 && Years !== 11) Stazh = Stazh + ' год '
            if( (Years%10 === 2 || Years%10 === 3 || Years%10 === 4) && (Years < 11 || Years > 19)) Stazh = Stazh + ' года '
            else Stazh = Stazh + ' лет '
        }
        const Months = parseInt((daysDiff%365)/30)
        if(Months){
            Stazh = Stazh + Months
            if(Months%10 === 1 && Months !== 11) Stazh = Stazh + ' месяц '
            if( (Months%10 === 2 || Months%10 === 3 || Months%10 === 4) && (Months < 11 || Months > 19))  Stazh = Stazh + ' месяца '
            else Stazh = Stazh + ' месяцев '
        }
        if(!Months && !Years) {
            Stazh = Stazh + daysDiff
            if(daysDiff%10 === 1 && daysDiff !== 11) Stazh = Stazh + ' день '
            if( (daysDiff%10 === 2 || daysDiff%10 === 3 || daysDiff%10 === 4) && (daysDiff < 11 || daysDiff > 19) )  Stazh = Stazh + ' дня '
            else Stazh = Stazh + ' дней '
        }
        this.setOnboard(Stazh)
        return Stazh
    }
}