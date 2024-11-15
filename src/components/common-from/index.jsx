import { Button } from "../ui/button";
import FormControls from "./form-controls";

const CommonForm = ({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled=false,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormControls
        formControls={formControls}
        setFormData={setFormData}
        formData={formData}
      ></FormControls>
      <Button disabled={isButtonDisabled} className="mt-5 w-full" type="submit">{buttonText || "Submit"}</Button>
    </form>
  );
};

export default CommonForm;
