package kg.auth.model;

import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import kg.auth.model.aaa.UserPOJO;
import kg.auth.utils.JsonUtil;
import org.codehaus.jackson.map.JsonMappingException;

public class PagingPOJO<T> extends BaseObject{

	private static final long serialVersionUID = -166071960583144611L;

	
	private Long totalCounts;
	private Integer pageMaxSize;
	private Integer currentPageNumber;
	private Integer currentPageSize;
	private List<T> result;
	
	private Boolean hasError;
        private String statusCode;
	private String errorMessage;
        public PagingPOJO(){
            super();
            this.pageMaxSize=1;
            this.currentPageNumber=1;
            this.currentPageSize=1;
            this.totalCounts=0L;
        }
	/**
	 * @return the totalCounts
	 */
	public Long getTotalCounts() {
		return totalCounts;
	}
	/**
	 * @param totalCounts the totalCounts to set
	 */
	public void setTotalCounts(Long totalCounts) {
		this.totalCounts = totalCounts;
	}
	/**
	 * @return the pageMaxSize
	 */
	public Integer getPageMaxSize() {
		return pageMaxSize;
	}
	/**
	 * @param pageMaxSize the pageMaxSize to set
	 */
	public void setPageMaxSize(Integer pageMaxSize) {
		this.pageMaxSize = pageMaxSize;
	}
	/**
	 * @return the currentPageNumber
	 */
	public Integer getCurrentPageNumber() {
		return currentPageNumber;
	}
	/**
	 * @param currentPageNumber the currentPageNumber to set
	 */
	public void setCurrentPageNumber(Integer currentPageNumber) {
		this.currentPageNumber = currentPageNumber;
	}
	/**
	 * @return the currentPageSize
	 */
	public Integer getCurrentPageSize() {
		return currentPageSize;
	}
	/**
	 * @param currentPageSize the currentPageSize to set
	 */
	public void setCurrentPageSize(Integer currentPageSize) {
		this.currentPageSize = currentPageSize;
	}
	/**
	 * @return the result
	 */
	public List<T> getResult() {
		return result;
	}
	/**
	 * @param result the result to set
	 */
	public void setResult(List<T> result) {
		this.result = result;
	}
	/**
	 * @return the hasError
	 */
	public Boolean getHasError() {
		return hasError;
	}
	/**
	 * @param hasError the hasError to set
	 */
	public void setHasError(Boolean hasError) {
		this.hasError = hasError;
	}
	/**
	 * @return the errorMessage
	 */
	public String getErrorMessage() {
		return errorMessage;
	}
	/**
	 * @param errorMessage the errorMessage to set
	 */
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime
				* result
				+ ((currentPageNumber == null) ? 0 : currentPageNumber
						.hashCode());
		result = prime * result
				+ ((currentPageSize == null) ? 0 : currentPageSize.hashCode());
		result = prime * result
				+ ((errorMessage == null) ? 0 : errorMessage.hashCode());
		result = prime * result
				+ ((pageMaxSize == null) ? 0 : pageMaxSize.hashCode());
		result = prime * result
				+ ((totalCounts == null) ? 0 : totalCounts.hashCode());
		return result;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PagingPOJO other = (PagingPOJO) obj;
		if (currentPageNumber == null) {
			if (other.currentPageNumber != null)
				return false;
		} else if (!currentPageNumber.equals(other.currentPageNumber))
			return false;
		if (currentPageSize == null) {
			if (other.currentPageSize != null)
				return false;
		} else if (!currentPageSize.equals(other.currentPageSize))
			return false;
		if (errorMessage == null) {
			if (other.errorMessage != null)
				return false;
		} else if (!errorMessage.equals(other.errorMessage))
			return false;
		if (pageMaxSize == null) {
			if (other.pageMaxSize != null)
				return false;
		} else if (!pageMaxSize.equals(other.pageMaxSize))
			return false;
		if (totalCounts == null) {
			if (other.totalCounts != null)
				return false;
		} else if (!totalCounts.equals(other.totalCounts))
			return false;
		return true;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "PagingPOJO [totalCounts=" + totalCounts + ", pageMaxSize="
				+ pageMaxSize + ", currentPageNumber=" + currentPageNumber
				+ ", currentPageSize=" + currentPageSize + ", result=" + result
				+ ", hasError=" + hasError + ", errorMessage=" + errorMessage
				+ "]";
	}

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }
	
	public static void main(String[] args) {
            try {
                String s = "{\"totalCounts\":1,\"pageMaxSize\":1,\"currentPageNumber\":1,\"currentPageSize\":1,\"result\":[{\"tokenId\":\"AQIC5wM2LY4Sfcx5_MwY8Und9hDD4Dk-tQPsMyjdIX_mbmg.*AAJTSQACMDEAAlNLABQtNzM5OTY0ODg0NDc4MDMzMTQ3OA..*\",\"username\":\"yang\",\"groups\":[\"Group_Prototype_User\",\"Group_Prototype_Tester\"],\"resources\":[{\"name\":\"http://www.haohandata.com:80/app1/user\",\"actions\":[{\"key\":\"POST\",\"value\":\"true\",\"bValue\":true},{\"key\":\"PATCH\",\"value\":\"true\",\"bValue\":true},{\"key\":\"GET\",\"value\":\"true\",\"bValue\":true},{\"key\":\"DELETE\",\"value\":\"true\",\"bValue\":true},{\"key\":\"OPTIONS\",\"value\":\"true\",\"bValue\":true},{\"key\":\"HEAD\",\"value\":\"true\",\"bValue\":true},{\"key\":\"PUT\",\"value\":\"true\",\"bValue\":true}]}],\"grantIndex\":{\"http://www.haohandata.com:80/app1/user_PUT\":\"true\",\"http://www.haohandata.com:80/app1/user_OPTIONS\":\"true\",\"http://www.haohandata.com:80/app1/user_GET\":\"true\",\"http://www.haohandata.com:80/app1/user_DELETE\":\"true\",\"http://www.haohandata.com:80/app1/user_PATCH\":\"true\",\"http://www.haohandata.com:80/app1/user_HEAD\":\"true\",\"http://www.haohandata.com:80/app1/user_POST\":\"true\"}}],\"hasError\":false,\"statusCode\":\"200\"}";
                PagingPOJO pojo = JsonUtil.toPojo(s,PagingPOJO.class);
                System.out.println("pojo is "+JsonUtil.toJson(pojo));
                Object obj =pojo.getResult().get(0);
                System.out.println("json is "+JsonUtil.toJson(obj));
                System.out.println("obj is"+obj.toString());
                String s2 = "{\"tokenId\":\"AQIC5wM2LY4Sfcx5_MwY8Und9hDD4Dk-tQPsMyjdIX_mbmg.*AAJTSQACMDEAAlNLABQtNzM5OTY0ODg0NDc4MDMzMTQ3OA..*\",\"username\":\"yang\",\"groups\":[\"Group_Prototype_User\",\"Group_Prototype_Tester\"],\"resources\":[{\"name\":\"http://www.haohandata.com:80/app1/user\",\"actions\":[{\"key\":\"POST\",\"value\":\"true\",\"bValue\":true},{\"key\":\"PATCH\",\"value\":\"true\",\"bValue\":true},{\"key\":\"GET\",\"value\":\"true\",\"bValue\":true},{\"key\":\"DELETE\",\"value\":\"true\",\"bValue\":true},{\"key\":\"OPTIONS\",\"value\":\"true\",\"bValue\":true},{\"key\":\"HEAD\",\"value\":\"true\",\"bValue\":true},{\"key\":\"PUT\",\"value\":\"true\",\"bValue\":true}]}],\"grantIndex\":{\"http://www.haohandata.com:80/app1/user_PUT\":\"true\",\"http://www.haohandata.com:80/app1/user_OPTIONS\":\"true\",\"http://www.haohandata.com:80/app1/user_GET\":\"true\",\"http://www.haohandata.com:80/app1/user_DELETE\":\"true\",\"http://www.haohandata.com:80/app1/user_PATCH\":\"true\",\"http://www.haohandata.com:80/app1/user_HEAD\":\"true\",\"http://www.haohandata.com:80/app1/user_POST\":\"true\"}}";
                UserPOJO user = JsonUtil.toPojo(JsonUtil.toJson(pojo.getResult().get(0)),UserPOJO.class);
            } catch (JsonMappingException ex) {
                Logger.getLogger(PagingPOJO.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IOException ex) {
                Logger.getLogger(PagingPOJO.class.getName()).log(Level.SEVERE, null, ex);
            }
            
        }
}
