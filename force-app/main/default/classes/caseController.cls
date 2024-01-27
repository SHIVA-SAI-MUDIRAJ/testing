public class caseController {
    @AuraEnabled(cacheable=true)
    public static List<Case> fetchCases(){
        try {
            List<Case> caseList = [Select Id,AccountId,CaseNumber,Status FROM Case Limit 10];
            system.debug('case list=='+caseList.size());
            return caseList;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}