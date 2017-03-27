
package kg.auth.model.aaa.policy;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import kg.auth.model.BaseObject;

public class PolicyResponse extends BaseObject{
    private List<PolicyPOJO> result = new ArrayList<>();
    private int resultCount;
    private String pagedResultsCookie;
    private int remainingPagedResults;

    public void rebuild(){
        for(PolicyPOJO pojo:result){
            pojo.getSubject().rebuild();
        }
    }
    public List<PolicyPOJO> getResult() {
        return result;
    }

    public void setResult(List<PolicyPOJO> result) {
        this.result = result;
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

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 17 * hash + Objects.hashCode(this.result);
        hash = 17 * hash + this.resultCount;
        hash = 17 * hash + Objects.hashCode(this.pagedResultsCookie);
        hash = 17 * hash + this.remainingPagedResults;
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
        final PolicyResponse other = (PolicyResponse) obj;
        if (!Objects.equals(this.result, other.result)) {
            return false;
        }
        if (this.resultCount != other.resultCount) {
            return false;
        }
        if (!Objects.equals(this.pagedResultsCookie, other.pagedResultsCookie)) {
            return false;
        }
        if (this.remainingPagedResults != other.remainingPagedResults) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PolicyResponse{" + "result=" + result + ", resultCount=" + resultCount + ", pagedResultsCookie=" + pagedResultsCookie + ", remainingPagedResults=" + remainingPagedResults + '}';
    }
    
}
