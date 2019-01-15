<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=request.getContextPath()+'/'%>">
<meta charset=UTF-8">
<title>管理承包区/调度排班</title>
<!-- 导入jquery核心类库 -->
<link rel="stylesheet" type="text/css" href="static/easyui15/themes/bootstrap/easyui.css">
<link rel="stylesheet" type="text/css" href="static/easyui15/themes/icon.css">
<script type="text/javascript" src="static/easyui15/jquery.min.js"></script>
<script type="text/javascript" src="static/easyui15/jquery.easyui.min.js"></script>
<script type="text/javascript" src="static/easyui15/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
	$(function(){
		$("body").css({visibility:"visible"});
		
		// 对save按钮条件 点击事件
		$('#save').click(function(){
			// 对form 进行校验
			if($('#noticebillForm').form('validate')){
				$('#noticebillForm').form('submit', {    
				    url:'qp/add',    
				    onSubmit: function(){    
				        // do some check    
				        // return false to prevent submit;    
				    },    
				    success:function(data){    
				    	var jsonobj = JSON.parse(data);
				    	/*$.messager.alert('system',jsonobj.message,'info'); */
				    	alert(jsonobj.message);
				    }    
				}); 
			}
		});
	});
</script>
</head>
<body class="easyui-layout" style="visibility:hidden;">
	<div region="north" style="height:31px;overflow:hidden;" split="false"
		border="false">
		<div class="datagrid-toolbar">
			<a id="save" icon="icon-save" href="javascript:void(0);" class="easyui-linkbutton"
				plain="true">提交</a>
		</div>
	</div>
	<div region="center" style="overflow:auto;padding:5px;" border="false">
		<form id="noticebillForm" action="qp/add" method="post">
			<table class="table-edit" width="100%" align="center">
				<tr class="title">
					<td colspan="4" style="font-weight: bolder;">客户信息</td>
				</tr>
				<tr>
					<td>来电号码:</td>
					<td><input type="text" class="easyui-validatebox" name="telephone" required="true" />
						<script type="text/javascript">
							$(function(){
								//页面加载完成后，为手机号输入框绑定离焦事件
								$("input[name=telephone]").blur(function(){
									//获取页面输入的手机号
									var telephone = this.value;
									//发送ajax请求，请求Action，在Action中远程掉调用crm服务，获取客户信息，用于页面回显
									$.post('cus/findcustbyphone',{"phone":telephone},function(data){
										if(data != null){
											//查询到了客户信息，可以进行页面回显
											var customerId = data.id;
											var customerName = data.name;
											var address = data.address;
											$("input[name=customerId]").val(customerId);
											$("input[name=customerName]").val(customerName);
											$("input[name=delegater]").val(customerName);
											$("input[name=pickaddress]").val(address);
											$("input[name=dzid]").val(data.decidedzoneId);
										}else{
											//没有查询到客户信息，不能进行页面回显
											$("input[name=customerId]").val("");
											$("input[name=customerName]").val("");
											$("input[name=delegater]").val("");
											$("input[name=pickaddress]").val("");
											$("input[name=dzid]").val("");
										}
									});
								});
							});
						</script>	
					</td>
					<td>客户编号:</td>
					<td><input type="text" class="easyui-validatebox"  name="customerId"
						 /></td>
				</tr>
				<tr>
					<td>客户姓名:</td>
					<td><input type="text" class="easyui-validatebox" name="customerName"
						 /></td>
					<td>联系人:</td>
					<td><input type="text" class="easyui-validatebox" name="delegater"
						 /></td>
				</tr>
				<tr class="title">
					<td colspan="4" style="font-weight: bolder;">货物信息</td>
				</tr>
				<tr>
					<td>品名:</td>
					<td><input type="text" class="easyui-validatebox" name="product"
						 /></td>
					<td>件数:</td>
					<td><input type="text" class="easyui-numberbox" name="num"
						 /></td>
				</tr>
				<tr>
					<td>重量:</td>
					<td><input type="text" class="easyui-numberbox" name="weight"
						 /></td>
					<td>体积:</td>
					<td><input type="text" class="easyui-validatebox" name="volume"
						 /></td>
				</tr>
				<tr>
					<td>取件地址</td>
					<td colspan="3"><input type="text" class="easyui-validatebox" name="pickaddress"
						required="true" size="144"/></td>
				</tr>
				<tr>
					<td>到达城市:</td>
					<td><input type="text" class="easyui-validatebox" name="arrivecity"
						 /></td>
					<td>预约取件时间:</td>
					<td><input type="text" class="easyui-datebox" name="pickdate"
						data-options="editable:false" /></td>
				</tr>
				<tr>
					<td>备注:</td>
					<td colspan="3"><textarea rows="5" cols="80" type="text" class="easyui-validatebox" name="remark"
						 ></textarea></td>
				</tr>
				
			</table>
			<!-- 承包区id -->
			<input type="hidden" name="dzid"/>
		</form>
	</div>
</body>
</html>