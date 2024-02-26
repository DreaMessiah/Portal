const ApiError = require('../exceptions/api.error')
const {method} = require('middleware/odata.middleware')
class OdataService{
    async getpeoples() {
        const response = await fetch("http://192.168.0.19:3000/SRSUHRM31/odata/standard.odata/Catalog_Сотрудники?$format=json", method)
        return await response.json()
    }
    async getuvol() {
        const response = await fetch('http://192.168.0.19:3000/SRSUHRM31/odata/standard.odata/InformationRegister_ТекущиеКадровыеДанныеСотрудников?$format=json',method )
        return response.json()
    }
    async checkPeople(id) {
        const response = await fetch(`http://192.168.0.19:3000/SRSUHRM31/odata/standard.odata/InformationRegister_ТекущиеКадровыеДанныеСотрудников?$filter=Сотрудник_Key eq guid'${id}'&$format=json`, method)
        return await response.json()
    }
}

module.exports = new OdataService()

//const response = await fetch("http://192.168.0.19:3000/SRSUHRM31/odata/standard.odata/Catalog_Сотрудники(guid'95661e81-dd3b-11e2-a0ac-5cf3fca6c00d')?$format=json", {
//const response = await fetch(`http://192.168.0.19:3000/SRSUHRM31/odata/standard.odata/DocumentJournal_ПриемыПереводыУвольнения?$format=json`, {
//http://192.168.0.19:3000/SRSUHRM31/odata/standard.odata/Catalog_Сотрудники?$filter=not exists(InformationRegister_ТекущиеКадровыеДанныеСотрудников$filter=Сотрудник_Key eq Catalog_Сотрудники_Key and ДатаУвольнения ne "0001-01-01T00:00:00")&$format=json
//const response = await fetch(`http://192.168.0.19:3000/SRSUHRM31/odata/standard.odata/Catalog_Сотрудники?$filter=InformationRegister_ТекущиеКадровыеДанныеСотрудников/any(d: d.ДатаУвольнения eq datetime'0001-01-01T00:00:00')&$format=json`, {
//const response = await fetch("http://192.168.0.19:3000/SRSUHRM31/odata/standard.odata/InformationRegister_ТекущиеКадровыеДанныеСотрудников?$filter=ДатаУвольнения eq datetime'0001-01-01T00:00:00'&$format=json", {
//const response = await fetch("http://192.168.0.19:3000/SRSUHRM31/odata/standard.odata/InformationRegister_ТекущиеКадровыеДанныеСотрудников?$filter=Сотрудник_Key eq guid'49b64007-95eb-11eb-80de-503eaa03a2e4'&$format=json", {