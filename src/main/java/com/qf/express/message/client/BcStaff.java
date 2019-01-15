package com.qf.express.message.client;

public class BcStaff {
    @Override
	public String toString() {
		return "BcStaff [id=" + id + ", name=" + name + ", telephone=" + telephone + ", haspda=" + haspda + ", deltag="
				+ deltag + ", station=" + station + ", standard=" + standard + "]";
	}

	private Integer id;

    private String name;

    private String telephone;

    private String haspda;

    private String deltag;

    private String station;

    private String standard;

    private String newName;
    
    public String getNewName() {
		return this.name+":"+this.telephone;
	}

	public void setNewName(String newName) {
		this.newName = newName;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone == null ? null : telephone.trim();
    }

    public String getHaspda() {
        return haspda;
    }

    public void setHaspda(String haspda) {
        this.haspda = haspda == null ? null : haspda.trim();
    }

    public String getDeltag() {
        return deltag;
    }

    public void setDeltag(String deltag) {
        this.deltag = deltag == null ? null : deltag.trim();
    }

    public String getStation() {
        return station;
    }

    public void setStation(String station) {
        this.station = station == null ? null : station.trim();
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard == null ? null : standard.trim();
    }
}