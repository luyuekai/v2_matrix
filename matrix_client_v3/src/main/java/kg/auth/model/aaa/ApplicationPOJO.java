package kg.auth.model.aaa;

import java.util.Objects;
import kg.auth.model.BaseObject;

public class ApplicationPOJO extends BaseObject {


    
    
    private String detail;
    private String statusCode;
    private String success;
    private String code;
    private String reason;
    private String message;
    private String jsonResult;
    
    
    
    

    public String getJsonResult() {
        return jsonResult;
    }

    public void setJsonResult(String jsonResult) {
        this.jsonResult = jsonResult;
    }
    
    

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public String getSuccess() {
        return success;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 37 * hash + Objects.hashCode(this.detail);
        hash = 37 * hash + Objects.hashCode(this.statusCode);
        hash = 37 * hash + Objects.hashCode(this.success);
        hash = 37 * hash + Objects.hashCode(this.code);
        hash = 37 * hash + Objects.hashCode(this.reason);
        hash = 37 * hash + Objects.hashCode(this.message);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final ApplicationPOJO other = (ApplicationPOJO) obj;
        if (!Objects.equals(this.detail, other.detail)) {
            return false;
        }
        if (!Objects.equals(this.statusCode, other.statusCode)) {
            return false;
        }
        if (!Objects.equals(this.success, other.success)) {
            return false;
        }
        if (!Objects.equals(this.code, other.code)) {
            return false;
        }
        if (!Objects.equals(this.reason, other.reason)) {
            return false;
        }
        if (!Objects.equals(this.message, other.message)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ApplicationPOJO{" + "detail=" + detail + ", statusCode=" + statusCode + ", success=" + success + ", code=" + code + ", reason=" + reason + ", message=" + message + '}';
    }



}
