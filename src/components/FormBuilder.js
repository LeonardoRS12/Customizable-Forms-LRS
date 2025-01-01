import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);

  // Add a new form element
  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type,
      label: "New Field",
      required: false,
      options: type === "radio" || type === "checkbox" ? ["Option 1"] : [],
      placeholder: type === "text" ? "Enter text here" : "",
    };
    setFormElements([...formElements, newElement]);
  };

  // Update an element's properties
  const updateElement = (id, key, value) => {
    setFormElements((elements) =>
      elements.map((el) => (el.id === id ? { ...el, [key]: value } : el))
    );
  };

  // Add a new option for radio/checkbox fields
  const addOption = (id) => {
    setFormElements((elements) =>
      elements.map((el) =>
        el.id === id
          ? { ...el, options: [...el.options, `Option ${el.options.length + 1}`] }
          : el
      )
    );

    // Auto-focus the newly added option
    setTimeout(() => {
      const optionInputs = document.querySelectorAll(
        `.form-element[data-id="${id}"] .option input[type="text"]`
      );
      optionInputs[optionInputs.length - 1]?.focus();
    }, 0);
  };

  // Remove an option from a radio/checkbox field
  const removeOption = (id, optionIdx) => {
    setFormElements((elements) =>
      elements.map((el) =>
        el.id === id
          ? {
              ...el,
              options: el.options.filter((_, idx) => idx !== optionIdx),
            }
          : el
      )
    );
  };

  // Remove a form element
  const removeElement = (id) => {
    setFormElements((elements) => elements.filter((el) => el.id !== id));
  };

  // Validate form elements before saving
  const validateForm = () => {
    for (const el of formElements) {
      if (!el.label.trim()) {
        alert("All fields must have a label.");
        return false;
      }
      if ((el.type === "radio" || el.type === "checkbox") && el.options.length === 0) {
        alert("Radio buttons and checkboxes must have at least one option.");
        return false;
      }
    }
    return true;
  };

  // Save the form to Firestore
  const saveForm = async () => {
    if (!validateForm()) return;

    try {
      await setDoc(doc(db, "forms", `form-${Date.now()}`), { formElements });
      alert("Form saved successfully!");
    } catch (error) {
      console.error("Error saving form:", error);
      alert(`Failed to save form: ${error.message}`);
    }
  };

  return (
    <div className="styles.formBuilder">
      <h2>Form Builder</h2>
      <div className="styles.controls">
        <button onClick={() => addElement("text")}>Add Text Input</button>
        <button onClick={() => addElement("radio")}>Add Radio Button</button>
        <button onClick={() => addElement("checkbox")}>Add Checkbox</button>
        <button onClick={saveForm}>Save Form</button>
      </div>

      <div className="styles.formPreview">
        {formElements.map((el) => (
          <div key={el.id} className="styles.element" data-id={el.id}>
            {/* Editable label */}
            <input
              type="text"
              value={el.label}
              onChange={(e) => updateElement(el.id, "label", e.target.value)}
              placeholder="Label"
            />

            {/* Text input-specific properties */}
            {el.type === "text" && (
              <input
                type="text"
                placeholder={el.placeholder}
                onChange={(e) =>
                  updateElement(el.id, "placeholder", e.target.value)
                }
              />
            )}

            {/* Radio/Checkbox-specific options */}
            {(el.type === "radio" || el.type === "checkbox") && (
              <div>
                {el.options.map((option, idx) => (
                  <div key={idx} className="styles.option">
                    <input type={el.type} name={`option-${el.id}`} />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        setFormElements((elements) =>
                          elements.map((item) =>
                            item.id === el.id
                              ? {
                                  ...item,
                                  options: item.options.map((opt, i) =>
                                    i === idx ? e.target.value : opt
                                  ),
                                }
                              : item
                          )
                        )
                      }
                    />
                    <button onClick={() => removeOption(el.id, idx)}>Remove</button>
                  </div>
                ))}
                <button onClick={() => addOption(el.id)}>Add Option</button>
              </div>
            )}

            {/* Required checkbox */}
            <label>
              Required:
              <input
                type="checkbox"
                checked={el.required}
                onChange={(e) =>
                  updateElement(el.id, "required", e.target.checked)
                }
              />
            </label>

            {/* Delete element button */}
            <button onClick={() => removeElement(el.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormBuilder;