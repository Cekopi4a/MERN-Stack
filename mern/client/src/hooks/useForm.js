import { useState } from "react"

export default function useForm (submitHandler, initialValues) {
    const [values,setValues] = useState(initialValues);

    const onChange = (e) => {
      setValues(state => ({
          ...state,
          [e.target.name]: e.target.value
      }));
  };


  const onSubmit = (e) => {
      e.preventDefault();

        submitHandler(JSON.stringify(values));
        console.log(JSON.stringify(values));
  };

  return {
      values,
      onChange,
      onSubmit
  }
}