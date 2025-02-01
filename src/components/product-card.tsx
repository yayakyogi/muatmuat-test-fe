import { ProductType, removeProductAtom } from "@state/productAtom";
import React, { useState } from "react";
import { Button, Divider, IconButton, Message, Modal, toaster } from "rsuite";
import { useAtom } from "jotai";
import { useNavigate } from "react-router";

const ProductCard: React.FC<ProductType> = ({ id, name, price, qty }) => {
  const navigate = useNavigate();
  const [, setRemoveProduct] = useAtom(removeProductAtom);
  const [product, setProduct] = useState<ProductType>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onDelete = () => {
    if (product?.id) {
      setRemoveProduct(product.id);
      toaster.push(
        <Message type="success">Product Deleted Successfully</Message>
      );
      setIsOpen(false);
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
            onClick={() => navigate(`/products/${id}`)}
          />
          <IconButton
            icon={<div className="i-mdi:trash" />}
            appearance="primary"
            color="red"
            onClick={() => {
              setIsOpen(true);
              setProduct({ id, name, price, qty });
            }}
          />
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onExited={() => setProduct({ id: 0, name: "", price: 0, qty: 0 })}
      >
        <Modal.Header>
          <Modal.Title>
            <h4>Delete Product</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-base">
            Are you sure to delete this product{" "}
            <strong>{product?.name} ?</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button appearance="primary" color="red" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;
