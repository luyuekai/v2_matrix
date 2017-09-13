/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package kg.auth;

import java.util.logging.Level;
import java.util.logging.Logger;
import kg.auth.model.aaa.AuthPOJO;
import kg.auth.model.http.HttpResponsePOJO;
import kg.auth.utils.HttpClientUtil;
import kg.auth.utils.JsonUtil;
import kg.auth.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class AuthProvider implements AuthenticationProvider {
    
    @Autowired
    AuthManager authManager;
    
    @Override
    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        
        boolean mock = true;
        if(mock){
            try{
               return authManager.mockAuth(auth); 
            }catch(AuthenticationException ex){
               // not pass the mock auth, to normal access auth
            }
            
        }
        
        if (!authManager.envCheck()||!authManager.remoteServerCheck()) {
            return null;
        }
        try {

            String principle = auth.getName();
            String credential = (String) auth.getCredentials();
            String token = null;

            if (StringUtil.isNullOrEmpty(principle) || StringUtil.isNullOrEmpty(credential)) {
                throw new BadCredentialsException("Bad Credentials");
            }
            Logger.getLogger(AuthProvider.class.getName()).log(Level.INFO, "User ["+principle+"] is attemp to access the AUTH system with login operation!");
            String json = buildRequestJson(principle, credential);
            HttpResponsePOJO pojo = HttpClientUtil.jsonRequest(authManager.getURL_AUTHENTICATION(), json, "POST");
            String jsonResult = pojo.getBody();
            AuthPOJO authResult = JsonUtil.toPojo(jsonResult, AuthPOJO.class);
            if (authResult.getStatusCode().equals("200")) {
                token = authResult.getTokenId();
                Logger.getLogger(AuthProvider.class.getName()).log(Level.INFO, "User ["+principle+"] has pass the authentication phase from the AUTH system,now into the authorization phase!");
                return authManager.tryToAuth(token, principle, credential);
            } else {
                Logger.getLogger(AuthProvider.class.getName()).log(Level.INFO, "User ["+principle+"] has not pass the authentication phase from the AUTH system!");
                throw new BadCredentialsException("Bad Credentials");
            }

        } catch (Exception ex) {
            Logger.getLogger(AuthenticationProvider.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
            throw new BadCredentialsException("Bad Credentials");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }

    private String buildRequestJson(String principel, String credential) {
        return "{\"principle\":\"" + principel + "\",\"credential\":\"" + credential + "\"}";
    }

    

}
