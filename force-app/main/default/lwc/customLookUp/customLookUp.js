import lookUp from '@salesforce/apex/Lookup.search';
import { api, LightningElement, track, wire } from 'lwc';


export default class customLookUp extends LightningElement {
   
    @api objectName;
    @api iconName;
    @api filter='';
    @api searchPlaceholder='Search';
    @track selectedName;
    @track records=[];
    @track isValueSelected;
    @track blurTimeout;
    searchTerm;
    dataLength;
    noRecords='';
    norecordsFound=false;
    //css
    @track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputClass = '';
    @wire(lookUp, {searchTerm : '$searchTerm', myObject : '$objectName', filter : '$filter'})
    wiredRecords({ error, data }) {
        if (data) {
            this.norecordsFound=false;
            console.log('wired data');
            this.records=[];
           
            let tempRecord;
            for(let i = 0; i < data.length; i++) 
            {
                tempRecord = Object.assign({}, data[i]);    
                this.records.push(tempRecord);      
                console.log('this.records-->', JSON.stringify(this.records));
            }          
            this.error = undefined;
            let filter=this.filter;
            console.log('filter==35'+this.filter);
            if(filter=='' || filter ==undefined){
                filter='Name';
            }
            for(let i = 0; i < this.records.length; i++) {
            this.records[i].filter =  this.records[i][filter];
            console.log('this.records[i].filter-->', JSON.stringify(this.records[i].filter));
         }
         if(this.records.length<1){
            this.norecordsFound=true;
            this.noRecords='No Records Found.'
         }
        } else if (error) {
            this.error = error;
            this.records = undefined;
        }
        
    
        
    }
    handleClick() {
        this.searchTerm = '';
        this.inputClass = 'slds-has-focus';
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    onBlur() {
        this.blurTimeout = setTimeout(() =>  {this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 300);
    }

    onSelect(event) {
        let selectedId = event.currentTarget.dataset.id;
        let selectedName = event.currentTarget.dataset.name;
        const valueSelectedEvent = new CustomEvent('lookupselected', {detail:  selectedId });
        this.dispatchEvent(valueSelectedEvent);
        this.isValueSelected = true;
        this.selectedName = selectedName;
        if(this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }

    handleRemovePill() {
        this.isValueSelected = false;
        this.searchTerm = '';
    }

    onChange(event) {
        this.searchTerm = event.target.value;
    }

}