/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package kg.auth.rest;

import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import kg.auth.UserContext;
import kg.auth.UserInfo;

/**
 * REST Web Service
 *
 * @author root
 */
@Path("account")
public class AccountResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AccountResource
     */
    public AccountResource() {
    }

    @GET
    @Path("current_user")
    @PermitAll
    @Produces({"application/json"})
    public Response getCurrentUserInfo(@Context HttpServletRequest request) {
        String token = null;
        String rawCookie = (request).getHeader("Cookie");
        if (rawCookie != null) {
            String[] rawCookieParams = rawCookie.split(";");
            for (String rawCookieNameAndValue : rawCookieParams) {
                String[] rawCookieNameAndValuePair = rawCookieNameAndValue.split("=");
                if (rawCookieNameAndValuePair[0].trim().equalsIgnoreCase("iPlanetDirectoryPro")) {
                    token = rawCookieNameAndValuePair[1];
                }
            }
        }
        if (token == null) {
           UserContext.removeCurrentUser(request); 
        }
        UserInfo userinfo = UserContext.getCurrentUser(request);
        if (userinfo == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        return Response.ok(userinfo).build();
    }
}
