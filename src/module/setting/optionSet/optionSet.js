import React, {Component} from 'react'
import './optionSet.styl'

const parentdata = [
	{ code : 'S0001', name : '类型'},
    { code : 'S0002', name : '品牌'},
	{ }
]

const sidebar = (
	<ul>
        {parentdata.map((post) =>
			<li>
				{ post.code ? <span>{post.code}</span> : <span  contentEditable={true}></span> }
                { post.name ? <span>{post.name}</span> : <span  contentEditable={true}></span> }
				{ post.code ? <span><a>查看</a></span> : <span><a>保存</a></span> }
			</li>
        )}
	</ul>
);


class OptionSet extends Component {
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
						{sidebar}
            		</div>
            	</aside>
            	<section className="select-child">
					<header>
						<span>选项文本</span>
						<span>选项值</span>
						<span>操作</span>
					</header>
					<div>
						<ul>
							<li>
								<span contentEditable={true}></span>
								<span contentEditable={true}></span>
								<span><a>保存</a><i>|</i><a>删除</a></span>
							</li>
						</ul>
					</div>
				</section>
            </div>
        )
    }
}

export default OptionSet