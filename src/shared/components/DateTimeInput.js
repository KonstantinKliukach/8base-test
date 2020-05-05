import React from 'react';
import { Form } from '@8base/boost';
import { DateInput } from '@8base/boost';

export const DateTimeInput = ({ input, meta, maxFiles, label, ...rest }) => (
  <Form.Field label={label} input={input} meta={meta}>
    <DateInput onChange={input.onChange} value={input.value} withTime />
  </Form.Field>
);
