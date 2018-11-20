// @flow
import * as React from 'react';
import autoBind from 'react-autobind';

import TextField from 'common/components/inputs/TextField';
import { HelperCont, CounterCont } from './styled';

type Props = {
  onChange?: (SyntheticInputEvent<HTMLInputElement>) => void,
  maxLength: number,
  helperText?: React.Node,
};

type State = {
  value: string,
};

class TextFieldWithCounter extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    autoBind(this);
    this.state = {
      value: '',
    };
  }

  onChange(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
    this.props.onChange && this.props.onChange(event);
  }

  render() {
    const helperText = (
      <HelperCont hasHelperText={Boolean(this.props.helperText)}>
        {this.props.helperText}
        <CounterCont>
          {this.state.value.length}/{this.props.maxLength}
        </CounterCont>
      </HelperCont>
    );

    return (
      <TextField
        {...this.props}
        onChange={this.onChange}
        helperText={helperText}
      />
    );
  }
}

export default TextFieldWithCounter;
