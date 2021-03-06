import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ArticleFullPage from '../../src/components/article/';

const defaultProps = {
  articleContent: {
    name: 'name',
    sections: [{
      image: 'image',
      title: 'title',
      text: 'text'
    }, {
      image: 'image2',
      title: 'title2',
      text: 'text2'
    }],
    geo: [{label: 'Spain'}],
    amenities: [{label: 'Wifi'}]
  },
  backToSearch: () => {},
  getArticle: () => {},
  params: {}
};

describe('Component', function () {
  describe('<ArticleFullPage /> Article view', function () {
    it('should render the ISearch container', function (done) {
      global.dataLayer = [];
      const wrapper = shallow(<ArticleFullPage {...defaultProps} />);
      const children = wrapper.children().nodes;
      expect(children).to.have.length(2);
      done();
    });
    it('should render a empty section if there is no article name', function (done) {
      global.dataLayer = null;
      const props = {...defaultProps, articleContent: {}};
      const wrapper = shallow(<ArticleFullPage {...props} />);
      const children = wrapper.children().nodes;
      expect(children).to.have.length(0);
      done();
    });
  });
});
