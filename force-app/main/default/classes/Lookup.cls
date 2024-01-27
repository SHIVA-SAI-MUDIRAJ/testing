public without sharing class Lookup {

    @AuraEnabled(cacheable=true)
    public static List<sObject> search(String searchTerm, string myObject, String filter ) {
        String myQuery = null;
        string condition='';
        List<String> searchKeywordList = searchTerm.split(' ');
        for(String kw : searchKeywordList){
            if(filter !=null && filter != ''){
                condition += filter + ' LIKE \'%'+kw+'%\' AND ';
            }
            else{
                condition = 'Name LIKE \'%'+kw+'%\' AND '; 
            }
        }
        condition = condition.removeEnd(' AND ');
        System.debug('condition== '+condition);
        if(filter != null && filter != ''){
            if(filter !='Name'){
            myQuery = 'Select Id,Name,' +filter+' from '+myObject+' Where '+condition+' ORDER BY '+filter +' LIMIT  5';
            }
            else{
                myQuery = 'Select Id,' +filter+' from '+myObject+' Where '+condition+' ORDER BY '+filter +' LIMIT  5';
            }
        }
        else {
            if(searchTerm == null || searchTerm == ''){
                myQuery = 'Select Id, Name from '+myObject+' Where LastViewedDate != NULL ORDER BY LastViewedDate DESC LIMIT  5';
            }
            else {
                myQuery = 'Select Id, Name from '+myObject+' Where ' +condition+' ORDER BY Name LIMIT  5';
            }
        }
        List<sObject> lookUpList = database.query(myQuery);
        return lookUpList;
    }
}