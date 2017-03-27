/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package kg.auth;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author lxy
 */
public class UserContext {

    public static UserInfo getCurrentUser(HttpServletRequest request) {

        HttpSession session = request.getSession();
        UserInfo userinfo = null;
        userinfo = (UserInfo) session.getAttribute("current_user");
       
        return userinfo;
    }

    public static void setCurrentUser(HttpServletRequest request, String username) {

        UserInfo userinfo = new UserInfo();

        userinfo.setUserName(username);
        userinfo.setLogined(true);

        HttpSession session = request.getSession();
        session.setMaxInactiveInterval(60 * 60);
        session.setAttribute("current_user", userinfo);
    }
    public static void setCurrentUser(HttpServletRequest request, String username,List<String> groups) {

        UserInfo userinfo = new UserInfo();

        userinfo.setUserName(username);
        userinfo.setLogined(true);
        userinfo.setGroups(groups);
        HttpSession session = request.getSession();
        session.setMaxInactiveInterval(60 * 60);
        session.setAttribute("current_user", userinfo);
    }
    public static void removeCurrentUser(HttpServletRequest request) {

        HttpSession session = request.getSession();
        session.removeAttribute("current_user");
    }
}
