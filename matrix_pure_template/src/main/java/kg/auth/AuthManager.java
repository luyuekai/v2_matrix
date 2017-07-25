package kg.auth;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import kg.auth.model.PagingPOJO;
import kg.auth.model.aaa.UserPOJO;
import kg.auth.model.http.HttpRequestPOJO;
import kg.auth.model.http.HttpResponsePOJO;
import kg.auth.utils.HttpClientUtil;
import kg.auth.utils.JsonUtil;
import kg.auth.utils.StringUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.Assert;

public class AuthManager {

    private String URL_AUTHENTICATION;
    private String URL_AUTHORIZATION;
    private String URL_SERVER_ALIVE;

    public String getURL_SERVER_ALIVE() {
        return URL_SERVER_ALIVE;
    }

    public void setURL_SERVER_ALIVE(String URL_SERVER_ALIVE) {
        this.URL_SERVER_ALIVE = URL_SERVER_ALIVE;
    }

    public String getURL_AUTHENTICATION() {
        return URL_AUTHENTICATION;
    }

    public void setURL_AUTHENTICATION(String URL_AUTHENTICATION) {
        this.URL_AUTHENTICATION = URL_AUTHENTICATION;
    }

    public String getURL_AUTHORIZATION() {
        return URL_AUTHORIZATION;
    }

    public void setURL_AUTHORIZATION(String URL_AUTHORIZATION) {
        this.URL_AUTHORIZATION = URL_AUTHORIZATION;
    }

    /**
     * Function for check the environment parameters
     */
    public boolean envCheck() {
        Logger.getLogger(AuthProvider.class.getName()).log(Level.INFO, "Checking auth environment settings...");
        if (StringUtil.isNullOrEmpty(URL_SERVER_ALIVE) || StringUtil.isNullOrEmpty(URL_AUTHENTICATION) || StringUtil.isNullOrEmpty(URL_AUTHORIZATION)) {
            Logger.getLogger(AuthProvider.class.getName()).log(Level.SEVERE, "auth environment settings is not correct.please check the configuration files and fix it.");
            return false;
        } else {
            Logger.getLogger(AuthProvider.class.getName()).log(Level.INFO, "Checking auth environment settings finished.");
            return true;
        }
    }

    public boolean remoteServerCheck() {
        try {
            String expectResult = "{\"name\":\"TEST_REST_SERVICE\",\"description\":\"ALIVE!\"}";
            HttpResponsePOJO pojo = HttpClientUtil.get(URL_SERVER_ALIVE);
            Assert.hasText(pojo.getBody(), expectResult);
            Assert.hasText(String.valueOf(pojo.getStatusCode()), "200");
            Logger.getLogger(AuthProvider.class.getName()).log(Level.INFO, "Checking auth remote server finished: remote server can communication normally!");
            return true;
        } catch (Exception ex) {
            Logger.getLogger(AuthProvider.class.getName()).log(Level.SEVERE, ex.getMessage());
            Logger.getLogger(AuthProvider.class.getName()).log(Level.INFO, "Checking auth remote server finished: remote server abnormal,please check it!");
            return false;
        }
    }

    public Authentication mockAuth(Authentication auth) {
        String principle = auth.getName();
        String credential = (String) auth.getCredentials();
        String token = null;
        boolean flag = false;
        if (StringUtil.isNullOrEmpty(principle) || StringUtil.isNullOrEmpty(credential)) {
            flag = false;
        }
        
        if("matrix".equalsIgnoreCase(principle)&&"matrix".equalsIgnoreCase(credential)){
            flag = true;
        }
        
        if(flag){
            List<GrantedAuthority> AUTHORITIES = new ArrayList<GrantedAuthority>();
            AUTHORITIES.add(new SimpleGrantedAuthority("ROLE_MATRIX_USER"));
            Logger.getLogger(AuthManager.class.getName()).log(Level.INFO, "Into mock auth");
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken("ops", "ops", AUTHORITIES);
            return authToken;
        }else{
            throw new BadCredentialsException("Bad Credentials");
        }
        
    }

    public Authentication tryToAuth(String token, String principle, String credential) throws Exception {

        HttpRequestPOJO request = new HttpRequestPOJO();
        request.setTokenId(token);
        String jsonRequest = JsonUtil.toJson(request);
        HttpResponsePOJO pojo = HttpClientUtil.jsonRequest(URL_AUTHORIZATION, jsonRequest, "POST");
        String jsonResult = pojo.getBody();
        PagingPOJO pagingPOJO = JsonUtil.toPojo(jsonResult, PagingPOJO.class);
        if (!pagingPOJO.getHasError()) {

            Logger.getLogger(AuthManager.class.getName()).log(Level.INFO, "User [" + principle + "] has pass the authorization phase from the AUTH system!");
            UserPOJO user = JsonUtil.toPojo(JsonUtil.toJson(pagingPOJO.getResult().get(0)), UserPOJO.class);
            if (StringUtil.isNullOrEmpty(principle)) {
                principle = user.getUsername();
            }
            if (StringUtil.isNullOrEmpty(credential)) {
                credential = "";
            }
            Set<String> groups = user.getGroups();
            List<GrantedAuthority> AUTHORITIES = new ArrayList<GrantedAuthority>();
            for (String group : groups) {
                AUTHORITIES.add(new SimpleGrantedAuthority("ROLE_" + group));
            }
            Logger.getLogger(AuthManager.class.getName()).log(Level.INFO, "User [" + principle + "] has following roles:" + groups.toString());
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(principle, credential, AUTHORITIES);
            authToken.setDetails(token);
            Logger.getLogger(AuthManager.class.getName()).log(Level.INFO, "User [" + principle + "] has finished login phase and grant the relatived powers for it. Also, it can use token [" + token + "] for continuous communication with server and single sign on.");
            return authToken;
        } else {
            Logger.getLogger(AuthManager.class.getName()).log(Level.INFO, "User [" + principle + "] has not pass the authorization phase from the AUTH system! The detail message are:" + pagingPOJO.getErrorMessage());
            throw new BadCredentialsException("Bad Credentials");
        }
    }
}
