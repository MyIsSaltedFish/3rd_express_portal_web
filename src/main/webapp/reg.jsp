<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<base href="<%=request.getContextPath()+'/'%>">
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="static/easyui15/themes/bootstrap/easyui.css">
<link rel="stylesheet" type="text/css" href="static/easyui15/themes/icon.css">
<script type="text/javascript" src="static/easyui15/jquery.min.js"></script>
<script type="text/javascript" src="static/easyui15/jquery.easyui.min.js"></script>
<script type="text/javascript" src="static/easyui15/locale/easyui-lang-zh_CN.js"></script>
</head>
<body>
<h2>注册页面</h2>
<form id="frm01">
	<div style="width: 300px;text-align: center;">
		<p>
			<hr/>
			姓 名:<input type="text" name="name" class="easyui-textbox" data-options="iconCls:'icon-search'" style="width:300px"/><br>
		</p>
		<p>
			<hr/>
			手 机:<input type="text" name="telephone" class="easyui-textbox" data-options="iconCls:'icon-search'" style="width:300px"/><br>
		</p>
		<p>
			<hr/>
			验证码:<input type="text" name="checkcode" class="easyui-textbox" data-options="iconCls:'icon-reload'" style="width:300px"/><br>
			<a href="javascript:void(0);" id="ga" class="easyui-linkbutton">获得验证码</a><br>
		</p>
		<p>
			<hr/>
			地 址:<input type="text" name="address" class="easyui-textbox" data-options="iconCls:'icon-search'" style="width:300px"/><br>
		</p>
		<p>	
			<hr/>
			<a href="javascript:void(0);" id="areg" class="easyui-linkbutton" data-options="iconCls:'icon-save'" style="float: left: 0px;">注册</a>&nbsp;&nbsp;
			<a href="http://localhost:8085/jj.jsp" class="easyui-linkbutton" data-options="iconCls:'icon-world'" style="float: left: 50px;">寄件</a>
			<hr/>
		</p>
	</div>
</form>
<script type="text/javascript" src="static/easyui15/jquery.min.js"></script>
<script type="text/javascript">
	$("#ga").on("click",function(){
		var phone = $(":text[name='telephone']").val();
		$.post("cus/checkcode",{"phone":phone},function(jsonData){
			
		},"json");
	})
	
	$("#areg").on("click",function(){
		$.post("cus/reg",$("#frm01").serialize(),function(jsonData){
			alert(jsonData.message);
			if(jsonData.keyCode==200){
				  window.location.href="http://localhost:8085/jj.jsp";
			}
		},"json");
	})
</script>
</body>
</html> 