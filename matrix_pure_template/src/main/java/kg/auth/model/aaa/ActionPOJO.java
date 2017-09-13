
package kg.auth.model.aaa;

import java.util.Objects;
import kg.auth.model.BaseObject;

public class ActionPOJO extends BaseObject{
    private String resource;
    private String key;
    private String value;
    private Boolean bValue;
    
    public ActionPOJO(){
        super();
    }
    public ActionPOJO(String key,String value){
        super();
        this.key=key;
        this.value=value;
    }

    public Boolean getbValue() {
        if(value!=null){
            bValue = Boolean.valueOf(value);
        }
        return bValue;
    }

    public void setbValue(Boolean bValue) {
        this.bValue = bValue;
    }
    
    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 89 * hash + Objects.hashCode(this.resource);
        hash = 89 * hash + Objects.hashCode(this.key);
        hash = 89 * hash + Objects.hashCode(this.value);
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
        final ActionPOJO other = (ActionPOJO) obj;
        if (!Objects.equals(this.resource, other.resource)) {
            return false;
        }
        if (!Objects.equals(this.key, other.key)) {
            return false;
        }
        if (!Objects.equals(this.value, other.value)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ActionPOJO{" + "resource=" + resource + ", key=" + key + ", value=" + value + '}';
    }
    
    
}
