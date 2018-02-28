import React from 'react';
interface props {
  initParams: Object;
  children: (Object) => {};
  fetch: (Object) => Promise<any>;
}
interface state {
  params: Object;
  loading: boolean;
  listData: Object;
}
class ListWrap extends React.Component {
  state: state;
  props: props;
  constructor(props) {
    super(props);
    this.state = {
      params: props.initParams,
      loading: false,
      listData: undefined,
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.fetch({ body: this.props.initParams }).then(value => {
      this.setState({ listData: value, loading: false });
    });
  }
  changeParams = params => {
    this.setState({ loading: true });
    const body = Object.assign({}, this.state.params, params);
    this.setState({ params: body });
    this.props.fetch({ body }).then(value => {
      this.setState({ listData: value, loading: false });
    });
  };
  changePageSize = (pageNo, pageSize) => {
    this.changeParams({
      pageNo,
      pageSize,
    });
  };
  changePageNo = pageNo => {
    this.changeParams({
      pageNo,
    });
  };
  render() {
    const props = {
      changeParams: this.changeParams,
      changePageSize: this.changePageSize,
      changePageNo: this.changePageNo,
      ...this.state,
    };
    return this.props.children(props);
  }
}

export default ListWrap;
