package kg.auth.utils;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.logging.Level;
import java.util.logging.Logger;
import kg.auth.model.aaa.AuthPOJO;
import kg.auth.model.BasePOJO;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.annotate.JsonSerialize;

public class JsonUtil {

    public static <T> String exToJson(Throwable ex) {
        Logger.getLogger(JsonUtil.class.getName()).log(Level.SEVERE, null, ex);
        AuthPOJO pojo = new AuthPOJO();
        pojo.setStatusCode("500");
        pojo.setMessage(ex.getMessage());
        try {
            return JsonUtil.toJson(pojo);
        } catch (IOException ex1) {
            Logger.getLogger(JsonUtil.class.getName()).log(Level.SEVERE, null, ex1);
            return JsonUtil.toExceptionJson(ex.getMessage(), AuthStatus.STATUS_CODE_JSON_ERRO);
        }
    }

    public static <T> String toJson(T t) throws IOException, JsonGenerationException, JsonMappingException {
        ObjectMapper mapper = new ObjectMapper();
//        mapper.setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);
        String result = mapper.writeValueAsString(t);
        return result;
    }

    public static <T> T toPojo(String jsonContent, Class<T> clazz) throws JsonParseException, JsonMappingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        T t = (T) mapper.readValue(jsonContent, clazz);
        return t;
    }

    public static String toExceptionJson(String description) {
        BasePOJO pojo = toExceptionPOJO(description);

        ObjectMapper mapper = new ObjectMapper();
//        mapper.setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);
        String result = null;
        try {
            result = mapper.writeValueAsString(pojo);
        } catch (IOException ex) {
            Logger.getLogger(JsonUtil.class.getName()).log(Level.SEVERE, null, ex);
        }
        return result;
    }

    public static String toExceptionJson(String description, String statusCode) {
        BasePOJO pojo = toExceptionPOJO(description, statusCode);

        ObjectMapper mapper = new ObjectMapper();
//        mapper.setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);
        String result = null;
        try {
            result = mapper.writeValueAsString(pojo);
        } catch (IOException ex) {
            Logger.getLogger(JsonUtil.class.getName()).log(Level.SEVERE, null, ex);
        }
        return result;
    }

    public static BasePOJO toExceptionPOJO(String description, String statusCode) {
        BasePOJO pojo = new BasePOJO();
        pojo.setName("EXCEPTION");
        pojo.setStatus(statusCode);
        pojo.setDescription(description);
        pojo.setCreateTime(new Timestamp(System.currentTimeMillis()));
        return pojo;
    }

    public static BasePOJO toExceptionPOJO(String description) {
        return toExceptionPOJO(description, "200");
    }

    public static BasePOJO toSuccessPOJO(String description) {
        BasePOJO pojo = new BasePOJO();
        pojo.setName("SUCCESS");
        pojo.setStatus("200");
        pojo.setDescription(description);
        pojo.setCreateTime(new Timestamp(System.currentTimeMillis()));
        return pojo;
    }
    
    public static boolean isNullOrEmptyCheck(String value){
        if(value==null||"".equalsIgnoreCase(value)){
            return true;
        }
        return false;
    }
    
}
