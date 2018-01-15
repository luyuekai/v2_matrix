package kg.auth.model.aaa.policy;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import kg.auth.model.BaseObject;

public class SubjectPOJO extends BaseObject {

    private String type;
    private Set<String> subjectValues = new HashSet<>();
    private Set<String> groups = new HashSet<>();

    public void rebuild() {
        //"id=Group_Prototype_User,ou=group,dc=openam,dc=forgerock,dc=org"
        groups.clear();
        for (String s : subjectValues) {
            if (s.contains("ou=group")) {
                String[] parts = s.split(",");
                if (parts.length > 0) {
                    String[] subparts = parts[0].split("=");
                    if (subparts.length > 1) {
                        String group = subparts[1];
                        groups.add(group);
                    }
                }
            }
        }
    }

    public Set<String> getGroups() {
        return groups;
    }

    public void setGroups(Set<String> groups) {
        this.groups = groups;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<String> getSubjectValues() {
        return subjectValues;
    }

    public void setSubjectValues(Set<String> subjectValues) {
        this.subjectValues = subjectValues;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 29 * hash + Objects.hashCode(this.type);
        hash = 29 * hash + Objects.hashCode(this.subjectValues);
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
        final SubjectPOJO other = (SubjectPOJO) obj;
        if (!Objects.equals(this.type, other.type)) {
            return false;
        }
        if (!Objects.equals(this.subjectValues, other.subjectValues)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "SubjectPOJO{" + "type=" + type + ", subjectValues=" + subjectValues + '}';
    }

}
