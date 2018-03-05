/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package kg.auth.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import v2.service.generic.library.constants.GenericStatus;
import v2.service.generic.library.model.QueryPOJO;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.model.http.HttpResponsePOJO;
import v2.service.generic.library.utils.HttpClientUtil;
import v2.service.generic.library.utils.JsonUtil;

/**
 * REST Web Service
 *
 * @author root
 */
@Path("mock")
public class MockResource {

    /**
     * Creates a new instance of MockResource
     */
    public MockResource() {
    }
@GET
    @Path("test3")
    @Produces("application/json")
    public static String test3() throws Exception {
        System.out.println("-------[BEGIN]---------");
//        HttpClientUtilV2.test2();
        QueryResultPOJO result = new QueryResultPOJO();
        result.setHasError(Boolean.FALSE);
        result.setStatusCode(GenericStatus.Service_Successed);
        
        System.out.println("---------[FINISHE]-------");
        return JsonUtil.toJson(result);
    }
    
    @GET
    @Path("test2")
    @Produces("application/json")
    public static String test2() throws Exception {
        HttpResponsePOJO pojo = HttpClientUtil.jsonRequest("http://localhost:41535/scripter_client_v3/api/mock/service_error", null, "GET", null);
        QueryResultPOJO result = JsonUtil.toPojo(pojo.getBody(), QueryResultPOJO.class);
        result.setHasError(Boolean.FALSE);
        result.setStatusCode(GenericStatus.Service_Successed);
        System.out.println("----------------");
        return JsonUtil.toJson(result);
    }
    @GET
    @Path("test")
    @Produces("application/json")
    public static String test() throws Exception {

        HttpResponsePOJO pojo = HttpClientUtil.jsonRequest("http://localhost:41535/scripter_client_v3/api/mock/success", null, "GET", null);
        QueryResultPOJO result = JsonUtil.toPojo(pojo.getBody(), QueryResultPOJO.class);
        result.setHasError(Boolean.FALSE);
        result.setStatusCode(GenericStatus.Service_Successed);
        System.out.println("----------------");
        return JsonUtil.toJson(result);
    }  
    @GET
    @Path("test0")
    @Produces("application/json")
    public static String test0() throws Exception {

        HttpResponsePOJO pojo = HttpClientUtil.jsonRequest("http://httpbin.org/get", null, "GET", null);
        String result = pojo.getBody();
        
        return result;
    } 
    @GET
    @Path("success")
    @Produces("application/json")
    public String success() throws IOException {
        QueryResultPOJO result = new QueryResultPOJO();
        result.setHasError(Boolean.FALSE);
        result.setStatusCode(GenericStatus.Service_Successed);
        return JsonUtil.toJson(result);
    }
    
    @GET
    @Path("service_error")
    @Produces("application/json")
    public String service_error() throws IOException {
        QueryResultPOJO result = new QueryResultPOJO();
        result.setHasError(Boolean.TRUE);
        result.setErrorMessage("This is an error message from mock API");
        result.setStatusCode(GenericStatus.Service_Failed);
        return JsonUtil.toJson(result);
    }
    
    @GET
    @Path("server_error")
    @Produces("application/json")
    public String server_error() throws IOException {
        throw new UnsupportedOperationException();
    }
    
    @GET
    @Path("cookie")
    @Produces("application/json")
    public String cookie(@Context HttpHeaders headers) throws IOException {
        
        Map<String, Cookie> pathParams = headers.getCookies();
        QueryResultPOJO result = new QueryResultPOJO();
        result.setHasError(Boolean.FALSE);
        result.setStatusCode(GenericStatus.Service_Successed);
        result.setResult(new ArrayList());
        result.getResult().add(pathParams);
        return JsonUtil.toJson(result);
    }
    @GET
    @Path("cookie/{cookieName}")
    @Produces("application/json")
    public String cookie(@Context HttpHeaders headers,@PathParam("cookieName") String cookieName,@Context HttpServletRequest request,@Context HttpServletResponse response) throws IOException {
        if(cookieName!=null && (!"".equalsIgnoreCase(cookieName))){
            javax.servlet.http.Cookie cookie = new javax.servlet.http.Cookie(cookieName, cookieName);
            String cookiePath = "/";
            cookie.setPath(cookiePath);
            response.addCookie(cookie);
        }
        
        javax.servlet.http.Cookie[] cookies = request.getCookies();
        Map<String, Object> request_cookie = new HashMap<>();
        request_cookie.put("request_cookie",cookies);
        Map<String, Cookie> pathParams = headers.getCookies();
        QueryResultPOJO result = new QueryResultPOJO();
        result.setHasError(Boolean.FALSE);
        result.setStatusCode(GenericStatus.Service_Successed);
        result.setResult(new ArrayList());
        result.getResult().add(pathParams);
        result.getResult().add(request_cookie);
        
        
        return JsonUtil.toJson(result);
    }
}
