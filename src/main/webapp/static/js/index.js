//整个窗体的管理类
var windowManage = {
	//窗口初始化的方法
	initWindow:function(){
		//1 弹出欢迎框
		$.messager.show({
			title:'系统消息',
			msg:'欢迎'+$("#spuser").text()+' 登陆',
			timeout:5000,
			showType:'fade',
			closable:true
		});
		
		//2 查询当前用户的权利菜单的集合
		$.post("user/createmenu",null,function(jsonObj){
			//遍历的是爸爸id=0  最上层的菜单
			$(jsonObj.data).each(function(index,right){
				var content = "";
				$(right.child).each(function(index,obj){
					content+='<p class="pitem"><a class="easyui-linkbutton" data-options="plain:true" href="'+obj.righturl+'">'+obj.righttext+'</a></p>';
				})
				if(index==0){
					$('#divacd').accordion('add', {
						title: right.righttext,
						content: content,
						selected: true
					});
				}else{
					$('#divacd').accordion('add', {
						title: right.righttext,
						content: content,
						selected: false
					});
				}
			})
		},"json");
		
		
		//事件的委培  爸爸 把事件委培给儿子
		$("#divacd").on("click","p.pitem a",function(event){
			event.preventDefault();
			if($("#cts").tabs('exists',$(this).text())==false){
				$("#cts").tabs("add",{
					title: $(this).text(),
					selected: true,
					closable:true,
					content:'<iframe scrolling="no" frameborder="0"  src="'+this.href+'" style="width:100%;height:100%;"></iframe>'
				})
			}else{
				$("#cts").tabs("select",$(this).text());
			}
		})
		//事件的绑定
		
	}
}



//初始化窗体
windowManage.initWindow();



