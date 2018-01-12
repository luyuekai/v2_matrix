
package kg.auth.model.aaa;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import kg.auth.model.BaseObject;

    public class Te extends BaseObject{
        private String creationDate;
        private String lastModifiedDate;
        private List<String> conditions = new ArrayList<>();
        private String resourceComparator;
        private String createdBy;
        private String applicationType;
        private String lastModifiedBy;
        private Object actions;
        private List<String> subjects = new ArrayList<>();
        private String entitlementCombiner;
        private String saveIndex;
        private String searchIndex;
        private List<String> attributeNames = new ArrayList<>();
        private List<String> resources = new ArrayList<>();
        private String realm;
        private String description;
        private String name;


        @Override
        public int hashCode() {
            int hash = 5;
            hash = 37 * hash + Objects.hashCode(this.creationDate);
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
            final Te other = (Te) obj;
            if (!Objects.equals(this.creationDate, other.creationDate)) {
                return false;
            }
            return true;
        }

        @Override
        public String toString() {
            return "Test{" + "creationDate=" + creationDate + '}';
        }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public String getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(String lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public List<String> getConditions() {
        return conditions;
    }

    public void setConditions(List<String> conditions) {
        this.conditions = conditions;
    }

    public String getResourceComparator() {
        return resourceComparator;
    }

    public void setResourceComparator(String resourceComparator) {
        this.resourceComparator = resourceComparator;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getApplicationType() {
        return applicationType;
    }

    public void setApplicationType(String applicationType) {
        this.applicationType = applicationType;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Object getActions() {
        return actions;
    }

    public void setActions(Object actions) {
        this.actions = actions;
    }

    public List<String> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<String> subjects) {
        this.subjects = subjects;
    }

    public String getEntitlementCombiner() {
        return entitlementCombiner;
    }

    public void setEntitlementCombiner(String entitlementCombiner) {
        this.entitlementCombiner = entitlementCombiner;
    }

    public String getSaveIndex() {
        return saveIndex;
    }

    public void setSaveIndex(String saveIndex) {
        this.saveIndex = saveIndex;
    }

    public String getSearchIndex() {
        return searchIndex;
    }

    public void setSearchIndex(String searchIndex) {
        this.searchIndex = searchIndex;
    }

    public List<String> getAttributeNames() {
        return attributeNames;
    }

    public void setAttributeNames(List<String> attributeNames) {
        this.attributeNames = attributeNames;
    }

    public List<String> getResources() {
        return resources;
    }

    public void setResources(List<String> resources) {
        this.resources = resources;
    }

    public String getRealm() {
        return realm;
    }

    public void setRealm(String realm) {
        this.realm = realm;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
        
    }