import EmptyContent from "@components/empty-content";
import ProductCard from "@components/product-card";
import { productsAtom } from "@state/productAtom";
import { useAtom } from "jotai";
import { sortBy } from "lodash-es";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Badge,
  Button,
  Divider,
  Input,
  Modal,
  Radio,
  RadioGroup,
} from "rsuite";

const ProductListPage: React.FC = () => {
  const [products] = useAtom(productsAtom);
  const [productList, setProductList] = useState(products);
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>();
  const [sort, setSort] = useState<"asc" | "desc">();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onSearch = (search: string) => {
    const productNew = products.filter((product) =>
      product.name.includes(search)
    );

    setProductList(search ? productNew : products);
  };

  const onFilter = () => {
    const productFilter = sortBy(products, [`${filter}`]);

    if (sort === "desc") {
      setProductList(productFilter.reverse());
    } else {
      setProductList(productFilter);
    }

    setIsModalOpen(false);
  };

  useEffect(() => {
    setProductList(products);
  }, [products]);

  return (
    <>
      <h1 className="text-red-400 mb-5">Product List</h1>
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search..."
          className="max-w-1/3"
          onChange={(search) => {
            onSearch(search);
          }}
        />
        <div className="flex items-center gap-2">
          {filter && sort && (
            <Badge
              content={
                <div className="p-1" color="blue">
                  Filter: {filter} | {sort}
                </div>
              }
            />
          )}
          <Button
            startIcon={<div className="i-mdi:filter" />}
            onClick={() => setIsModalOpen(true)}
            disabled={products.length === 0}
          >
            Filter
          </Button>
          <Button
            appearance="primary"
            startIcon={<div className="i-mdi:plus" />}
            onClick={() => navigate("/products/create")}
          >
            Add Product
          </Button>
        </div>
      </div>
      <Divider />

      {productList.length === 0 ? (
        <EmptyContent />
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {productList.map((product, key) => {
            return (
              <ProductCard
                key={key}
                id={product.id}
                name={product.name}
                price={product.price}
                qty={product.qty}
              />
            );
          })}
        </div>
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>
            <h5>Filter</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <span>Data</span>
            <RadioGroup
              value={filter}
              onChange={(val) => setFilter(val.toString())}
            >
              <Radio value="name">Name</Radio>
              <Radio value="price">Price</Radio>
            </RadioGroup>
          </div>
          <Divider />
          <div>
            <span>Sorting</span>
            <RadioGroup
              value={sort}
              onChange={(val) => setSort(val === "desc" ? "desc" : "asc")}
            >
              <Radio value="asc">
                <div className="flex items-center">
                  <span>Ascending</span> <div className="i-mdi:arrow-up" />
                </div>
              </Radio>
              <Radio value="desc">
                <div className="flex">
                  <span>Descending</span> <div className="i-mdi:arrow-down" />
                </div>
              </Radio>
            </RadioGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-3 justify-end">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button appearance="primary" onClick={onFilter}>
              Filter
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductListPage;
