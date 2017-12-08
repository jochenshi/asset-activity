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
			if(res.data && res.data.length){
				let parent = [], verifyStr = [], selIndex = 0, children = [], nextCode = '';
				res.data.forEach((item) => {
					let index = verifyStr.indexOf(item.code);
					if(index < 0){
						verifyStr.push(item.code);
						parent.push({code : item.code, name : item.name, children : []});
						index = verifyStr.length - 1;
					}
					parent[index].children.push({ id : item.id, text : item.text, value : item.value});
				});

				if(!parent.length || !this.curCode || verifyStr.indexOf(this.curCode) < 0){
					this.setCurSelect('','');
				}else{
					selIndex = verifyStr.indexOf(this.curCode);
					this.curName = parent[selIndex]['name'];
					children = parent[selIndex]['children'].map((item)=>item);
					children.push({});
				}

				nextCode = this.generateNextCode(verifyStr);

				if(nextCode!=='full'){
					parent.push({children: []});
				}

				this.setState({
					parentdata : parent,
					childrendata : children
				});

				if(nextCode!=='full'){
					this.refs['addP'].childNodes[0].innerText = this.generateNextCode(verifyStr);
				} 
			}
		})
		.catch((err)=>{
			this.refs['parent_error'].innerText = err.error || err.message;
		});
	}

	/*自动生成下一个code*/
	generateNextCode(codes){
		let nextCode = '', value = 0;
		if(!codes.length){
			nextCode = 'S0001';
		}else{
			let length = codes.sort().length;
			while(length){
				let code = codes[codes.length - length];
				let num = parseInt(code.match(/[1-9]\d*/)[0]);
				value++;
				if(value!=num){
					break;
				}
				if(value==9999){
					nextCode = 'full';
					break;
				}
				length--;
				if(!length) value++;
			}
		}
		if(!nextCode){
			let len = 4 - value.toString().length;
			nextCode += 'S';
			while(len){
				nextCode += '0';
				len--;
			}
			nextCode += value;
		}
		
		return nextCode;
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
			this.refs['addC'].childNodes[0].focus();
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
		axios.post('/am/select',{
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

		this.toggleSelectedClass(this.curCode,code);

		this.setCurSelect(code,parent['name']);
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
	deleteItemClick(id,e){
		axios.delete('/am/select/'+id)
		.then((res)=>{
			this.getSelectData();
		})
		.catch((err)=>{
			this.refs['child_error'].innerText = err.error || err.message;
		});
	}

	/*删除某选择项的所有条目*/
	deleteSelect(code,e){
		axios.delete('/am/select?code='+code)
		.then((res)=>{
			this.getSelectData();
		})
		.catch((err)=>{
			this.refs['child_error'].innerText = err.error || err.message;
		});
	}

	/*更新某条选择条目*/
	updateSelectItem(id,e){
		let spans = this.refs['select_'+id].childNodes;
		let v_text = spans[0].innerText;
		let v_value = spans[1].innerText;
		axios.put('/am/select',{
			id: id,
			code: this.curCode,
			name: this.curName,
			value: v_value,
			text: v_text
		})
		.then((res)=>{
			this.getSelectData();
		})
		.catch((err)=>{
			let txt = '';
			if(err.code === 13000){
				txt = '值未更改或已存在相同值';
			}
			this.refs['child_error'].innerText = txt || err.message;
		});
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
							<li key={post.id || 'addC'}  ref={post.id ? ('select_' + post.id) : 'addC'}>
								{ post.text ? <span contentEditable={true}>{post.text}</span> : <span contentEditable={true}></span> }
	                			{ post.value ? <span contentEditable={true}>{post.value}</span> : <span contentEditable={true}></span> }
								{ post.value ? <span><a onClick={this.updateSelectItem.bind(this,post.id)}>保存</a><i>|</i><a onClick={this.deleteItemClick.bind(this,post.id)}>删除</a></span> : <span><a onClick={this.saveClick.bind(this,post.value||'addC')}>保存</a></span> }
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