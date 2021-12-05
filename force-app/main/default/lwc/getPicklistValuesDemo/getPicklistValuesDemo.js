import { LightningElement, wire } from 'lwc';
import {getPicklistValues, getObjectInfo} from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class GetPicklistValuesDemo extends LightningElement {

    selectedIndustry = '';
    selectedType = '';
    industryOptions = []
    typeOptions = []

    @wire(getObjectInfo, {objectApiName:ACCOUNT_OBJECT})
    objectInfo

    //WE CAN CALL SEVERAL OBJECTS WITH THIS WIRE. IT MUST BE DONE SEPARATELY
    @wire(getPicklistValues, {recordTypeId:'$objectInfo.data.defaultRecordTypeId', fieldApiName:INDUSTRY_FIELD})
    industryPicklist({data,error}){
        if(data){
            //console.log(data)
            this.industryOptions = [...this.generatePickList(data)]
        }
        if(error){
            console.error(error)
        }
    }

    generatePickList(data){
        return data.values.map(item=>({ label: item.label, value: item.value}))
    }

    handleChange(event) {
        this.selectedIndustry = event.detail.value;
    }

    //SECOND PICKLIST
    @wire(getPicklistValues, {recordTypeId:'$objectInfo.data.defaultRecordTypeId', fieldApiName:TYPE_FIELD})
    typePicklist({data,error}){
        if(data){
            //console.log(data)
            this.typeOptions = [...this.generatePickList(data)]
        }
        if(error){
            console.error(error)
        }
    }

    handleTypeChange(event) {
        this.selectedType = event.detail.value;
    }
}