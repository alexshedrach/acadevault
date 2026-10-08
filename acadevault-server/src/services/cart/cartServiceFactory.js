import { DefaultPricingResolver } from "../resolvers/DefaultPricingResolver.js";
import CartService from "./cartService.js";

const pricingResolver = new DefaultPricingResolver();

const cartService = new CartService({ pricingResolver });

export default cartService;
