import { atom } from "jotai";

export interface ProductType {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export const removeProduct = (
  products: ProductType[],
  id: number
): ProductType[] => products.filter((product) => product.id !== id);

export const addProduct = (
  products: ProductType[],
  product: ProductType
): ProductType[] => [
  ...products,
  {
    id: products.length + 1,
    name: product.name,
    qty: product.qty,
    price: product.price,
  },
];

export const updateProduct = (
  products: ProductType[],
  product: ProductType
): ProductType[] =>
  products.map((val) => {
    if (val.id === product.id) {
      val.name = product.name;
      val.price = product.price;
      val.qty = product.qty;
    }

    return val;
  });

// JOTAI
export const productAtom = atom<ProductType>({
  id: 0,
  name: "",
  price: 0,
  qty: 0,
});
export const productsAtom = atom<ProductType[]>([]);

export const addProductAtom = atom(null, (get, set, product: ProductType) => {
  set(productsAtom, addProduct(get(productsAtom), product));
});

export const updateProductAtom = atom(
  null,
  (get, set, product: ProductType) => {
    set(productsAtom, updateProduct(get(productsAtom), product));
  }
);

export const removeProductAtom = atom(null, (get, set, id: number) => {
  set(productsAtom, removeProduct(get(productsAtom), id));
});
