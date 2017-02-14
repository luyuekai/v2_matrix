
package kg.auth.model.aaa;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import kg.auth.model.BaseObject;

public class ResourcePOJO extends BaseObject{

    private String name;
    private String application;
    private List<ActionPOJO> actions = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public List<ActionPOJO> getActions() {
        return actions;
    }

    public void setActions(List<ActionPOJO> actions) {
        this.actions = actions;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 61 * hash + Objects.hashCode(this.name);
        hash = 61 * hash + Objects.hashCode(this.application);
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
        final ResourcePOJO other = (ResourcePOJO) obj;
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (!Objects.equals(this.application, other.application)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ResourcePOJO{" + "name=" + name + ", application=" + application + ", actions=" + actions + '}';
    }
    
    
    
}
