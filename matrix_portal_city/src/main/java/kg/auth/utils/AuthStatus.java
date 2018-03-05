
package kg.auth.utils;

public class AuthStatus {
    public static final String STATUS_CODE_JSON_ERRO="422";
    public static final String STATUS_CODE_SUCCESS="200";
    
    public static enum REST_ENDPOINTS {
        users, groups, realms,policies,applications;
        
        public static boolean has(String input){
            boolean result = false;
            for(REST_ENDPOINTS e:REST_ENDPOINTS.values()){
                if(e.toString().equalsIgnoreCase(input)){
                    result = true;
                    break;
                }
            }
            return result;
        }
    }
    
    public static void main(String[] args) {
        System.out.println(AuthStatus.REST_ENDPOINTS.has("Users1"));
    }
}
