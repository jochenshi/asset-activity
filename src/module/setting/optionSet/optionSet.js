import React, {Component} from 'react'
import './optionSet.styl'
import axios from 'axios'

class OptionSet extends Component {
	curCode = '';
	curName = '';
	selectedClass = 'select-selected';
	constructor (props) {
		super(props);
		this.state = {
			childrendata: [
			],
			parentdata: [
		    	{ children : [] }
			]
		}
		this.getSelectData();
	}

	/*设置当前选择项的code和name*/
	setCurSelect(code,name){
		this.curCode = code;
		this.curName = name;
	}

	/*得到所有选择项并解析*/
	getSelectData(){
		axios.get('/am/select')
		.then((res)=>{
			if(res.data && res.data){
				let parent = [], verifyStr = [], selIndex = 0, children = [];
				res.data.forEach((item) => {
					let index = verifyStr.indexOf(item.code);
					if(index < 0){
						verifyStr.push(item.code);
						parent.push({code : item.code, name : item.name, children : []});
						index = verifyStr.length - 1;
					}
					parent[index].children.push({ text : item.text, value : item.value});
				});
				if(!parent.length){
					parent = [{ children : [] }];
					this.setCurSelect('','');
				}else{
					if(!this.curCode || verifyStr.indexOf(this.curCode) < 0){
						this.curCode = verifyStr[0];
					}
					selIndex = verifyStr.indexOf(this.curCode);
					this.curName = parent[selIndex]['name'];
					parent.push({children: []});
					children = parent[selIndex]['children'].map((item)=>item);
					children.push({});
				}
				this.setState({
					parentdata : parent,
					childrendata : children
				});
			}
		})
		.catch((err)=>{
			this.refs['parent_error'].innerText = err.error || err.message;
		});
	}
	
	/*点击选择项父标识的保存按钮*/
	saveParentClick(code,e){
		let spans = this.refs[code].children;
		let v_code = spans[0].innerText;
		let v_name = spans[1].innerText;
		var d_error = this.refs['parent_error']
		console.log(v_code,v_name);
		//做基本格式校验
		if(!this.verifySelect(v_code,v_name,d_error)) return;
		//做查看是否重复校验
		axios.get('/am/select/verifySelect?code='+v_code+'&name='+v_name)
		.then((res)=>{
			this.setState({
				childrendata: [{}]
			});
			this.toggleSelectedClass(this.curCode,code);
			this.setCurSelect(v_code,v_name);
		})
		.catch((err)=>{
			d_error.innerText = err.error || err.message;
		});
	}

	/*父标识的基本验证*/
	verifySelect(code , name, error){
		var flag = true;
		if(!code || !name){
			error.innerText = '代号或名称不能为空';
			flag = false;
		}else if(!new RegExp(/^S\d{4}$/).test(code)){
			error.innerText = '代号只能以S开头，后面跟4个数字';
			flag = false;
		}else{
			error.innerText = '';
		}
		return flag;
	}

	/*点击实际选择项的保存按钮*/
	saveClick(value,e){
		console.log(this,e);
		let spans = this.refs[value].children;
		let v_text = spans[0].innerText;
		let v_value = spans[1].innerText;
		var d_error = this.refs['child_error']
		console.log(v_text,v_value);
		if(!this.verifySelectItem(v_text,v_value,d_error)) return;
		axios.post('/am/select/add',{
			text: v_text,
			value: v_value,
			code: this.curCode,
			name: this.curName
		})
		.then((res)=>{
			this.clearAddDom();
			this.getSelectData();
		})
		.catch((err)=>{
			d_error.innerText = err.error || err.message;
		});
	}

	/*实际选择项保存时的基本验证*/
	verifySelectItem(text,value,error){
		var flag = true;
		if(!text || !value){
			error.innerText = '展示值或实际值不能为空';
			flag = false;
		}else if(!new RegExp(/^[_a-z][_a-zA-Z0-9]*$/).test(value)){
			error.innerText = '实际值只能包含数字、字母或下划线，不能以数字和大写字母开头';
			flag = false;
		}else{
			error.innerText = '';
		}
		return flag;
	}

	/*查看某类选项的所有可选项*/
	showChildren(index,code,e){
		let parent = this.state.parentdata[index];
		let children =parent['children'].map((item)=>item);
		children.push({});
		this.setState({
			childrendata : children
		});

		this.clearErrorDom();

		this.setCurSelect(code,parent['name']);

		this.toggleSelectedClass(this.curCode,code);
	}

	/*切换被选择的条目样式*/
	toggleSelectedClass(ocode,tcode){
		let d_selected = this.refs[ocode];
		if(!d_selected){
			d_selected = this.refs['addP'];
		}
		d_selected.classList.remove(this.selectedClass);
		this.refs[tcode].classList.add(this.selectedClass);
	}

	/*清空添加内容*/
	clearAddDom(){
		this.refs['addP'].classList.remove(this.selectedClass);
		let d_pspans = this.refs['addP'].childNodes;
		d_pspans[0].innerText = '';
		d_pspans[1].innerText = '';
		let d_cspans = this.refs['addC'].childNodes;
		d_cspans[0].innerText = '';
		d_cspans[1].innerText = '';
	}
	/*清空报错信息的文字*/
	clearErrorDom(){
		this.refs['parent_error'].innerText = '';
		this.refs['child_error'].innerText = '';
	}

	/*删除某选择项的某条值*/
	deleteItemClick(value,e){
		axios.post('/am/select/delete',{
			code: this.curCode,
			value: value
		})
		.then((res)=>{
			this.getSelectData();
		})
		.catch((err)=>{
			this.refs['child_error'].innerText = err.error || err.message;
		})
	}

	/*删除某选择项的所有条目*/
	deleteSelect(code,e){
		axios.post('/am/select/delete',{
			code: this.curCode
		})
		.then((res)=>{
			this.getSelectData();
		})
		.catch((err)=>{
			this.refs['child_error'].innerText = err.error || err.message;
		})
	}

    render () {
        return (
            <div className="select-manager">
            	<h1>选项管理</h1>
            	<aside className="select-parent">
            		<header>
						<span>代号</span>
						<span>选项名称</span>
						<span>操作</span>
            		</header>
            		<div>
						<ul>
					        {this.state.parentdata.map((post,i) =>
								<li data-index={i} key={post.code || 'addP'} ref={post.code||'addP'} className={post.code===this.curCode?this.selectedClass:''}>
									{ post.code ? <span>{post.code}</span> : <span contentEditable={true}></span> }
					                { post.name ? <span>{post.name}</span> : <span contentEditable={true}></span> }
									{ post.code ? <span><a onClick={this.showChildren.bind(this,i,post.code)}>查看</a><i>|</i><a onClick={this.deleteSelect.bind(this,post.code)}>删除</a></span> : <span><a onClick={this.saveParentClick.bind(this,post.code||'addP')}>保存</a></span> }
								</li>
					        )}
						</ul>
            		</div>
            		<p ref={'parent_error'} className="error-message"></p>
            	</aside>
            	<section className="select-child">
					<header>
						<span>选项文本</span>
						<span>选项值</span>
						<span>操作</span>
					</header>
					<div ref={'select_child'}>
						<ul>
						{this.state.childrendata.map((post) => 
							<li key={post.value || 'addC'}  ref={post.value||'addC'}>
								{ post.text ? <span contentEditable={true}>{post.text}</span> : <span contentEditable={true}></span> }
	                			{ post.value ? <span contentEditable={true}>{post.value}</span> : <span contentEditable={true}></span> }
								{ post.value ? <span><a>保存</a><i>|</i><a onClick={this.deleteItemClick.bind(this,post.value)}>删除</a></span> : <span><a onClick={this.saveClick.bind(this,post.value||'addC')}>保存</a></span> }
							</li>
						)}
						</ul>
					</div>
					<p ref={'child_error'} className="error-message"></p>
				</section>
            </div>
        )
    }
}

export default OptionSet