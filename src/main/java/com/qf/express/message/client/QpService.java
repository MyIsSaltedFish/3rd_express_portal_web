package com.qf.express.message.client;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;
import com.qf.express.message.client.BcStaff;
import com.qf.express.message.client.QpNoticebill;


/**
 * This class was generated by Apache CXF 3.1.17
 * 2018-11-06T20:02:47.650+08:00
 * Generated source version: 3.1.17
 * 
 */
@WebService(targetNamespace = "http://api.manage.express.qf.com/", name = "QpService")
public interface QpService {
	@WebMethod
	List<QpNoticebill> findAllNoAss();
	@WebMethod
	List<BcStaff> findAllStaff();
	@WebMethod
	void updateForAss(QpNoticebill qb);
    @WebMethod
    @RequestWrapper(localName = "addQp", targetNamespace = "http://api.manage.express.qf.com/", className = "com.qf.express.message.client.AddQp")
    @ResponseWrapper(localName = "addQpResponse", targetNamespace = "http://api.manage.express.qf.com/", className = "com.qf.express.message.client.AddQpResponse")
    @WebResult(name = "return", targetNamespace = "")
    public com.qf.express.message.client.BcStaff addQp(
        @WebParam(name = "arg0", targetNamespace = "")
        com.qf.express.message.client.QpNoticebill arg0,
        @WebParam(name = "arg1", targetNamespace = "")
        java.lang.String arg1
    ) throws Exception;
}
