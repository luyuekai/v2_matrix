package kg.auth.model.aaa.policy;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import kg.auth.model.BaseObject;
import kg.auth.model.aaa.ActionPOJO;
import kg.auth.model.aaa.action.ActionResponse;


public class PolicyPOJO extends BaseObject{
    private String name;
    private Boolean active;
    private String description;
    private String applicationName;
    private ActionResponse actionValues = new ActionResponse();
    private Set<String> resources = new HashSet<>();
    private SubjectPOJO subject = new SubjectPOJO();
    private String lastModifiedBy;
    private String lastModifiedDate;
    private String createdBy;
    private String creationDate;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public ActionResponse getActionValues() {
        return actionValues;
    }

    public void setActionValues(ActionResponse actionValues) {
        this.actionValues = actionValues;
    }

    public Set<String> getResources() {
        return resources;
    }

    public void setResources(Set<String> resources) {
        this.resources = resources;
    }

    public SubjectPOJO getSubject() {
        return subject;
    }

    public void setSubject(SubjectPOJO subject) {
        this.subject = subject;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public String getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(String lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 41 * hash + Objects.hashCode(this.name);
        hash = 41 * hash + Objects.hashCode(this.active);
        hash = 41 * hash + Objects.hashCode(this.description);
        hash = 41 * hash + Objects.hashCode(this.applicationName);
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
        final PolicyPOJO other = (PolicyPOJO) obj;
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.active, other.active)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.applicationName, other.applicationName)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PolicyPOJO{" + "name=" + name + ", active=" + active + ", description=" + description + ", applicationName=" + applicationName + ", actionValues=" + actionValues + ", resources=" + resources + ", subject=" + subject + ", lastModifiedBy=" + lastModifiedBy + ", lastModifiedDate=" + lastModifiedDate + ", createdBy=" + createdBy + ", creationDate=" + creationDate + '}';
    }
    
}
