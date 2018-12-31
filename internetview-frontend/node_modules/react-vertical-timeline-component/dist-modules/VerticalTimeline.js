'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VerticalTimeline = function VerticalTimeline(_ref) {
  var animate = _ref.animate,
      children = _ref.children,
      className = _ref.className,
      layout = _ref.layout;
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(className, 'vertical-timeline', {
        'vertical-timeline--animate': animate,
        'vertical-timeline--two-columns': layout === '2-columns',
        'vertical-timeline--one-column': layout === '1-column'
      })
    },
    children
  );
};

VerticalTimeline.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired,
  className: _propTypes2.default.string,
  animate: _propTypes2.default.bool,
  layout: _propTypes2.default.oneOf(['1-column', '2-columns'])
};

VerticalTimeline.defaultProps = {
  animate: true,
  className: '',
  layout: '2-columns'
};

exports.default = VerticalTimeline;