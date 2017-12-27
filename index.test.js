import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import StyledProxy from './'

Enzyme.configure({adapter: new Adapter()})

function styled(Component, className = 'generated') {
  return function StyledComponent(props) {
    // eslint-disable-next-line react/prop-types
    const classNames = [props.className, className].join(' ').trim()

    return <Component {...props} className={classNames} />
  }
}

function Component(props) {
  return <span {...props} />
}

const noop = () => {}

describe('<StyledProxy />', () => {
  describe('React', () => {
    it('handles no children', () => {
      const StyledComponent = styled(StyledProxy)

      const output = Enzyme.mount(<StyledComponent />)

      const children = output.children().children()

      expect(children.exists()).toBeFalsy()
    })

    it('passes className to child', () => {
      const StyledComponent = styled(StyledProxy)

      const output = Enzyme.mount(
        <StyledComponent>
          <Component>Hello!</Component>
        </StyledComponent>
      )

      const child = output.find(Component).first()

      expect(child.hasClass('generated')).toBeTruthy()
    })

    it('passes className to multiple children', () => {
      const StyledComponent = styled(StyledProxy)

      const output = Enzyme.mount(
        <StyledComponent>
          <Component>One</Component>
          <Component>Two</Component>
          <Component>Three</Component>
        </StyledComponent>
      )

      const children = output.find(Component)

      expect(children.every('.generated')).toBeTruthy()
    })

    it('passes only className to child', () => {
      const StyledComponent = styled(StyledProxy)

      const output = Enzyme.mount(
        <StyledComponent onClick={noop}>
          <Component>Hello!</Component>
        </StyledComponent>
      )

      const child = output.find(Component).first()

      expect(child.prop('onClick')).toBeFalsy()
    })

    it('passes props to used component', () => {
      const StyledComponent = styled(StyledProxy)

      const output = Enzyme.mount(
        <StyledComponent component="div" onClick={noop}>
          <Component>Hello!</Component>
        </StyledComponent>
      )

      const component = output.find('div').first()

      expect(component.prop('onClick')).toBe(noop)
    })

    it('prevents some props to be passed to used component', () => {
      const StyledComponent = styled(StyledProxy)

      const output = Enzyme.mount(
        <StyledComponent component="div" onClick={noop}>
          <Component>Hello!</Component>
        </StyledComponent>
      )

      const component = output.find('div').first()

      expect(component.prop('component')).toBeUndefined()
    })
  })

  describe('DOM', () => {
    it('renders nothing', () => {
      const StyledComponent = styled(StyledProxy)

      const output = Enzyme.shallow(<StyledComponent />)

      expect(output.html()).toMatchSnapshot()
    })

    it('renders only child (single wrapper)', () => {
      const StyledComponent = styled(StyledProxy)

      const output = Enzyme.shallow(
        <StyledComponent>
          <Component>Hello!</Component>
        </StyledComponent>
      )

      expect(output.html()).toMatchSnapshot()
    })

    it('renders only child (multiple wrappers)', () => {
      const Background = styled(StyledProxy, 'bg')
      const Flex = styled(StyledProxy, 'flex')
      const Padding = styled(StyledProxy, 'padding')

      const output = Enzyme.shallow(
        <Background>
          <Flex>
            <Padding>
              <Component>Hello!</Component>
            </Padding>
          </Flex>
        </Background>
      )

      expect(output.html()).toMatchSnapshot()
    })

    it('renders to wrapping <div>', () => {
      const StyledComponent = styled(StyledProxy)

      const output = Enzyme.shallow(
        <StyledComponent component="div">
          <Component>Hello!</Component>
        </StyledComponent>
      )

      expect(output.html()).toMatchSnapshot()
    })
  })
})
