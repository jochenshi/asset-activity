import React, {Component} from 'react'
import './optionSet.styl'
import axios from 'axios'

class OptionSet extends Component {
	parentdata = 
	[
		{ code : 'S0001', name : '类型'},
    	{ code : 'S0002', name : '品牌'},
    	{ }
	]
	
	saveParentClick(code,e){
		let spans = this.refs[code].children;
		let v_code = spans[0].innerText;
		let v_name = spans[1].innerText;
		console.log(this.refs);
		var d_error = this.refs['parent_error']
		console.log(v_code,v_name);
		if(!v_code || !v_name){
			d_error.innerText = '代号或名称不能为空';
		}else{
			d_error.innerText = '';
		}
		axios.get('http://localhost:8088/am/select/verifySelect?code='+v_code+'&name='+v_name)
		.then((res)=>{

		})
		.catch((err)=>{
			console.log(err);
		});
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
	        {this.parentdata.map((post) =>
				<li key={post.code || 'add'} ref={post.code||'add'}>
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
							<li>
								<span contentEditable={true}></span>
								<span contentEditable={true}></span>
								<span><a onClick={this.saveClick}>保存</a><i>|</i><a>删除</a></span>
							</li>
						</ul>
					</div>
				</section>
            </div>
        )
    }
}

export default OptionSet