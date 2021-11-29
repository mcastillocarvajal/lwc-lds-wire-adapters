import { LightningElement, wire } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
const fields = [EMAIL_FIELD, NAME_FIELD]

export default class WireDemoUserDetail extends LightningElement {

    userId = ID
    userDetail

    //this adapter is reactive by nature
    // @wire(adapter, {adapterConfig})
    // propertyorFunction

    @wire(getRecord, {recordId:'$userId', fields}) //By adding $ we make the variable reactive and the adapter gets updated as soon as data is available.
    userDetailHandler({data, error}){
        if(data){
            this.userDetail = data.fields
        }
        if(error){
            console.error(error)
        }
    }

    @wire(getRecord, {recordId:'$userId', fields})
    userDetailProperty
}