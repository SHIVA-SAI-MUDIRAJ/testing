import {LightningElement} from 'lwc';

export default class customLookupExample extends LightningElement {
    handleAccountSelection(event){
        console.log("the selected record id is"+event.detail);
    }
}