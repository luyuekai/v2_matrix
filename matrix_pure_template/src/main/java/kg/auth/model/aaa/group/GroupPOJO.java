package kg.auth.model.aaa.group;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import kg.auth.model.BaseObject;

/**
 * {
 * "username" : "Group_Prototype_Tester", 
 * "realm" : "/", 
 * "uniqueMember" : [
 * "uid=yangliu,ou=people,dc=openam,dc=forgerock,dc=org",
 * "uid=willy,ou=people,dc=openam,dc=forgerock,dc=org",
 * "uid=yang,ou=people,dc=openam,dc=forgerock,dc=org" ], 
 * "universalid" : [
 * "id=Group_Prototype_Tester,ou=group,dc=openam,dc=forgerock,dc=org" ],
 * "dn" :
 * [ "cn=Group_Prototype_Tester,ou=groups,dc=openam,dc=forgerock,dc=org" ], 
 * "cn"
 * : [ "Group_Prototype_Tester" ], 
 * "objectclass" : [ "top", "groupofuniquenames"
 * ] }
 *
 * @author root
 */
public class GroupPOJO extends BaseObject{

    private String username;
    private String realm;
    private List<String> uniqueMember = new ArrayList<>();
    private List<String> universalid = new ArrayList<>();
    private List<String> dn = new ArrayList<>();
    private List<String> cn = new ArrayList<>();
    private List<String> objectclass = new ArrayList<>();
    private List<String> users = new ArrayList<>();
    private Map<String,Set<String>> resources = new HashMap<>();

    /**
     * This function is used for build users array
     */
    public void rebuild(){
        users.clear();
        for(String member:uniqueMember){
            String[] parts = member.split(",");
            if(parts.length>0){
                String[] subparts = parts[0].split("=");
                if(subparts.length>1){
                    String user = subparts[1];
                    users.add(user);
                }
            }
        }
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

    public List<String> getUniqueMember() {
        return uniqueMember;
    }

    public void setUniqueMember(List<String> uniqueMember) {
        this.uniqueMember = uniqueMember;
    }

    public List<String> getUniversalid() {
        return universalid;
    }

    public void setUniversalid(List<String> universalid) {
        this.universalid = universalid;
    }

    public List<String> getDn() {
        return dn;
    }

    public void setDn(List<String> dn) {
        this.dn = dn;
    }

    public List<String> getCn() {
        return cn;
    }

    public void setCn(List<String> cn) {
        this.cn = cn;
    }

    public List<String> getObjectclass() {
        return objectclass;
    }

    public void setObjectclass(List<String> objectclass) {
        this.objectclass = objectclass;
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 73 * hash + Objects.hashCode(this.username);
        hash = 73 * hash + Objects.hashCode(this.realm);
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
        final GroupPOJO other = (GroupPOJO) obj;
        if (!Objects.equals(this.username, other.username)) {
            return false;
        }
        if (!Objects.equals(this.realm, other.realm)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "GroupPOJO{" + "username=" + username + ", realm=" + realm + '}';
    }

    public Map<String, Set<String>> getResources() {
        return resources;
    }

    public void setResources(Map<String, Set<String>> resources) {
        this.resources = resources;
    }
    
}
