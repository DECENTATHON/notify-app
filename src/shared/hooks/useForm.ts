import {useState} from "react";
import {FormInstance} from "antd";

export const useForm = <T>(form: FormInstance<T>) => {
  const [isValidated, setValidated] = useState(false);

  const validate = async () => {
    try {
      await form.validateFields();
      setValidated(true);
      return true;
    } catch (e) {
      setValidated(false);
      return false;
    }
  };

  return { isValidated, validate };
};
