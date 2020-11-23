/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from '@unform/core';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TextInputProps } from 'react-native';
import { Container, TextInput, Icon } from '../styles/components/input';

interface InputProperties extends TextInputProps {
  name: string;
  icon: string;
}
interface inputReference {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<inputReference, InputProperties> = (
  { name, icon, ...props },
  ref,
) => {
  const inputElementReference = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueReference = useRef<{ value: string }>({
    value: defaultValue,
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueReference.current?.value);
  }, []);
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementReference.current.focus();
    },
  }));
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueReference.current,
      path: 'value',
      setValue(reference: any, value: string) {
        inputValueReference.current.value = value;
        inputElementReference.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueReference.current.value = '';
        inputElementReference.current.clear();
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementReference}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          inputValueReference.current.value = value;
        }}
        {...props}
      />
    </Container>
  );
};

export default forwardRef(Input);
