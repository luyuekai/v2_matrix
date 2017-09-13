package kg.auth.model.aaa;

import java.util.ArrayList;
import java.util.List;
import kg.auth.model.BaseObject;

public class AuthPOJO extends BaseObject {

    private String tokenId;
    private String principle;
    private String successUrl;
    private String failureUrl;
    private String statusCode;
    private String code;
    private String reason;
    private String result;
    private String message;
    private String authId;
    private String template;
    private String stage;
    private String header;
    private String callbacks;
    private String valid;
    private String uid;
    private String realm;
    private String active;
    private String maxtime;
    private int resultCount;
    private String pagedResultsCookie;
    private int remainingPagedResults;
    private String idletime;
    
    private String realmCreated;
    private String detail;
    private List<String> serviceNames = new ArrayList<>();
    
    private String id;
    private String dn;
    private String successURL;
    private String fullLoginURL;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDn() {
        return dn;
    }

    public void setDn(String dn) {
        this.dn = dn;
    }

    public String getSuccessURL() {
        return successURL;
    }

    public void setSuccessURL(String successURL) {
        this.successURL = successURL;
    }

    public String getFullLoginURL() {
        return fullLoginURL;
    }

    public void setFullLoginURL(String fullLoginURL) {
        this.fullLoginURL = fullLoginURL;
    }
    
    
    
    public int getResultCount() {
        return resultCount;
    }

    public void setResultCount(int resultCount) {
        this.resultCount = resultCount;
    }

    public String getPagedResultsCookie() {
        return pagedResultsCookie;
    }

    public void setPagedResultsCookie(String pagedResultsCookie) {
        this.pagedResultsCookie = pagedResultsCookie;
    }

    public int getRemainingPagedResults() {
        return remainingPagedResults;
    }

    public void setRemainingPagedResults(int remainingPagedResults) {
        this.remainingPagedResults = remainingPagedResults;
    }

    public List<String> getServiceNames() {
        return serviceNames;
    }

    public void setServiceNames(List<String> serviceNames) {
        this.serviceNames = serviceNames;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
    

    public String getRealmCreated() {
        return realmCreated;
    }

    public void setRealmCreated(String realmCreated) {
        this.realmCreated = realmCreated;
    }
    

    public String getIdletime() {
        return idletime;
    }

    public void setIdletime(String idletime) {
        this.idletime = idletime;
    }
    
    public String getMaxtime() {
        return maxtime;
    }

    public void setMaxtime(String maxtime) {
        this.maxtime = maxtime;
    }
    

    public String getActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }

    
    
    public String getValid() {
        return valid;
    }

    public void setValid(String valid) {
        this.valid = valid;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getRealm() {
        return realm;
    }

    public void setRealm(String realm) {
        this.realm = realm;
    }
    
    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public String getPrinciple() {
        return principle;
    }

    public void setPrinciple(String principle) {
        this.principle = principle;
    }

    public String getFailureUrl() {
        return failureUrl;
    }

    public void setFailureUrl(String failureUrl) {
        this.failureUrl = failureUrl;
    }

    public String getTokenId() {
        return tokenId;
    }

    public void setTokenId(String tokenId) {
        this.tokenId = tokenId;
    }

    public String getSuccessUrl() {
        return successUrl;
    }

    public void setSuccessUrl(String successUrl) {
        this.successUrl = successUrl;
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

    public String getAuthId() {
        return authId;
    }

    public void setAuthId(String authId) {
        this.authId = authId;
    }

    public String getTemplate() {
        return template;
    }

    public void setTemplate(String template) {
        this.template = template;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getCallbacks() {
        return callbacks;
    }

    public void setCallbacks(String callbacks) {
        this.callbacks = callbacks;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((authId == null) ? 0 : authId.hashCode());
        result = prime * result + ((callbacks == null) ? 0 : callbacks.hashCode());
        result = prime * result + ((code == null) ? 0 : code.hashCode());
        result = prime * result + ((header == null) ? 0 : header.hashCode());
        result = prime * result + ((message == null) ? 0 : message.hashCode());
        result = prime * result + ((reason == null) ? 0 : reason.hashCode());
        result = prime * result + ((stage == null) ? 0 : stage.hashCode());
        result = prime * result + ((successUrl == null) ? 0 : successUrl.hashCode());
        result = prime * result + ((template == null) ? 0 : template.hashCode());
        result = prime * result + ((tokenId == null) ? 0 : tokenId.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        AuthPOJO other = (AuthPOJO) obj;
        if (authId == null) {
            if (other.authId != null) {
                return false;
            }
        } else if (!authId.equals(other.authId)) {
            return false;
        }
        if (callbacks == null) {
            if (other.callbacks != null) {
                return false;
            }
        } else if (!callbacks.equals(other.callbacks)) {
            return false;
        }
        if (code == null) {
            if (other.code != null) {
                return false;
            }
        } else if (!code.equals(other.code)) {
            return false;
        }
        if (header == null) {
            if (other.header != null) {
                return false;
            }
        } else if (!header.equals(other.header)) {
            return false;
        }
        if (message == null) {
            if (other.message != null) {
                return false;
            }
        } else if (!message.equals(other.message)) {
            return false;
        }
        if (reason == null) {
            if (other.reason != null) {
                return false;
            }
        } else if (!reason.equals(other.reason)) {
            return false;
        }
        if (stage == null) {
            if (other.stage != null) {
                return false;
            }
        } else if (!stage.equals(other.stage)) {
            return false;
        }
        if (successUrl == null) {
            if (other.successUrl != null) {
                return false;
            }
        } else if (!successUrl.equals(other.successUrl)) {
            return false;
        }
        if (template == null) {
            if (other.template != null) {
                return false;
            }
        } else if (!template.equals(other.template)) {
            return false;
        }
        if (tokenId == null) {
            if (other.tokenId != null) {
                return false;
            }
        } else if (!tokenId.equals(other.tokenId)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "AuthPOJO [" + (tokenId != null ? "tokenId=" + tokenId + ", " : "")
                + (successUrl != null ? "successUrl=" + successUrl + ", " : "")
                + (code != null ? "code=" + code + ", " : "") + (reason != null ? "reason=" + reason + ", " : "")
                + (message != null ? "message=" + message + ", " : "")
                + (authId != null ? "authId=" + authId + ", " : "")
                + (template != null ? "template=" + template + ", " : "")
                + (stage != null ? "stage=" + stage + ", " : "") + (header != null ? "header=" + header + ", " : "")
                + (callbacks != null ? "callbacks=" + callbacks : "") + "]";
    }

}
