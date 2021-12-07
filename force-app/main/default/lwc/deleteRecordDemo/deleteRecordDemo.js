import { LightningElement } from 'lwc';
import {deleteRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DeleteRecordDemo extends LightningElement {

    recordId

    changeHandler(event){
        this.recordId = event.target.value
    }

    deleteHandler(){
        deleteRecord(this.recordId).then(()=>{
            console.log('Deleted successfully')
            this.showToast('Sucess!', 'Record was deleted successully', 'success')
        }).catch(error=>{
            console.error(error)
            this.showToast('Error!', 'There was an error deleting the record', 'error')
        })
    }

    showToast(title,message,variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }))
    }
    showToast(title,message,variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }))
    }
}