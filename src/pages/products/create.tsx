import React, { useRef, useState } from "react";
import {
  Divider,
  Form,
  Schema,
  Button,
  InputNumber,
  toaster,
  Message,
} from "rsuite";
import { useAtom } from "jotai";
import { addProductAtom } from "@state/productAtom";
import { useNavigate } from "react-router";

const ProductCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<any>(null);
  const [, setNewProduct] = useAtom(addProductAtom);
  const [formValue, setFormValue] = useState<any>({
    name: "",
    price: null,
    qty: null,
  });
  const [fromError, setFormError] = useState<any>();
  const { StringType, NumberType } = Schema.Types;

  const model = Schema.Model({
    name: StringType().isRequired("Product name is required."),
    price: NumberType()
      .min(1)
      .isInteger("Must integer")
      .isRequired("Price is required"),
    qty: NumberType().min(0).isRequired("QTY is required"),
  });

  const handleSubmit = () => {
    if (formRef.current.check()) {
      setNewProduct(formValue);
      toaster.push(
        <Message type="success">Product Created Successfully</Message>
      );
      navigate("/products");
    }
  };

  return (
    <div>
      <h1 className="text-red-400 mb-5">Create Product</h1>
      <Divider />
      <Form
        fluid
        ref={formRef}
        model={model}
        formValue={formValue}
        onChange={setFormValue}
        formError={fromError}
        onCheck={setFormError}
      >
        <Form.Group>
          <Form.ControlLabel>Name</Form.ControlLabel>
          <Form.Control name="name" placeholder="Product name" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Price</Form.ControlLabel>
          <Form.Control
            name="price"
            accepter={InputNumber}
            placeholder="Product name"
          />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>QTY</Form.ControlLabel>
          <Form.Control
            name="qty"
            accepter={InputNumber}
            placeholder="Product name"
          />
        </Form.Group>
        <div className="flex gap-3">
          <Button appearance="primary" type="submit" onClick={handleSubmit}>
            Create Product
          </Button>
          <Button onClick={() => navigate("/products")}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductCreatePage;
