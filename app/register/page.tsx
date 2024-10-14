import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  email: string;
  password: string;
}

const page = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {};
  return <form>page</form>;
};

export default page;
