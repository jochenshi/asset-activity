import React, {Component} from 'react'
import './optionSet.styl'
import axios from 'axios'

class OptionSet extends Component {
	constructor (props) {
		super(props);
		this.state = {
			childrendata: [
				{ }
			],
			parentdata: [
		    	{ children : [] }
			],
			currentIndex : 0
		}
		this.getSelectData();
	}

	getSelectData(){
		axios.get('/am/select')
		.then((res)=>{
			if(res && res.data){
				let parent = [], verifyStr = [];
				res.data.map((item) => {
					let index = verifyStr.indexOf(item.code);
					if(index < 0){
						verifyStr.push(item.code);
						parent.push({code : item.code, name : item.name, children : []});
						index = verifyStr.length - 1;
					}
					parent.children.push({ text : item.text, value : item.value});
				});
				if(!parent.length){
					parent = [{ children : [] }]
				}
				this.setState({
					parentdata : parent,
					childrendata : parent[0]['children']
				});
			}
		})
		.catch((err)=>{
			console.log(err);
		});
	}
	
	saveParentClick(code,e){
		let spans = this.refs[code].children;
		let v_code = spans[0].innerText;
		let v_name = spans[1].innerText;
		var d_error = this.refs['parent_error']
		console.log(v_code,v_name);
		if(!this.verifySelect(v_code,v_name,d_error)) return;
		axios.get('/am/select/verifySelect?code='+v_code+'&name='+v_name)
		.then((res)=>{
			this.setState({
				childrendata: [{}]
			});
		})
		.catch((err)=>{
			console.log(err);
		});
	}
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
	saveClick(e){
		console.log(this,e);
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
	        {this.state.parentdata.map((post) =>
				<li key={post.code || 'addP'} ref={post.code||'add'}>
					{ post.code ? <span>{post.code}</span> : <span contentEditable={true}></span> }
	                { post.name ? <span>{post.name}</span> : <span contentEditable={true}></span> }
					{ post.code ? <span><a>查看</a></span> : <span><a onClick={this.saveParentClick.bind(this,post.code||'add')}>保存</a></span> }
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
							<li key={post.value || 'addC'}  ref={post.code||'addC'}>
								{ post.text ? <span>{post.text}</span> : <span contentEditable={true}></span> }
	                			{ post.value ? <span>{post.value}</span> : <span contentEditable={true}></span> }
								{ post.value ? <span><a>查看</a></span> : <span><a onClick={this.saveClick.bind(this,post.value||'add')}>保存</a></span> }
							</li>
						)}
						</ul>
					</div>
				</section>
            </div>
        )
    }
}

export default OptionSet