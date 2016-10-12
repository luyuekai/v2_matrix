/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package v2.matrix.client.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author lqshanshuo
 */
@Entity
@Table(name = "share")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Share.findAll", query = "SELECT s FROM Share s"),
    @NamedQuery(name = "Share.findById", query = "SELECT s FROM Share s WHERE s.id = :id"),
    @NamedQuery(name = "Share.findByJson", query = "SELECT s FROM Share s WHERE s.json = :json"),
    @NamedQuery(name = "Share.findByType", query = "SELECT s FROM Share s WHERE s.type = :type"),
    @NamedQuery(name = "Share.findByUsername", query = "SELECT s FROM Share s WHERE s.username = :username"),
    @NamedQuery(name = "Share.findByCreatetime", query = "SELECT s FROM Share s WHERE s.createtime = :createtime"),
    @NamedQuery(name = "Share.findByToken", query = "SELECT s FROM Share s WHERE s.token = :token"),
    @NamedQuery(name = "Share.findByExpiretime", query = "SELECT s FROM Share s WHERE s.expiretime = :expiretime"),
    @NamedQuery(name = "Share.findByValid", query = "SELECT s FROM Share s WHERE s.valid = :valid")})
public class Share implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Size(max = 2147483647)
    @Column(name = "json")
    private String json;
    @Size(max = 2147483647)
    @Column(name = "type")
    private String type;
    @Size(max = 2147483647)
    @Column(name = "username")
    private String username;
    @Column(name = "createtime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createtime;
    @Size(max = 2147483647)
    @Column(name = "token")
    private String token;
    @Column(name = "expiretime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expiretime;
    @Column(name = "valid")
    private Boolean valid;

    public Share() {
    }

    public Share(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpiretime() {
        return expiretime;
    }

    public void setExpiretime(Date expiretime) {
        this.expiretime = expiretime;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Share)) {
            return false;
        }
        Share other = (Share) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "v2.matrix.client.entity.Share[ id=" + id + " ]";
    }
    
}
