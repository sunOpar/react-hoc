import React from 'react';
import List from '../index.tsx';
import { mount } from 'enzyme';

const Child = () => {
  return <div className="a">a</div>;
};
class Demo extends React.Component {
  render() {
    return <List {...this.props}>{props => <Child {...props} />}</List>;
  }
}
function fetch({ body }) {
  return Promise.resolve(body);
}
describe('List component', () => {
  test('render correct children', () => {
    const props = {
      fetch() {
        return Promise.resolve();
      },
    };
    const wrapper = mount(<Demo {...props} />);
    expect(wrapper.find('.a')).toHaveLength(1);
  });
  test('methods', done => {
    const initParams = { a: 1 };
    const props = {
      fetch,
      initParams,
    };
    const wrapper = mount(
      <List {...props}>{props => <Child {...props} />}</List>,
    );
    expect(wrapper.find(Child).props().params).toEqual(initParams);

    const child = wrapper.find(Child);
    child.props().changeParams({ a: 2, b: 3 });
    child.props().changePageSize(2, 5);
    child.props().changePageNo(1)
    setTimeout(() => {
      expect(wrapper.state().listData).toEqual({
        a: 2,
        b: 3,
        pageNo: 1,
        pageSize: 5,
      });
      done();
    }, 0);
  });
});
