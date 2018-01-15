package kg.auth.model.aaa;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import kg.auth.model.BaseObject;

public class RealmPOJO extends BaseObject {

    private int resultCount;
    private String pagedResultsCookie;
    private int remainingPagedResults;
    private String idletime;
    private String realmCreated;
    private String detail;
    private List<String> serviceNames = new ArrayList<>();
    private List<String> result = new ArrayList<>();
    private String statusCode;
    private String realmUpdated;
    private String success;
    private String code;
    private String reason;
    private String message;

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

    public String getRealmUpdated() {
        return realmUpdated;
    }

    public void setRealmUpdated(String realmUpdated) {
        this.realmUpdated = realmUpdated;
    }
    
    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
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

    public String getIdletime() {
        return idletime;
    }

    public void setIdletime(String idletime) {
        this.idletime = idletime;
    }

    public String getRealmCreated() {
        return realmCreated;
    }

    public void setRealmCreated(String realmCreated) {
        this.realmCreated = realmCreated;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public List<String> getServiceNames() {
        return serviceNames;
    }

    public void setServiceNames(List<String> serviceNames) {
        this.serviceNames = serviceNames;
    }

    public List<String> getResult() {
        return result;
    }

    public void setResult(List<String> result) {
        this.result = result;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 97 * hash + this.resultCount;
        hash = 97 * hash + Objects.hashCode(this.pagedResultsCookie);
        hash = 97 * hash + this.remainingPagedResults;
        hash = 97 * hash + Objects.hashCode(this.idletime);
        hash = 97 * hash + Objects.hashCode(this.realmCreated);
        hash = 97 * hash + Objects.hashCode(this.detail);
        hash = 97 * hash + Objects.hashCode(this.serviceNames);
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
        final RealmPOJO other = (RealmPOJO) obj;
        if (this.resultCount != other.resultCount) {
            return false;
        }
        if (!Objects.equals(this.pagedResultsCookie, other.pagedResultsCookie)) {
            return false;
        }
        if (this.remainingPagedResults != other.remainingPagedResults) {
            return false;
        }
        if (!Objects.equals(this.idletime, other.idletime)) {
            return false;
        }
        if (!Objects.equals(this.realmCreated, other.realmCreated)) {
            return false;
        }
        if (!Objects.equals(this.detail, other.detail)) {
            return false;
        }
        if (!Objects.equals(this.serviceNames, other.serviceNames)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "RealmPOJO{" + "resultCount=" + resultCount + ", pagedResultsCookie=" + pagedResultsCookie + ", remainingPagedResults=" + remainingPagedResults + ", idletime=" + idletime + ", realmCreated=" + realmCreated + ", detail=" + detail + ", serviceNames=" + serviceNames + ", result=" + result + '}';
    }

}
