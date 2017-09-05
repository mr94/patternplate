import React, {Component} from 'react';

export default class ClickOutside extends Component {
	constructor(props) {
		super(props);
		this.getContainer = this.getContainer.bind(this);
	}

	getContainer(ref) {
		this.container = ref;
	}

	render() {
		return <div className={this.props.className} ref={this.getContainer}>{this.props.children}</div>;
	}

	componentDidMount() {
		global.document.addEventListener('click', this.handle, true);
	}

	componentWillUnmount() {
		global.document.removeEventListener('click', this.handle, true);
	}

	handle = e => {
		const {onClickOutside} = this.props;
		const el = this.container;
		if (!el.contains(e.target)) {
			onClickOutside(e);
		}
	};
}
