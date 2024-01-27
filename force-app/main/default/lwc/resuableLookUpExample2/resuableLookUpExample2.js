import { LightningElement } from 'lwc';

export default class ResuableLookUpExample2 extends LightningElement {
   SelectedRecord;
   handleValueSelected(event) {
        this.SelectedRecord = event.detail;
        console.log('main field is ==',this.SelectedRecord.mainField);
        console.log('sub field is ==',this.SelectedRecord.subField);
        console.log('selected record Id is ==',this.SelectedRecord.id);
    }
}