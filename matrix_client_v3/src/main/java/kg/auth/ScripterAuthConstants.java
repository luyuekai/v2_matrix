package kg.auth;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ScripterAuthConstants {
    private static List<String> groups = null;
    
    public static List<String> getGroups(){
        if(groups==null){
            groups = new ArrayList<>();
            groups.add("SCRIPTER_FILE");
            groups.add("SCRIPTER_PIG");
            groups.add("SCRIPTER_HIVE");
            groups.add("SCRIPTER_HDFS");
            groups.add("SCRIPTER_RDMS");
            groups.add("SCRIPTER_CLUSTER");
            groups.add("SCRIPTER_CONFIG");
        }
        List<String> immutablelist = Collections.unmodifiableList(groups);
        return immutablelist;
    }
}
