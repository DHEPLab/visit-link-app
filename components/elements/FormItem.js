import React from 'react';
import { Image } from 'react-native';
import { styled } from '../../utils/styled';
import { useField, useFormikContext } from 'formik';

export default function ({ label, children, noBorder, labelWidth, labelAlign, ...props }) {
  const form = useFormikContext();
  const [field] = useField(props);
  const { name } = props;

  return (
    <FormItem noBorder={noBorder}>
      <Field {...props}>
        {label && (
          <Label labelWidth={labelWidth} labelAlign={labelAlign}>
            {label}:
          </Label>
        )}
        <FieldComponent>
          {React.cloneElement(children, {
            name,
            value: field.value,
            onChange: form.handleChange(name),
            onBlur: form.handleBlur(name),
          })}
        </FieldComponent>
      </Field>
      {form.errors[name] && (
        <ErrorContainer>
          <ErrorIcon source={require('../../assets/images/error.png')} />
          <Error>{form.errors[name]}</Error>
        </ErrorContainer>
      )}
    </FormItem>
  );
}

const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 55px;
`;

const ErrorIcon = styled(Image)`
  height: 8px;
  width: 8px;
`;

const Error = styled.Text`
  color: #ff2e2eff;
  font-size: 8px;
  margin-left: 4px;
`;

const FieldComponent = styled.View`
  flex: 1;
`;

const Field = styled.View`
  flex-direction: row;
  ${({ center }) => center && 'justify-content: center;'}
`;

const FormItem = styled.View`
  border-color: #eee;
  ${({ noBorder }) => !noBorder && 'border-bottom-width: 1px;'}
  padding: 8px 0;
`;

const Label = styled.Text`
  ${({ labelWidth }) => labelWidth && `width: ${labelWidth}px`}
  ${({ labelAlign }) => labelAlign && `text-align: ${labelAlign}`}
  margin-right: 12px;
  color: #8e8e93;
  font-size: 10px;
  line-height: 16px;
`;
