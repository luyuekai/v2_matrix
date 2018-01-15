
package kg.auth.model.aaa.action;

import java.io.IOException;
import java.util.Objects;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import kg.auth.model.BaseObject;
import kg.auth.utils.JsonUtil;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.JsonMappingException;

public class ActionResponse extends BaseObject{
    
    
    private boolean GET;
    private boolean PUT;
    private boolean POST;
    private boolean DELETE;
    private boolean HEAD;
    private boolean OPTIONS;
    private boolean PATCH;
    private boolean DOWNLOAD;
    private boolean UPLOAD;
    private boolean VERSION;

    
    public Set<String> merge(Set<String> actions){
        if(GET&&!actions.contains("GET")){
            actions.add("GET");
        }
        if(PUT&&!actions.contains("PUT")){
            actions.add("PUT");
        }
        if(POST&&!actions.contains("POST")){
            actions.add("POST");
        }
        if(DELETE&&!actions.contains("DELETE")){
            actions.add("DELETE");
        }
        if(HEAD&&!actions.contains("HEAD")){
            actions.add("HEAD");
        }
        if(OPTIONS&&!actions.contains("OPTIONS")){
            actions.add("OPTIONS");
        }
        if(PATCH&&!actions.contains("PATCH")){
            actions.add("PATCH");
        }
        if(DOWNLOAD&&!actions.contains("DOWNLOAD")){
            actions.add("DOWNLOAD");
        }
        if(UPLOAD&&!actions.contains("UPLOAD")){
            actions.add("UPLOAD");
        }
        if(VERSION&&!actions.contains("VERSION")){
            actions.add("VERSION");
        }
        return actions;
    }
    
    public boolean getGET() {
        return GET;
    }

    @JsonProperty("GET")
    public void setGET(boolean GET) {
        this.GET = GET;
    }

    public boolean getPUT() {
        return PUT;
    }
    
    @JsonProperty("PUT")
    public void setPUT(boolean PUT) {
        this.PUT = PUT;
    }

    public boolean getPOST() {
        return POST;
    }
    
    @JsonProperty("POST")
    public void setPOST(boolean POST) {
        this.POST = POST;
    }

    public boolean getDELETE() {
        return DELETE;
    }
    
    @JsonProperty("DELETE")
    public void setDELETE(boolean DELETE) {
        this.DELETE = DELETE;
    }

    public boolean getHEAD() {
        return HEAD;
    }

    @JsonProperty("HEAD")
    public void setHEAD(boolean HEAD) {
        this.HEAD = HEAD;
    }

    public boolean getOPTIONS() {
        return OPTIONS;
    }

    @JsonProperty("OPTIONS")
    public void setOPTIONS(boolean OPTIONS) {
        this.OPTIONS = OPTIONS;
    }

    public boolean getPATCH() {
        return PATCH;
    }

    @JsonProperty("PATCH")
    public void setPATCH(boolean PATCH) {
        this.PATCH = PATCH;
    }

    public boolean getDOWNLOAD() {
        return DOWNLOAD;
    }

    @JsonProperty("DOWNLOAD")
    public void setDOWNLOAD(boolean DOWNLOAD) {
        this.DOWNLOAD = DOWNLOAD;
    }

    public boolean getUPLOAD() {
        return UPLOAD;
    }

    @JsonProperty("UPLOAD")
    public void setUPLOAD(boolean UPLOAD) {
        this.UPLOAD = UPLOAD;
    }

    public boolean getVERSION() {
        return VERSION;
    }

    @JsonProperty("VERSION")
    public void setVERSION(boolean VERSION) {
        this.VERSION = VERSION;
    }
   
    

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 37 * hash + Objects.hashCode(this.GET);
        hash = 37 * hash + Objects.hashCode(this.PUT);
        hash = 37 * hash + Objects.hashCode(this.POST);
        hash = 37 * hash + Objects.hashCode(this.DELETE);
        hash = 37 * hash + Objects.hashCode(this.HEAD);
        hash = 37 * hash + Objects.hashCode(this.OPTIONS);
        hash = 37 * hash + Objects.hashCode(this.PATCH);
        hash = 37 * hash + Objects.hashCode(this.DOWNLOAD);
        hash = 37 * hash + Objects.hashCode(this.UPLOAD);
        hash = 37 * hash + Objects.hashCode(this.VERSION);
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
        final ActionResponse other = (ActionResponse) obj;
        if (!Objects.equals(this.GET, other.GET)) {
            return false;
        }
        if (!Objects.equals(this.PUT, other.PUT)) {
            return false;
        }
        if (!Objects.equals(this.POST, other.POST)) {
            return false;
        }
        if (!Objects.equals(this.DELETE, other.DELETE)) {
            return false;
        }
        if (!Objects.equals(this.HEAD, other.HEAD)) {
            return false;
        }
        if (!Objects.equals(this.OPTIONS, other.OPTIONS)) {
            return false;
        }
        if (!Objects.equals(this.PATCH, other.PATCH)) {
            return false;
        }
        if (!Objects.equals(this.DOWNLOAD, other.DOWNLOAD)) {
            return false;
        }
        if (!Objects.equals(this.UPLOAD, other.UPLOAD)) {
            return false;
        }
        if (!Objects.equals(this.VERSION, other.VERSION)) {
            return false;
        }
        return true;
    }

    

    @Override
    public String toString() {
        return "ActionResponse{" + "GET=" + GET + ", PUT=" + PUT + ", POST=" + POST + ", DELETE=" + DELETE + ", HEAD=" + HEAD + ", OPTIONS=" + OPTIONS + ", PATCH=" + PATCH + ", DOWNLOAD=" + DOWNLOAD + ", UPLOAD=" + UPLOAD + ", VERSION=" + VERSION + '}';
    }

    
    
}
