package com.qf.express.portal.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qf.express.common.AppResult;
import com.qf.express.message.client.BcStaff;
import com.qf.express.message.client.MsgService;
import com.qf.express.message.client.QpNoticebill;
import com.qf.express.message.client.QpService;
@Controller
public class QpAction {
	@Autowired
	private QpService qpService;
	@Autowired
	private MsgService msgService;
	@RequestMapping("/qp/add")
	@ResponseBody
	public AppResult addQp(QpNoticebill qb,String dzid) throws Exception {
		System.out.println(qb);
		System.out.println("dzid:"+dzid);
		//1 添加去派单（自动 或者 手动）
		BcStaff staff = qpService.addQp(qb, dzid);
		
		if(staff==null) {
			System.out.println("手动分单");
			msgService.sendTs("ts_qj_22", "请注意，有一个没有分配的取件单，请及时分配");
		}else {
			System.out.println(staff.getTelephone()+"测试"+"mz"+staff.getName()+"-地址"+qb.getPickaddress());
			msgService.sendQjCms(staff.getTelephone(), staff.getName(), qb.getPickaddress());
		}
		return new AppResult(200, "预定成功", null);
	}
}
