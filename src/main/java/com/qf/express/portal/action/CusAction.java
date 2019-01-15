package com.qf.express.portal.action;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qf.express.common.AppExcption;
import com.qf.express.common.AppResult;
import com.qf.express.crm.client.CustomerService;
import com.qf.express.crm.client.TCustomer;
import com.qf.express.message.client.MsgService;

@Controller
public class CusAction {
	@Autowired
	private MsgService msgService;
	@Autowired
	private CustomerService customerService;
	
	@RequestMapping("/cus/findcustbyphone")
	@ResponseBody
	public TCustomer findcustbyphone(String phone) throws Exception {
		
		return customerService.findCusByPhone(phone);
	}
	
	@RequestMapping("/cus/checkcode")
	public AppResult checkcode(String phone,HttpSession session) throws Exception {
		//1 发短信 并且获得验证码
		String code = msgService.sendCheckSms(phone, "SMS_150182975");
		//2 把验证码 放入session 中 然后设置session的失效时间SMS_150182975
		session.setAttribute("checkcode", code);
		session.setMaxInactiveInterval(1*60);
		
		return  new AppResult(200,null,null);
		
	}
	
	//cus/reg
	@RequestMapping("/cus/reg")
	@ResponseBody
	public AppResult reg(String checkcode,HttpSession session,TCustomer customer) throws Exception {
		//1 
		Object code = session.getAttribute("checkcode");
		if(code==null) {
			throw new AppExcption(201, "验证码失效");
		}
		if(code.toString().equals(checkcode)==false) {
			throw new AppExcption(201, "验证码不正确");
		}
		//2 调用3rd_exprss_crm 中添加客户的方法
		
		
		return customerService.addCustomer(customer);
	}
	
}
