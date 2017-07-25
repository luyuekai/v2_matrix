
package kg.auth.model.aaa;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import kg.auth.model.BaseObject;

public class ApplicationRequestPOJO extends BaseObject{
    private String tokenId;
    private String name;
    private List<String> resources = new ArrayList<>();
    private Map<String,Boolean> actions = new HashMap<>();
    private List<String> conditions = new ArrayList<>();
    private List<String> subjects = new ArrayList<>();
    private List<String> attributeNames = new ArrayList<>();
    private String realm;
    private String applicationType;
    private String description;
    private String resourceComparator;
    private String entitlementCombiner;
    private String saveIndex;
    private String searchIndex;

    public String getTokenId() {
        return tokenId;
    }

    public void setTokenId(String tokenId) {
        this.tokenId = tokenId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getResources() {
        return resources;
    }

    public void setResources(List<String> resources) {
        this.resources = resources;
    }

    public Map<String, Boolean> getActions() {
        return actions;
    }

    public void setActions(Map<String, Boolean> actions) {
        this.actions = actions;
    }

    public List<String> getConditions() {
        return conditions;
    }

    public void setConditions(List<String> conditions) {
        this.conditions = conditions;
    }

    public List<String> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<String> subjects) {
        this.subjects = subjects;
    }

    public List<String> getAttributeNames() {
        return attributeNames;
    }

    public void setAttributeNames(List<String> attributeNames) {
        this.attributeNames = attributeNames;
    }

    public String getRealm() {
        return realm;
    }

    public void setRealm(String realm) {
        this.realm = realm;
    }

    public String getApplicationType() {
        return applicationType;
    }

    public void setApplicationType(String applicationType) {
        this.applicationType = applicationType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getResourceComparator() {
        return resourceComparator;
    }

    public void setResourceComparator(String resourceComparator) {
        this.resourceComparator = resourceComparator;
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

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 11 * hash + Objects.hashCode(this.name);
        hash = 11 * hash + Objects.hashCode(this.realm);
        hash = 11 * hash + Objects.hashCode(this.applicationType);
        hash = 11 * hash + Objects.hashCode(this.description);
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
        final ApplicationRequestPOJO other = (ApplicationRequestPOJO) obj;
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.realm, other.realm)) {
            return false;
        }
        if (!Objects.equals(this.applicationType, other.applicationType)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ApplicationRequestPOJO{" + "name=" + name + ", resources=" + resources + ", actions=" + actions + ", conditions=" + conditions + ", subjects=" + subjects + ", attributeNames=" + attributeNames + ", realm=" + realm + ", applicationType=" + applicationType + ", description=" + description + ", resourceComparator=" + resourceComparator + ", entitlementCombiner=" + entitlementCombiner + ", saveIndex=" + saveIndex + ", searchIndex=" + searchIndex + '}';
    }
    
    
    public ApplicationRequestPOJO build(){
        ApplicationRequestPOJO pojo = new ApplicationRequestPOJO();
        pojo.setName(name);
        pojo.setDescription(description);
        pojo.setResources(resources);
        if(realm==null||"".equalsIgnoreCase(realm)){
            pojo.setRealm("/");
        }else{
            pojo.setRealm(realm);
        }
        pojo.actions.put("UPDATE", Boolean.TRUE);
        pojo.actions.put("PATCH", Boolean.TRUE);
        pojo.actions.put("QUERY", Boolean.TRUE);
        pojo.actions.put("CREATE", Boolean.TRUE);
        pojo.actions.put("DELETE", Boolean.TRUE);
        pojo.actions.put("ACTION", Boolean.TRUE);
        pojo.actions.put("READ", Boolean.TRUE);
        
        pojo.conditions.add("AND");
        pojo.conditions.add("OR");
        pojo.conditions.add("NOT");
        pojo.conditions.add("AMIdentityMembership");
        pojo.conditions.add("AuthLevel");
        pojo.conditions.add("AuthScheme");
        pojo.conditions.add("AuthenticateToRealm");
        pojo.conditions.add("AuthenticateToService");
        pojo.conditions.add("IPv4");
        pojo.conditions.add("IPv6");
        pojo.conditions.add("LDAPFilter");
        pojo.conditions.add("LEAuthLevel");
        pojo.conditions.add("OAuth2Scope");
        pojo.conditions.add("ResourceEnvIP");
        pojo.conditions.add("Session");
        pojo.conditions.add("SessionProperty");
        pojo.conditions.add("SimpleTime");
        
        pojo.setApplicationType("iPlanetAMWebAgentService");
        pojo.setResourceComparator("com.sun.identity.entitlement.URLResourceName");
        
        pojo.subjects.add("AND");
        pojo.subjects.add("OR");
        pojo.subjects.add("NOT");
        pojo.subjects.add("AuthenticatedUsers");
        pojo.subjects.add("Identity");
        pojo.subjects.add("JwtClaim");
        
        pojo.setEntitlementCombiner("DenyOverride");
        pojo.setSaveIndex(null);
        pojo.setSearchIndex(null);
        
        
        return pojo;
    }
    
}
