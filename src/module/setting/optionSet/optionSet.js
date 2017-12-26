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
		axios.get('/am/select/title')
		.then((res)=>{
			if(res.data){
				let parent = [];
				Object.keys(res.data).forEach((item)=>{
					parent.push({code:item,name:res.data[item]});
				});
				if(!parent.length||!this.code){
					this.setCurSelect('','');
				}
                this.setState({
                    parentdata : parent
                });
			}
		})
		.catch((err)=>{
			this.refs['parent_error'].innerText = err.error || err.message;
		});
	}


	/*点击实际选择项的保存按钮*/
	saveClick(value,e){
		console.log(this,e);
		let spans = this.refs[value].children;
		let v_text = spans[0].innerText;
		let v_value = spans[1].innerText;
		let v_type = spans[3].innerText;
		var d_error = this.refs['child_error']
		console.log(v_text,v_value);
		if(!this.verifySelectItem(v_text,v_value,d_error)) return;
		axios.post('/am/select',{
			text: v_text,
			value: v_value,
			type : v_type,
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
	showChildren(code,name,e){
        axios.get('/am/select/'+code)
            .then((res)=>{
                if(res.data){
                    let children = res.data;
                    children.push({});
                    this.setState({
                        childrendata : children
                    });

                    this.clearErrorDom();

                    this.toggleSelectedClass(this.curCode,code);

                    this.setCurSelect(code,name);
                }
            })
            .catch((err)=>{
                this.refs['parent_error'].innerText = err.error || err.message;
            });
	}

	/*切换被选择的条目样式*/
	toggleSelectedClass(ocode,tcode){
		let d_selected = this.refs[ocode];
		d_selected.classList.remove(this.selectedClass);
		this.refs[tcode].classList.add(this.selectedClass);
	}

	/*清空添加内容*/
	clearAddDom(){
		let d_cspans = this.refs['addC'].childNodes;
		d_cspans[0].innerText = '';
		d_cspans[1].innerText = '';
        d_cspans[3].innerText = '';
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
			this.showChildren(this.curCode,this.curName);
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
        let v_type = spans[2].innerText;
		axios.put('/am/select',{
			id: id,
			code: this.curCode,
			name: this.curName,
			type: v_type,
			value: v_value,
			text: v_text
		})
		.then((res)=>{
			this.showChildren(this.curCode,this.curName);
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
								<li data-index={i} key={post.code} ref={post.code} className={post.code===this.curCode?this.selectedClass:''}>
									<span>{post.code}</span>
					                <span>{post.name}</span>
									<span><a onClick={this.showChildren.bind(this,post.code,post.name)}>查看</a></span>
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
						<span>标签</span>
						<span>操作</span>
					</header>
					<div ref={'select_child'}>
						<ul>
						{this.state.childrendata.map((post) => 
							<li key={post.id || 'addC'}  ref={post.id ? ('select_' + post.id) : 'addC'}>
								{ post.text ? <span contentEditable={true}>{post.text}</span> : <span contentEditable={true}></span> }
	                			{ post.value ? <span contentEditable={true}>{post.value}</span> : <span contentEditable={true}></span> }
                                { post.type ? <span contentEditable={true}>{post.type}</span> : <span contentEditable={true}></span> }
								{ post.value ?
									<span><a onClick={this.updateSelectItem.bind(this,post.id)}>保存</a>
										{ post.delable ? <i>|</i> : '' }
										{ post.delable ? <a onClick={this.deleteItemClick.bind(this,post.id)}>删除</a>:'' }</span> :
									<span><a onClick={this.saveClick.bind(this,post.value||'addC')}>保存</a></span> }
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