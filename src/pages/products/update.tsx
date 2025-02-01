import React, { useEffect, useRef, useState } from "react";
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
import { productsAtom, updateProductAtom } from "@state/productAtom";
import { useNavigate, useParams } from "react-router";

const ProductUpdatePage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const formRef = useRef<any>(null);
  const [products] = useAtom(productsAtom);
  const [, setUpdateProduct] = useAtom(updateProductAtom);
  const [formValue, setFormValue] = useState<any>({
    id: 0,
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
      setUpdateProduct(formValue);
      toaster.push(
        <Message type="success">Product Updated Successfully</Message>
      );
      navigate("/products");
    }
  };

  useEffect(() => {
    if (params.id) {
      const product = products.find(
        (product) => product.id === Number(params.id)
      );

      setFormValue(product);
    }
  }, [params]);

  return (
    <div>
      <h1 className="text-red-400 mb-5">Update Product</h1>
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
            Update Product
          </Button>
          <Button onClick={() => navigate("/products")}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductUpdatePage;
