import { useState } from "react";


export default function useForm(getFreshModelObject) {
    const [values, setValues] = useState(getFreshModelObject());
    const [error, setErrors] = useState({});
    
    const handleInputChange = (e) => {
        console.log(e);
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    
    return {
        values,
        setValues,
        error,
        setErrors,
        handleInputChange
    }
    
}