import { LightningElement,track,wire } from 'lwc';
import fetchCases from '@salesforce/apex/caseController.fetchCases';
const columns = [
    { label: 'Account', fieldName: 'AccountId', type: 'text' },
    { label: 'Case Number', fieldName: 'CaseNumber', type: 'text' },
    { label: 'Status', fieldName: 'Status', type: 'text' },
]; 

export default class CaseListView extends LightningElement {
    @track coldata;

    @wire(fetchCases,{})
    cases({error,data}){
    if(data){
        this.coldata = data;
        console.log('dataaaa==='+this.coldata);
    }
    else{
        console.log('error entered');
  
    }
}
}