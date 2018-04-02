var PropTypes = require('prop-types')
var React = require('react')

function removePrivateProps(input) {
  var blacklist = ['component']
  var output = {}

  for (var prop in input) {
    if (blacklist.indexOf(prop) === -1) {
      output[prop] = input[prop]
    }
  }

  return output
}

function StyledProxy(props) {
  var extraProps = {className: props.className}

  if (props.component) {
    return React.createElement(
      props.component,
      removePrivateProps(props),
      props.children
    )
  }

  if (props.children) {
    return React.Children.map(props.children, function(child) {
      return React.cloneElement(child, extraProps)
    })
  }

  return null
}

StyledProxy.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

module.exports = StyledProxy
