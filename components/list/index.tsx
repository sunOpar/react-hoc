import React from 'react';
interface props {
  initParam: Object;
  children: (Object) => {};
  fetch: (Object) => Promise<any>;
}
interface state {
  params: Object;
  loading: boolean;
}
class ListWrap extends React.Component {
  state: state;
  props: props;
  constructor(props) {
    super(props);
    this.state = {
      params: props.initParams,
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.fetch({ body: this.props.initParam }).then(value => {
      this.setState({ ...value, loading: false });
    });
  }
  changeParam = params => {
    this.setState({ loading: true });
    const body = Object.assign({}, this.state.params, params);
    this.setState({ params: body });
    this.props.fetch({ body }).then(value => {
      this.setState({ ...value, loading: false });
    });
  };
  changePageSize = (pageNo, pageSize) => {
    this.changeParam({
      pageNo,
      pageSize,
    });
  };
  changePageNo = pageNo => {
    this.changeParam({
      pageNo,
    });
  };
  render() {
    const props = {
      changeParam: this.changeParam,
      changePageSize: this.changePageSize,
      changePageNo: this.changePageNo,
      ...this.state,
    };
    return <div>{this.props.children(props)}</div>;
  }
}

export default ListWrap;
