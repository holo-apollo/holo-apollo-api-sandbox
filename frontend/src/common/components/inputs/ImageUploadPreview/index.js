// @flow
import * as React from 'react';
import autoBind from 'react-autobind';

import Attach from 'common/components/icons/Attach';
import Close from 'common/components/icons/Close';
import FieldWithError from '../FieldWithError';
import {
  LabelTextCont,
  StyledLabel,
  StyledInput,
  ButtonTextCont,
  HelpTextCont,
  ImagesCont,
  ImageCont,
  StyledImg,
  CloseCont,
} from './styled';

type FileChoiceEvent = SyntheticInputEvent<HTMLInputElement>;

type Props = {
  name: string,
  label: string,
  buttonText: string,
  helperText: string | React.Node,
  errorText?: string,
  onChange?: FileChoiceEvent => void,
  onRemove?: File => void,
};

type Image = {
  file: File,
  previewUrl: string | ArrayBuffer,
};

type State = {
  images: Image[],
};

class ImageUploadPreview extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    autoBind(this);
    this.state = {
      images: [],
    };
  }

  handleChange(event: FileChoiceEvent) {
    event.preventDefault();

    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const image = {
            file,
            previewUrl: reader.result,
          };
          this.setState({ images: [...this.state.images, image] });
        };
        reader.readAsDataURL(file);
      }
    }

    this.props.onChange && this.props.onChange(event);
  }

  handleImageRemove(image: Image) {
    this.setState({
      images: this.state.images.filter(item => item.file !== image.file),
    });
    this.props.onRemove && this.props.onRemove(image.file);
  }

  renderImagePreview(image: Image, index: number) {
    return (
      <ImageCont key={index}>
        <StyledImg src={image.previewUrl} />
        <CloseCont onClick={() => this.handleImageRemove(image)}>
          <Close height={13} />
        </CloseCont>
      </ImageCont>
    );
  }

  render() {
    return (
      <FieldWithError errorText={this.props.errorText}>
        <LabelTextCont error={Boolean(this.props.errorText)}>
          {this.props.label}
        </LabelTextCont>
        <StyledLabel>
          <StyledInput
            type="file"
            multiple={true}
            name={this.props.name}
            onChange={this.handleChange}
          />
          <ButtonTextCont>
            <Attach height={18} />
            {this.props.buttonText}
          </ButtonTextCont>
        </StyledLabel>
        <HelpTextCont>{this.props.helperText}</HelpTextCont>
        <ImagesCont>
          {this.state.images.map(this.renderImagePreview)}
        </ImagesCont>
      </FieldWithError>
    );
  }
}

export default ImageUploadPreview;
