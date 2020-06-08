import React from 'react';
import { styled } from '../utils/styled';
import { useField, useFormikContext, ErrorMessage } from 'formik';

export default function ({ label, children, ...props }) {
  const { name } = props;
  const form = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <>
      <FormItem {...props}>
        {label && <Label>{label}:</Label>}
        {React.cloneElement(children, {
          name,
          value: field.value,
          onChange: form.handleChange(name),
          onBlur: form.handleBlur(name),
        })}
      </FormItem>
      <ErrorMessage name={name}>{(msg) => <Error>{msg}</Error>}</ErrorMessage>
    </>
  );
}

const FormItem = styled.View`
  flex-direction: row;
  ${({ center }) => center && 'justify-content: center;'}
  align-items: center;
  border-color: #eee;
  ${({ noBorder }) => !noBorder && 'border-bottom-width: 1px;'}
  padding: 8px 0;
`;

const Label = styled.Text`
  width: 50px;
  text-align: right;
  margin-right: 12px;
  color: #8e8e93;
  font-size: 10px;
  font-weight: bold;
`;

const Error = styled.Text`
  color: red;
`;
