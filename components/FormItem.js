import React from 'react';
import { styled } from '../utils/styled';
import { useField, useFormikContext } from 'formik';

export default function ({ label, children, noBorder, ...props }) {
  const form = useFormikContext();
  const [field] = useField(props);
  const { name } = props;

  return (
    <FormItem noBorder={noBorder}>
      <Field {...props}>
        {label && <Label>{label}:</Label>}
        {React.cloneElement(children, {
          name,
          value: field.value,
          onChange: form.handleChange(name),
          onBlur: form.handleBlur(name),
        })}
      </Field>
      {form.errors[name] && <Error>{form.errors[name]}</Error>}
    </FormItem>
  );
}

const Field = styled.View`
  flex-direction: row;
  ${({ center }) => center && 'justify-content: center;'}
  align-items: center;
`;

const FormItem = styled.View`
  border-color: #eee;
  ${({ noBorder }) => !noBorder && 'border-bottom-width: 1px;'}
  padding: 8px 0;
`;

const Label = styled.Text`
  /* width: 50px; */
  /* text-align: right; */
  margin-right: 12px;
  color: #8e8e93;
  font-size: 10px;
  font-weight: bold;
`;

const Error = styled.Text`
  color: #ff2e2eff;
  font-size: 8px;
  margin-left: 60px;
`;
