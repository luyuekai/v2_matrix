package kg.auth.model.aaa.group;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import kg.auth.model.BaseObject;

public class GroupResponse extends BaseObject {

    private List<String> result = new ArrayList<>();
    private int resultCount;
    private String pagedResultsCookie;
    private int remainingPagedResults;

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

    public List<String> getResult() {
        return result;
    }

    public void setResult(List<String> result) {
        this.result = result;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 37 * hash + Objects.hashCode(this.result);
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
        final GroupResponse other = (GroupResponse) obj;
        if (!Objects.equals(this.result, other.result)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Test{" + "result=" + result + '}';
    }

}
