import React from 'react';
import {styled, Icon} from '@patternplate/components';

import ToggleButton from './common/toggle-button';

export default Opacity;

function Opacity(props) {
  return (
    <StyledToggleButton enabled={props.enabled} shortcut={props.shortcut}>
      <StyledIcon symbol="opacity"/> {props.shortcut.toString()}
    </StyledToggleButton>
  );
}

const StyledIcon = styled(Icon)`
  fill: ${props => props.theme.tint};
`;

const StyledToggleButton = styled(ToggleButton)`
  font-size: 0;
  line-height: 0;
`;
