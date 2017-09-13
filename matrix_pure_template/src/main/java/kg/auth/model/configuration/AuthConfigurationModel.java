package kg.auth.model.configuration;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import kg.auth.model.BaseObject;

public class AuthConfigurationModel extends BaseObject {

    private static final long serialVersionUID = 1126112477025711610L;

    private String ssoServerURI;
    private String ssoServerPort;
    private String ldapServerURI;
    private String ldapServerPort;

    public String getSsoServerURI() {
        return ssoServerURI;
    }

    public void setSsoServerURI(String ssoServerURI) {
        this.ssoServerURI = ssoServerURI;
    }

    public String getSsoServerPort() {
        return ssoServerPort;
    }

    public void setSsoServerPort(String ssoServerPort) {
        this.ssoServerPort = ssoServerPort;
    }

    public String getLdapServerURI() {
        return ldapServerURI;
    }

    public void setLdapServerURI(String ldapServerURI) {
        this.ldapServerURI = ldapServerURI;
    }

    public String getLdapServerPort() {
        return ldapServerPort;
    }

    public void setLdapServerPort(String ldapServerPort) {
        this.ldapServerPort = ldapServerPort;
    }

    @Override
    public int hashCode() {
        int hash = 7;
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
        final AuthConfigurationModel other = (AuthConfigurationModel) obj;
        if (!Objects.equals(this.ssoServerURI, other.ssoServerURI)) {
            return false;
        }
        if (!Objects.equals(this.ssoServerPort, other.ssoServerPort)) {
            return false;
        }
        if (!Objects.equals(this.ldapServerURI, other.ldapServerURI)) {
            return false;
        }
        if (!Objects.equals(this.ldapServerPort, other.ldapServerPort)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "AuthConfigurationModel{" + "ssoServerURI=" + ssoServerURI + ", ssoServerPort=" + ssoServerPort + ", ldapServerURI=" + ldapServerURI + ", ldapServerPort=" + ldapServerPort + '}';
    }

    private Map<String, String> properties = new HashMap<>();

    /**
     * @return the properties
     */
    public Map<String, String> getProperties() {
        return properties;
    }

    /**
     * @param properties the properties to set
     */
    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }

    public boolean isKeyExist(String key) {
        return properties.containsKey(key);
    }

    public String getValue(String key) {
        return properties.get(key);
    }
}
