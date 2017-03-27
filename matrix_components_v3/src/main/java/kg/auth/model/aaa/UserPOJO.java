package kg.auth.model.aaa;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import kg.auth.model.BaseObject;

public class UserPOJO extends BaseObject {
    
    private String tokenId;
    private String username;
    private String realm;
    private String application;
    private Set<String> groups = new HashSet<>();
    private Set<ResourcePOJO> resources = new HashSet<>();
    
    
    public String getTokenId() {
        return tokenId;
    }

    public void setTokenId(String tokenId) {
        this.tokenId = tokenId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRealm() {
        return realm;
    }

    public void setRealm(String realm) {
        this.realm = realm;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public Set<String> getGroups() {
        return groups;
    }

    public void setGroups(Set<String> groups) {
        this.groups = groups;
    }

    public Set<ResourcePOJO> getResources() {
        return resources;
    }

    public void setResources(Set<ResourcePOJO> resources) {
        this.resources = resources;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 29 * hash + Objects.hashCode(this.tokenId);
        hash = 29 * hash + Objects.hashCode(this.username);
        hash = 29 * hash + Objects.hashCode(this.realm);
        hash = 29 * hash + Objects.hashCode(this.application);
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
        final UserPOJO other = (UserPOJO) obj;
        if (!Objects.equals(this.tokenId, other.tokenId)) {
            return false;
        }
        if (!Objects.equals(this.username, other.username)) {
            return false;
        }
        if (!Objects.equals(this.realm, other.realm)) {
            return false;
        }
        if (!Objects.equals(this.application, other.application)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "UserPOJO{" + "tokenId=" + tokenId + ", username=" + username + ", realm=" + realm + ", application=" + application + ", groups=" + groups + ", resources=" + resources + '}';
    }

    private Map<String, String> grantIndex = new HashMap<>();

    public Map<String, String> getGrantIndex() {
        return grantIndex;
    }

    public void setGrantIndex(Map<String, String> grantIndex) {
        this.grantIndex = grantIndex;
    }

    public static UserPOJO buildIndex(UserPOJO user) {
        user.getGrantIndex().clear();
        for (ResourcePOJO resourcePOJO : user.getResources()) {
            for (ActionPOJO actionPOJO : resourcePOJO.getActions()) {
                user.getGrantIndex().put(resourcePOJO.getName() + "_" + actionPOJO.getKey(), actionPOJO.getValue());
            }
        }
        return user;
    }
    public void buildSelf(){
        UserPOJO.buildIndex(this);
    }

    public static UserPOJO mock() {
        UserPOJO user = new UserPOJO();
        user.setApplication("TestApplication");
        user.setRealm("baseRealm");
        user.setUsername("user");
        user.setTokenId("1234567*token");

        ResourcePOJO resource1 = new ResourcePOJO();
        resource1.setName("resource1");
        ResourcePOJO resource2 = new ResourcePOJO();
        resource2.setName("resource2");

        ActionPOJO action1 = new ActionPOJO("GET", "true");
        ActionPOJO action2 = new ActionPOJO("PUT", "true");
        ActionPOJO action3 = new ActionPOJO("POST", "true");
        ActionPOJO action4 = new ActionPOJO("DELETE", "true");

        ActionPOJO action5 = new ActionPOJO("GET", "false");
        ActionPOJO action6 = new ActionPOJO("PUT", "false");
        ActionPOJO action7 = new ActionPOJO("POST", "123");
        ActionPOJO action8 = new ActionPOJO("DELETE", "false");

        resource1.getActions().add(action1);
        resource1.getActions().add(action2);
        resource1.getActions().add(action3);
        resource1.getActions().add(action4);
        resource2.getActions().add(action5);
        resource2.getActions().add(action6);
        resource2.getActions().add(action7);
        resource2.getActions().add(action8);

        user.getResources().add(resource2);
        user.getResources().add(resource1);

        user.getGroups().add("GROUP_USER");
        user.getGroups().add("GROUP_ADMIN");
        return user;
    }

    public static Boolean isGrant(UserPOJO user, String resource, String action) {
        boolean result = false;

        if (user.getGrantIndex().size() > 0) {
            if(user.getGrantIndex().containsKey(resource+"_"+action)){
                return Boolean.valueOf(user.getGrantIndex().get(resource+"_"+action));
            }else{
                return result;
            }
        } else {
            for (ResourcePOJO resourcePOJO : user.getResources()) {
                if (resource.equalsIgnoreCase(resourcePOJO.getName())) {
                    for (ActionPOJO actionPOJO : resourcePOJO.getActions()) {
                        if (action.equalsIgnoreCase(actionPOJO.getKey())) {
                            return actionPOJO.getbValue();
                        }
                    }
                }
            }
        }
        return result;
    }
}
