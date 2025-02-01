import {
  ProductType,
  removeProductAtom,
  updateProductAtom,
} from "@state/productAtom";
import React, { useRef, useState } from "react";
import {
  Button,
  Divider,
  IconButton,
  Message,
  Modal,
  toaster,
  Form,
  InputNumber,
  Schema,
} from "rsuite";
import { useAtom } from "jotai";

const ProductCard: React.FC<ProductType> = ({ id, name, price, qty }) => {
  const [, setRemoveProduct] = useAtom(removeProductAtom);
  const [product, setProduct] = useState<ProductType>();
  const [modalOpen, setModalOpen] = useState<any>({ isOpen: false, state: "" });
  const formRef = useRef<any>(null);

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

  const onDelete = () => {
    if (product?.id) {
      setRemoveProduct(product.id);
      toaster.push(
        <Message type="success">Product Deleted Successfully</Message>
      );
      setModalOpen({ isOpen: false, state: "" });
    }
  };

  const onClose = () => {
    setModalOpen({ isOpen: false, state: "" });
  };

  const onExited = () => {
    setProduct({ id: 0, name: "", price: 0, qty: 0 });
  };

  const handleSubmit = () => {
    if (formRef.current.check()) {
      setUpdateProduct(formValue);
      toaster.push(
        <Message type="success">Product Updated Successfully</Message>
      );
      onClose();
    }
  };

  return (
    <>
      <div className="shadow rounded p-2">
        <img src="/images/dummy.png" className="rounded mb-3 w-full" />
        <h5 className="">{name}</h5>
        <h6 className="">{`Rp ${price}`}</h6>
        <span className="text-slate-500">Stock {qty}</span>
        <Divider className="my-2" />
        <div className="flex justify-end gap-2">
          <IconButton
            icon={<div className="i-mdi:pencil" />}
            appearance="primary"
            color="blue"
            onClick={() => {
              setModalOpen({ isOpen: true, state: "edit" });
              setFormValue({ id, name, price, qty });
            }}
          />
          <IconButton
            icon={<div className="i-mdi:trash" />}
            appearance="primary"
            color="red"
            onClick={() => {
              setModalOpen({ isOpen: true, state: "delete" });
              setProduct({ id, name, price, qty });
            }}
          />
        </div>
      </div>

      <Modal open={modalOpen.isOpen} onClose={onClose} onExited={onExited}>
        <Modal.Header>
          <Modal.Title>
            <h4>
              {modalOpen.state === "delete"
                ? "Delete Product"
                : "Update Product"}
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalOpen.state === "delete" && (
            <p className="text-base">
              Are you sure to delete this product{" "}
              <strong>{product?.name} </strong> with stock{" "}
              <strong>{product?.qty} ?</strong>
            </p>
          )}
          {modalOpen.state === "edit" && (
            <>
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
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {modalOpen.state === "delete" ? (
            <div className="flex justify-end">
              <Button onClick={onClose}>Cancel</Button>
              <Button appearance="primary" color="red" onClick={onDelete}>
                Delete
              </Button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button onClick={onClose}>Cancel</Button>
              <Button appearance="primary" type="submit" onClick={handleSubmit}>
                Update Product
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;
