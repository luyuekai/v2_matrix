/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package kg.auth.rest;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import kg.auth.model.BasePOJO;
import kg.auth.model.http.HttpRequestPOJO;
import kg.auth.utils.JsonUtil;

/**
 * REST Web Service
 *
 * @author root
 */
@Path("test")
public class TestResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of TestResource
     */
    public TestResource() {
    }

    @GET
    @Produces("application/json")
    public String getJson() {
        BasePOJO pojo = new BasePOJO();
        pojo.setName("TEST_REST_SERVICE");
        pojo.setDescription("ALIVE!");
        pojo.setMessages(null);
        try {
            return JsonUtil.toJson(pojo);
        } catch (IOException ex) {
            Logger.getLogger(TestResource.class.getName()).log(Level.SEVERE, null, ex);
            return JsonUtil.toExceptionJson(ex.getMessage());
        }
    }

    /**
     * PUT method for updating or creating an instance of GenericTestResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public String putJson(String content) {
        return JsonUtil.toExceptionJson("This is a put JSON response example");
    }
    
    @POST
    @Consumes("application/json")
    public String postJson(String content) {
        return JsonUtil.toExceptionJson("This is a post JSON string response example");
    }

}
