import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ShopPage from '../views/ShopPage.vue';
import ItemPage from '../views/ItemPage.vue';
import CartPage from '../views/CartPage.vue';
import SignInPage from '../views/SignInPage.vue';
import SignUpPage from '../views/SignUpPage.vue';
import OrdersPage from '../views/OrdersPage.vue';

Vue.use(VueRouter);

const routes = [
	{
		path      : '/',
		name      : 'Home',
		component : HomePage
	},
	{
		path      : '/shop',
		name      : 'Shop',
		component : ShopPage
	},
	{
		path      : '/shop/:name',
		component : ItemPage
	},
	{
		path      : '/cart',
		component : CartPage
	},
	{
		path      : '/signin',
		component : SignInPage
	},
	{
		path      : '/signup',
		component : SignUpPage
	},
	{
		path      : '/orders',
		component : OrdersPage
	}
];

const router = new VueRouter({
	mode   : 'history',
	base   : process.env.BASE_URL,
	routes
});

export default router;
