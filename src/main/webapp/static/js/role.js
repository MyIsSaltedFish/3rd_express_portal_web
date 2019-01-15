//1 表格管理类
var dgManage = {
	$dg : $('#dg'),
	// 初始化表格
	initDg : function() {
		dgManage.$dg.datagrid({
			url : 'user/findrolebyinput',
			fitColumns : true,
			scrollbarSize : 0,
			rownumbers : true,
			toolbar:'#dgts',
			columns : [ [ {
				field : 'roleid',
				title : '角色id',
				width : 1,
				checkbox : true
			}, {
				field : 'rolename',
				title : '角色名称',
				width : 1
			} , {
				field : 'rightNames',
				title : '拥有的权限',
				width : 10,
				formatter:function(value,row,index){
					/*if(row.roleid==1){
						return "<strong>[" + value + "]</strong>";
					}
					return "[" + value + "]";*/
					return "<strong>[" + value + "]</strong>";
				}
			}] ],
			pagination : true,
			pageSize : 3,
			pageList : [ 3, 5, 10, 20 ],
			fit : true
		});
	}
}

// 2 表格工具栏管理类
var dgtsManager={
	//查询
	search:function(event){
		event.preventDefault();
		dgManage.$dg.datagrid('load', {    
			'rolename':$('#rname').val()
		});  

	},
	//添加
	add:function(event){
		//1 弹出窗体
		//2 设置标题
		ffManage.$ff.dialog('open');
		ffManage.$ff.dialog('setTitle','添加窗口');
		//3.3 设置下拉树
		ffManage.initTree(-1);
	},
	//修改
	upd:function(event){
		var rows = dgManage.$dg.datagrid('getChecked');
		if(rows.length!=1){
			$.messager.alert('system','请选中并且只选中一行','info');
			return;
		}
		//1 弹出窗体
		//2 设置标题
		ffManage.$ff.dialog('open');
		ffManage.$ff.dialog('setTitle','更新窗口');
		//3 设置值
		//获得datagrid 中选中的航对象
		var row = rows[0];
		//3.1 设置id
		$('#roleid').val(row.roleid);
		//3,2 设置角色名称
		$("#roletext").textbox('setValue',row.rolename);
		//3.3 设置下拉树
		ffManage.initTree(row.roleid);
		
	},
	//删除
	del:function(event){
		event.preventDefault();
		//1 获得选中的行
		var rows = dgManage.$dg.datagrid('getChecked');
		//2 判断是否有选中的行
		if(rows.length<=0){
			$.messager.alert('system','请至少选中一行','info');
			retrun;
		}
		//2.1 ng-->提示 退出
		$.messager.confirm('确认对话框', '您想要删除吗？', function(r){
			if (r){
			    // 删除操作;
				var roleids = '';
				for(var i=0;i<rows.length;i++){
					if(i==rows.length-1){
						roleids = roleids + rows[i].roleid;
					}else{
						roleids = roleids + rows[i].roleid+','
					}
					
				}
				//alert(roleids);
				$.post('user/delrolesbychecked',{'roleids':roleids},function(jsonobj){
					
				},"json");
			}else{
				//2.3 有  提示--cancel--》退出
				return ;
			}
		});


		//2.2 有  提示--ok--》删除
		
	}

}

// 3 弹出的form
var ffManage={
	$ff:$('#ff'),
	//点击ok
	clickOk:function(event){
		event.preventDefault();
		ffManage.$ff.form('submit', {    
		    url:'user/saveorupdaterole',    
		    success:function(data){
		    	//把json 字符串转成  json对象
		    	var jsonObj = JSON.parse(data);
		        $.messager.alert('system',jsonObj.message,'info'); 
		        if($('#roleid').val()==null || $('#roleid').val()==''){
		        	//在当前页的首行添加新航
		        	dgManage.$dg.datagrid('insertRow',{
		        		index: 0,	// 索引从0开始
		        		row: {
		        			roleid:jsonObj.data.roleid,
		        			rolename:jsonObj.data.rolename,
		        			rightNames:windowManage.rightnames
		        		}
		        	});
		        	
		        	//高亮选中新航
		        	dgManage.$dg.datagrid('highlightRow',0);
		        	

		        }else{
		        	//获得当前选中行的行号
		        	var crows = dgManage.$dg.datagrid('getChecked');
		        	var index = dgManage.$dg.datagrid('getRowIndex',crows[0]);
		        	dgManage.$dg.datagrid('updateRow',{
		        		index: index,
		        		row: {
		        			roleid:jsonObj.data.roleid,
		        			rolename:jsonObj.data.rolename,
		        			rightNames:windowManage.rightnames
		        		}
		        	});


		        }
		        ffManage.$ff.dialog('close');
		        
		    }    
		});  
	},
	//点击取消
	clickCancel:function(event){
		event.preventDefault();
		ffManage.$ff.dialog('close');
	},
	initFf:function(){
		//把form 渲染成 dialog
		ffManage.$ff.dialog({    
		    title: '添加和修改窗口',    
		    width: 400,    
		    height: 250,    
		    closed: true,    
		    cache: false,    
		    modal: true,
		    footer:"#divedit"
		});  
	},
	//根据角色id 渲染 form中的下拉树
	initTree:function(roleid){
		$('#rights').combotree({    
		    url: 'user/createmenuforcurd?roleid='+roleid,    
		    checkbox:true,
		    multiple:true,
		    cascadeCheck:false,
		    onLoadSuccess:function(node, data){
		    	//获得下拉树菜单中的树控件
		    	var $tree = $('#rights').combotree('tree');
		    	$tree.tree('expandAll');
			},
			onCheck:function(node,checked){
				var $tree = $('#rights').combotree('tree');
				//获得当前节点的父亲节点
				var pnode = $tree.tree('getParent',node.target);
				//获得当前节点的儿子节点的集合
				var cnodes = $tree.tree('getChildren',node.target);
				//如果勾选的是父亲
				if($tree.tree('isLeaf',node.target)==false){
					for(var i=0;i<cnodes.length;i++){
						$tree.tree('update',{
							target: cnodes[i].target,
							checked: checked
						});
					}
				}else{//如果勾选的是儿子
					if(checked){
						$tree.tree('update',{
							target: pnode.target,
							checked: true
						});
					}else{
						//获得兄弟 就是爸爸的儿子
						var xdnodes = $tree.tree('getChildren',pnode.target);
						//爸爸取消选中
						var flag = false;
						for(var i=0;i<xdnodes.length;i++){
							if(xdnodes[i].checked==true){
								flag = true;
								break;
							}
						}
						$tree.tree('update',{
							target: pnode.target,
							checked: flag
						});
					}
				}
				
				//清空全局变量windowManage。rightnames  rightids
				windowManage.rightnames = '';
				windowManage.rightids = new Array();
				//获得当前书上面 所有被勾选节点
				var cnodes = $tree.tree('getChecked');
				for(var i=0;i<cnodes.length;i++){
					windowManage.rightids.push(cnodes[i].id);
					if(i==cnodes.length-1){
						windowManage.rightnames+=cnodes[i].text;
					}else{
						windowManage.rightnames+=cnodes[i].text+',';
					}
				}
				//alert(windowManage.rightnames);
				//alert(windowManage.rightids);
				$('#rights').combotree('setText',windowManage.rightnames);
				$('#rights').combotree('setValue',windowManage.rightids);
			}
		});  
	}
}

// 4 整个窗口
var windowManage={
	//此时下拉树上选中节点的文本
	rightnames:'',
	rightids:null,
	initWindow:function(){
		//初始化表格
		dgManage.initDg();
		//初始化 dialog
		ffManage.initFf();
	}
}

windowManage.initWindow();
