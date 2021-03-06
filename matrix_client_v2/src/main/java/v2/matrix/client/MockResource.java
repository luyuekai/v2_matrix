/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.matrix.client;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import v2.service.generic.library.constants.GenericStatus;
import v2.service.generic.library.model.QueryPOJO;
import v2.service.generic.library.model.QueryResultPOJO;
import v2.service.generic.library.model.http.HttpResponsePOJO;
import v2.service.generic.library.utils.HttpClientUtil;
//import v2.service.generic.library.utils.HttpClientUtilV2;
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
}
