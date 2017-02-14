
package kg.auth;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;

public class AuthLogoutSuccessHandler implements LogoutHandler {

    public AuthLogoutSuccessHandler() {
    }

    @Override
    public void logout(HttpServletRequest request,
            HttpServletResponse response, Authentication authentication) {
        Logger.getLogger(AuthLoginSuccessHandler.class.getName()).log(Level.INFO, "AUTH LOGOUT SUCCESS HANDLER invoked, now removing the current user SSO token....");
        List<String> cookiesToClear = new ArrayList<>();
        cookiesToClear.add("iPlanetDirectoryPro");
        for (String cookieName : cookiesToClear) {
            Cookie cookie = new Cookie(cookieName, null);
            String cookiePath ="/";
            cookie.setPath(cookiePath);
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }
        scripterExtraLogic(request);
        Logger.getLogger(AuthLoginSuccessHandler.class.getName()).log(Level.INFO, "Removing the current user SSO token finished.");
    }
    private void scripterExtraLogic(HttpServletRequest request){
        UserContext.removeCurrentUser(request);
    }
}
