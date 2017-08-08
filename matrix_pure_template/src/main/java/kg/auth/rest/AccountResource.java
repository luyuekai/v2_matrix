/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package kg.auth.rest;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Map;
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
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import kg.auth.UserContext;
import kg.auth.UserInfo;
import v2.service.generic.library.constants.GenericStatus;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.utils.JsonUtil;

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

        UserInfo userinfo = UserContext.getCurrentUser(request);
        if (userinfo == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        return Response.ok(userinfo).build();
    }

    @GET
    @Path("current_token")
    @PermitAll
    @Produces({"application/json"})
    public String getSSOInfo(@Context HttpHeaders headers) throws IOException {
        Map<String, Cookie> pathParams = headers.getCookies();
        QueryResultPOJO result = new QueryResultPOJO();
        result.setHasError(Boolean.FALSE);
        result.setStatusCode(GenericStatus.Service_Successed);
        result.setResult(new ArrayList());
        if (pathParams.containsKey("iPlanetDirectoryPro")) {
            Cookie cookie = pathParams.get("iPlanetDirectoryPro");
            String token = cookie.getValue();
            result.getResult().add(token);
        }
        return JsonUtil.toJson(result);
    }
}
