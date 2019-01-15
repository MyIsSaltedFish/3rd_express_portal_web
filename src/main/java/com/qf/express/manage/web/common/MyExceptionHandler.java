package com.qf.express.manage.web.common;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qf.express.common.AppExcption;
import com.qf.express.common.AppResult;

@Component
@ControllerAdvice
public class MyExceptionHandler {
	
	//@ExceptionHandler 本action 中的其他的方法 如果抛出异常 又没有处理的话 就会走到这个注解修饰的方法 中
		//参数1： 抛出的异常对象
		//返回到什么页面
		@ExceptionHandler
		@ResponseBody
		public AppResult exceptionHandler(Exception ex,HttpServletRequest request) {
			ex.printStackTrace();
			AppResult result =null;
			if(ex instanceof AppExcption) {
				AppExcption ex1 = (AppExcption) ex;
				result = new AppResult(ex1.getKeyCode(), ex1.getMessage(), null);
				//request.setAttribute("errmsg", ex.getMessage());  //AuthorizationException
			}else if(ex instanceof UnknownAccountException){
				result = new AppResult(301, "账户不存在", null);
			}else if(ex instanceof IncorrectCredentialsException){
				result = new AppResult(302, "密码错误", null);
			}else if(ex instanceof AuthorizationException){
				result = new AppResult(302, "没有此操作权限", null);
			}else {
				//request.setAttribute("errmsg", "未知错误");
				result = new AppResult(500, "未知错误，请联系管理员", null);
			}
			return result;
		}

}
