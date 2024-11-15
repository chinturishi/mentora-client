import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

const FormControls = ({ formControls = [], formData, setFormData }) => {
  const renderComponentByType = (control) => {
    let element = null;
    const currentControlItemValue = formData[control.name] || "";
    switch (control.componentType) {
      case "input":
        element = (
          <Input
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            type={control.type}
            value={currentControlItemValue}
            onChange={(e) =>setFormData({...formData, [control.name]: e.target.value})}
          />
        );
        break;
      case "select":
        element = (
          <Select onValueChange={(value)=>setFormData({...formData,[control.name]:value})} value={currentControlItemValue}>
            <SelectTrigger>
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options && control.options.length > 0
                ? control.options.map((option, index) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            type={control.type}
            value={currentControlItemValue}
            onChange={(e) =>setFormData({...formData, [control.name]: e.target.value})}
          />
        );
        break;
      case "checkbox":
        element = <checkbox />;
        break;
      default:
        element = (
          <Input
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            type={control.type}
            value={currentControlItemValue}
            onChange={(e) =>setFormData({...formData, [control.name]: e.target.value})}
          />
        );
        break;
    }
    return element;
  };
  return (
    <div className="flex flex-col gap-3">
      {formControls.map((control, index) => {
       return  (<div key={control.name}>
          <Label htmlFor={control.name}>{control.label}</Label>
          {renderComponentByType(control)}
        </div>)
      })}
    </div>
  );
};

export default FormControls;
