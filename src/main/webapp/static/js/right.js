//1 树形的管理类
var mtreeManage={
	//树的对象
	$mtree:$("#mtree"),
	//初始化树
	initTree:function(){
		mtreeManage.$mtree.tree({
			url:'user/createmenucurd',
			animate:true,
			lines:true,
			dnd:true,
			onContextMenu: function(e, node){
				e.preventDefault();
				// 选中点击的节点
				mtreeManage.$mtree.tree('select', node.target);
				// 显示快捷菜单
				mmManage.$mm.menu('show', {
					left: e.pageX,
					top: e.pageY
				});
			},
			//拖动之前触发的事件
			onBeforeDrag:function(node){
				//判断托送的节点 是否是一个 父亲节点 是 ：拒绝  否。。。。。
				if(mtreeManage.$mtree.tree('isLeaf',node.target)==false){
					return false;
				}
			},
			//target 放进去的目标节点 （）  source:被拖动的节点  node
			onDragEnter:function(target, source){
				var pnode = mtreeManage.$mtree.tree('getNode',target);
				//如果放进去的节点 是一个儿子节点 拒绝
				if(mtreeManage.$mtree.tree('isLeaf',target)==true){
					return false;
				}
				if(pnode.id==0){
					return false;
				}
				//把拖动更新到数据库
				$.post('user/updateRightDnd',{"rightid":source.id,"parentid":pnode.id},function(jsonData){
					$.messager.alert("system",jsonData.message,'info');
				},"json");
			}

		});
	},
	//刷新树的方法
	reloadTree:function(){
		$.post('user/createmenucurd',null,function(jsonDate){
			mtreeManage.$mtree.tree('loadData',jsonDate);
		},'json');
		
	}
}

//2 弹出的menu的管理类
var mmManage={
	$mm:$("#mm"),
	//点击添加
	add:function(){
		//1 判断点击的树上的节点 是不是子节点
		var cnode = mtreeManage.$mtree.tree('getSelected');
		//2 是子节点 就浸膏 
		if(mtreeManage.$mtree.tree("isLeaf",cnode.target)){
			$.messager.alert('system','子节点不能有下级','info');
			return;
		}
		//3 不是 弹出 form
		myDialogManage.$myDialog.dialog('open');
		//3.1 修改form的title
		myDialogManage.$myDialog.dialog('setTitle','添加小窗口');
		//3.2 清空信息
		myDialogManage.$myDialog.form('clear');
		//3.3 设置父节点
		$("#rightparent").textbox('setValue',cnode.text);
		$("#parentid").val(cnode.id);
		
		//3.4 判断是否取消烟瘴
		$("#righturl").textbox('enableValidation');
		if(cnode.id==0){
			$("#righturl").textbox('disableValidation');
		}
	},
	//点击修改
	edit:function(){
		//0.1 活儿当前的节点
		var cnode = mtreeManage.$mtree.tree('getSelected');
		//0.2 获得当前节点的爸爸节点
		var pnode = mtreeManage.$mtree.tree('getParent',cnode.target);
		//1 弹出form
		myDialogManage.$myDialog.dialog('open');
		//2 修改title
		myDialogManage.$myDialog.dialog('setTitle','更新小窗口');
		//3 清空信息
		myDialogManage.$myDialog.form('clear');
		//4 设置值
		$("#rightid").val(cnode.id);
		$("#righturl").textbox('setValue',cnode.attributes.url);
		$("#righttext").textbox('setValue',cnode.text);
		
		$("#rightparent").textbox('setValue',pnode.text);
		$("#parentid").val(pnode.id);
		
		//3.4 判断是否取消烟瘴
		$("#righturl").textbox('enableValidation');
		if(pnode.id==0){
			$("#righturl").textbox('disableValidation');
		}
		
	},
	//点击删除
	remove:function(){
		
	}
}

//3 弹出的form的管理类
var myDialogManage={
	$myDialog:$("#myDialog"),
	//初始化form
	initForm:function(){
		myDialogManage.$myDialog.dialog({    
		    title: '添加和修改窗口',    
		    width: 400,    
		    height: 250,    
		    closed: true,    
		    cache: false,    
		    modal: true,
		    footer:"#divedit"
		});  
	},
	//初始化输入框
	initInput:function(){
		//渲染
		$("#righttext").textbox({
			iconCls:'icon-man',
			validType:"remote['user/checkrightname','righttext']",
			invalidMessage:'该名字已经存在',
			delay:500,
			required:true
		});
		$("#righturl").textbox({
			iconCls:'icon-man',
			required:true
		});
		$("#rightparent").textbox({
			iconCls:'icon-man',
			readonly:true
		})
	},
	//点击ok
	clickOk:function(event){
		event.preventDefault();
		myDialogManage.$myDialog.form('submit', {    
		    url:'user/saveorupdateright', 
		    onSubmit: function(){    
		        return   myDialogManage.$myDialog.form('validate');
		    },
		    success:function(data){
		    	//把json 字符串转成  json对象
		    	var jsonObj = JSON.parse(data);
		        $.messager.alert('system',jsonObj.message,'info'); 
		        myDialogManage.$myDialog.dialog('close');
		        //刷新树
		        mtreeManage.reloadTree();
		        
		    }    
		});  
	},
	//点击取消
	clickCancel:function(event){
		event.preventDefault();
		myDialogManage.$myDialog.dialog('close');
	}
	
}

//4 整个窗体的管理类
var windowManage={
	//初始化整个窗体
	initWindow:function(){
		//初始书
		mtreeManage.initTree();
		//初始化form
		myDialogManage.initForm();
		//初始化 input
		myDialogManage.initInput();
	}
}

windowManage.initWindow();