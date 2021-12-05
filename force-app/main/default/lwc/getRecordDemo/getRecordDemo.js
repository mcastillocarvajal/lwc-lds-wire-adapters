import { LightningElement, wire, api } from 'lwc';
import {getRecord, getFieldValue, getFieldDisplayValue} from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import OWNER_FIELD from '@salesforce/schema/Account.Owner.Name';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';

export default class GetRecordDemo extends LightningElement {

    name
    owner
    annualRevenue

    @api recordId

    //there are 2 types

    //first one is using layoutTypes and modes as parameters ↓↓↓↓ this approach fetch all the record fields
    //@wire(getRecord, {recordId:'$recordId', layoutTypes:['Full'], modes:['View']})

    //second one is using fields as parameters ↓↓↓↓
    @wire(getRecord, {recordId:'$recordId', fields:[NAME_FIELD,OWNER_FIELD,ANNUAL_REVENUE_FIELD]})
    accountHandler({data}){
        if(data){
            //console.log(data)

            //to avoid this complexity ↓↓↓↓ we can use getFieldValue and getFieldDisplayValue

            // this.name = data.fields.Name.displayName ? data.fields.Name.displayName : data.fields.Name.value
            // this.owner = data.fields.Owner.displayValue ? data.fields.Owner.displayValue : data.fields.Owner.value
            // this.annualRevenue = data.fields.AnnualRevenue.displayValue ? data.fields.AnnualRevenue.displayValue : data.fields.AnnualRevenue.value

            this.name = getFieldValue(data, NAME_FIELD)
            this.owner = getFieldValue(data, OWNER_FIELD)
            this.annualRevenue = getFieldDisplayValue(data, ANNUAL_REVENUE_FIELD)
        }
    }
}