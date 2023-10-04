export type ILink = {
  text: string;
  to: string;
};
export const HOME: ILink = {
  text: "HOME",
  to: "/",
};

export const LOGIN: ILink = {
  text: "LOGIN",
  to: "/login",
};
export const SIGNUP: ILink = {
  text: "SIGNUP",
  to: "/signup",
};

export const MENS: ILink = {
  text: "MEN'S CLOTHING",
  to: "/gentelmen",
};
export const WOMEN: ILink = {
  text: "WOMEN'S CLOTHING",
  to: "/ladies",
};

export const JEWELERY: ILink = {
  text: "JEWELERY",
  to: "/ornaments",
};

export const ELECTRONICS: ILink = {
  text: "ELECTRONICS",
  to: "/tech",
};

export const ALL_PRODUCTS: ILink = {
  text: "ALL PRODUCTS",
  to: "/allproducts",
};

export const CART: ILink = {
  text: "CART",
  to: "/cart",
};
export const PROFILE: ILink = {
  text: "PROFILE",
  to: "/profile",
};
export const CHECKOUT: ILink = {
  text: "CHECKOUT",
  to: "/checkout",
};
export const THANK_YOU: ILink = {
  text: "THANK YOU",
  to: "/thankyou",
};
export const BASE_URL = "https://localhost:7182";
const routes: ILink[] = [HOME, CART, PROFILE];
export default routes;

export const IMAGES = {
  MENS: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  WOMENS:
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ELECTRONICS:
    "https://images.pexels.com/photos/792345/pexels-photo-792345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ALL_PRODUCTS:
    "https://images.pexels.com/photos/1727684/pexels-photo-1727684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  JEWELERY:
    "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

export function getWhere(category: string): string {
  let where = HOME;
  switch (category) {
    case "electronics":
      where = ELECTRONICS;
      break;
    case "men's clothing":
      where = MENS;
      break;
    case "jewelery":
      where = JEWELERY;
      break;
    case "women's clothing":
      where = WOMEN;
      break;
    default:
      where = ALL_PRODUCTS;
      break;
  }
  return where.to;
}
