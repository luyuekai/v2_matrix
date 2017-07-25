package kg.auth;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

/**
 *
 * @author root
 */
public class BeforeLoginFilter extends GenericFilterBean {

    private boolean doSSOFlag = false;

    @Autowired
    AuthManager authManager;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if(doSSOFlag){
            doSSOChain(request);
        }
        scripterExtraLogic(request);
        chain.doFilter(request, response);
    }

    private void scripterExtraLogic(ServletRequest request) {
        HttpServletRequest req = (HttpServletRequest) request;
        UserInfo userinfo = UserContext.getCurrentUser(req);
        if (userinfo != null) {
            UserContext.removeCurrentUser(req);
        }
    }

    private void doSSOChain(ServletRequest request) {
        if (!hasAuth()) {
//          Logger.getLogger(BeforeLoginFilter.class.getName()).log(Level.INFO, "A anouymous user request for accessing the resource...System try to find whether it can be auto login for token...");
            HttpServletRequest req = (HttpServletRequest) request;
            Cookie[] cookies = req.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("iPlanetDirectoryPro".equalsIgnoreCase(cookie.getName())) {
                        String token = cookie.getValue();
                        Logger.getLogger(BeforeLoginFilter.class.getName()).log(Level.INFO, "Find the SSO token[" + token + "], will use this token to authenticate.");
                        if (authManager.envCheck() && authManager.remoteServerCheck()) {
                            tryToAuth(token);
                        }
                    } else {
//                        Logger.getLogger(BeforeLoginFilter.class.getName()).log(Level.INFO, "Didn't find the token exist, will processing with the login request...");
                    }
                }
            }
        } else {
//             Logger.getLogger(BeforeLoginFilter.class.getName()).log(Level.INFO, "User has been granted, don't need authenticate anymore...");           
        }
    }

    private void tryToAuth(String token) {
        try {
            UsernamePasswordAuthenticationToken authToken = (UsernamePasswordAuthenticationToken) authManager.tryToAuth(token, null, null);
            SecurityContextHolder.getContext().setAuthentication(authToken);
        } catch (Exception ex) {
            Logger.getLogger(BeforeLoginFilter.class.getName()).log(Level.SEVERE, ex.getMessage());
        }

    }

    private boolean hasAuth() {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            Object details = SecurityContextHolder.getContext().getAuthentication().getDetails();
            if (details != null && !details.toString().trim().equalsIgnoreCase("")) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    private String URL_AUTHORIZATION;

    public String getURL_AUTHORIZATION() {
        return URL_AUTHORIZATION;
    }

    public void setURL_AUTHORIZATION(String URL_AUTHORIZATION) {
        this.URL_AUTHORIZATION = URL_AUTHORIZATION;
    }

}
