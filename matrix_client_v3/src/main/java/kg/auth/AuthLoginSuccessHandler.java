package kg.auth;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
//import scripter.rest.ScripterRestContext;
//import scripter.rest.config.HdfsUserConfig;
//import scripter.rest.hdfs.client.WebHdfsClient;
public class AuthLoginSuccessHandler extends
        SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
            HttpServletResponse response, Authentication authentication)
            throws ServletException, IOException {
        HttpServletResponse httpServletResponse = null;

        Logger.getLogger(AuthLoginSuccessHandler.class.getName()).log(Level.INFO, "AUTH LOGIN SUCCESS HANDLER invoked, now adding SSO cookie for single sign on purpose...");
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            Object details = SecurityContextHolder.getContext().getAuthentication().getDetails();
            if (details != null && !details.toString().trim().equalsIgnoreCase("")) {
                String token = details.toString();
                Cookie iplanetDirectoryProCookie = new Cookie("iPlanetDirectoryPro", token);

                String cookiePath = "/";
                iplanetDirectoryProCookie.setPath(cookiePath);
                httpServletResponse = (HttpServletResponse) response;
                httpServletResponse.addCookie(iplanetDirectoryProCookie);
                Logger.getLogger(AuthLoginSuccessHandler.class.getName()).log(Level.INFO, "Add sso domain cookie success!The token info is:" + token);
            }

            scripterExtraLogic(request);
        }
        if (httpServletResponse != null) {
            response = httpServletResponse;
        }

        super.onAuthenticationSuccess(request, response, authentication);
    }

    private void scripterExtraLogic(HttpServletRequest request) {
        Collection<? extends GrantedAuthority> groups = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        List list;
        if (groups instanceof List) {
            list = (List) groups;
        } else {
            list = new ArrayList(groups);
        }
        List<String> g = new ArrayList<>();
        for(int i =0 ;i<list.size();i++){
            GrantedAuthority au = (GrantedAuthority) list.get(i);
            g.add(au.getAuthority());
        }
        
        UserContext.setCurrentUser(request, SecurityContextHolder.getContext().getAuthentication().getName(),g);
        
        scripterUserHDFSCheck();
    }
    
    
    private void scripterUserHDFSCheck(){
//        WebHdfsClient hdfs_client = ScripterRestContext.get_hsdf_client();
//        HdfsUserConfig userConfig = new HdfsUserConfig();
//        userConfig.config(SecurityContextHolder.getContext().getAuthentication().getName(), SecurityContextHolder.getContext().getAuthentication().getName(), hdfs_client);
    }
}
